import { RefObject, useEffect, useRef } from 'react';
import {
  THandleEnterPressParams,
  THandleArrowKeyPressParams,
  THandleEventsParams,
} from '../types/useArrowNavHookTypes';

const handleEnterPress = ({
  event,
  currentIndex,
  activeElement,
}: THandleEnterPressParams) => {
  if (currentIndex === -1 || activeElement === null) {
    return;
  }

  const element = activeElement as HTMLElement;
  if (element) {
    event.preventDefault();
    element.click();
  }
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

    // make navigation infinite (handle reaching end of elements array)
    if (nextIndex < 0) {
      nextIndex = availableElements.length - 1;
    } else if (nextIndex >= availableElements.length) {
      nextIndex = 0;
    }

    // avoid disabled buttons; loop stops at first enabled element
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

  // if no element from availableElements is in focus, focus the first one
  const elements = Array.from(availableElements);

  if (activeElement && !elements.includes(activeElement)) {
    (availableElements[0] as HTMLElement).focus();
  }

  // do nothing when no available elements or other buttons pressed
  if (
    !['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Enter'].includes(
      key
    ) ||
    !parentNode ||
    !parentNode.contains(activeElement) ||
    !availableElements.length
  ) {
    return;
  }

  if (key === 'Enter') {
    handleEnterPress({ event, currentIndex, activeElement });
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
