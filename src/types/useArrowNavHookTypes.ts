export type THandleEnterPressParams = {
  event: KeyboardEvent;
  currentIndex: number;
  activeElement: Element | null;
};

export type THandleArrowKeyPressParams = {
  event: KeyboardEvent;
  currentIndex: number;
  availableElements: NodeListOf<Element>;
};

export type THandleEventsParams = {
  event: KeyboardEvent;
  parentNode: Element;
  selectors: string;
};
