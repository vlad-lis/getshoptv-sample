import { ReactElement } from 'react';
import TCloseBtnProps from '../../../types/TCloseButtonProps';
import styles from './WhiteCloseBtn.module.scss';

const WhiteCloseBtn = ({ onClick }: TCloseBtnProps): ReactElement => {
  return (
    <button
      className={styles.btn}
      aria-label='close'
      type='button'
      onClick={onClick}
    />
  );
};

export default WhiteCloseBtn;
