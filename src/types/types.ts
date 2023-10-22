export type TApplicationFormState = {
  successfulSubmit: boolean;
};

export type TCloseBtnProps = {
  onClick: () => void;
};

export type TButtonRefs = {
  [key: string]: React.RefObject<HTMLButtonElement>;
};

export type TBannerBtnProps = {
  onClick: () => void;
};
