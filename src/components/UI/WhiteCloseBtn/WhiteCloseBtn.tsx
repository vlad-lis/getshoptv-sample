import { ReactElement } from 'react';
import { TCloseBtnProps } from '../../../types/types';
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
