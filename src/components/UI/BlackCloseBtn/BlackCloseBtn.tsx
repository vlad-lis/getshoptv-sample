import { ReactElement } from 'react';
import TCloseBtnProps from '../../../types/TCloseButtonProps';
import styles from './BlackCloseBtn.module.scss';

const BlackCloseBtn = ({ onClick }: TCloseBtnProps): ReactElement => {
  return (
    <button
      className={styles.btn}
      aria-label='close'
      type='button'
      onClick={onClick}
    />
  );
};

export default BlackCloseBtn;
