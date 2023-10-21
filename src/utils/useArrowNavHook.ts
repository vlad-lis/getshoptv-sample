import { RefObject, useEffect, useRef } from 'react';

type THandleArrowKeyPressParams = {
  event: KeyboardEvent;
  currentIndex: number;
  availableElements: NodeListOf<Element>;
};

type THandleEventsParams = {
  event: KeyboardEvent;
  parentNode: Element;
  selectors: string;
};

const handleArrowKeyPress = ({
  event,
  currentIndex,
  availableElements,
}: THandleArrowKeyPressParams) => {
  const { key } = event;
  let nextElement: HTMLButtonElement | null = null;

  const isArrowDownOrRight = key === 'ArrowDown' || key === 'ArrowRight';
  const isArrowUpOrLeft = key === 'ArrowUp' || key === 'ArrowLeft';

  if (isArrowDownOrRight || isArrowUpOrLeft) {
    const indexOffset = isArrowDownOrRight ? 1 : -1;
    let nextIndex = currentIndex + indexOffset;

    // avoid disabled buttons; loop stops at first enabled button
    while (nextIndex >= 0 && nextIndex < availableElements.length) {
      nextElement = availableElements[nextIndex] as HTMLButtonElement;
      if (!nextElement.disabled) {
        break;
      }
      nextIndex += indexOffset;
    }
  }

  if (nextElement) {
    event.preventDefault();
    nextElement.focus();
  }
};

const handleEvents = ({
  event,
  parentNode,
  selectors = 'button',
}: THandleEventsParams) => {
  const { key } = event;
  const { activeElement } = document;
  const availableElements = parentNode.querySelectorAll(selectors);
  const currentIndex = Array.from(availableElements).findIndex(
    (element) => element === activeElement
  );

  // if parent component not in focus, focus the first button in availableElements
  if (activeElement !== parentNode) {
    (availableElements[0] as HTMLElement).focus();
  }

  if (
    !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key) ||
    !parentNode ||
    !parentNode.contains(activeElement) ||
    !availableElements.length
  ) {
    return;
  }

  handleArrowKeyPress({ event, currentIndex, availableElements });
};

const useArrowNavigation = ({
  selectors = 'button',
}): RefObject<HTMLElement> | null => {
  const parentNode = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      handleEvents({
        event,
        parentNode: parentNode.current as Element,
        selectors,
      });
    };

    document.addEventListener('keydown', eventHandler);

    return () => {
      document.removeEventListener('keydown', eventHandler);
    };
  });

  return parentNode;
};

export default useArrowNavigation;
