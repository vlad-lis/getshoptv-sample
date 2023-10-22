import { ReactElement } from 'react';
import { TBannerBtnProps } from '../../types/types';
import styles from './Banner.module.scss';

const Banner = ({ onClick }: TBannerBtnProps): ReactElement => {
  return (
    <header className={styles.banner}>
      <h1 className={styles.banner__title}>
        ИСПОЛНИТЕ МЕЧТУ ВАШЕГО МАЛЫША! <br />
        ПОДАРИТЕ ЕМУ СОБАКУ!
      </h1>
      <div className={styles.banner__qr} />
      <p className={styles.banner__subtitle}>
        Сканируйте QR-код или нажмите ОК
      </p>
      <button className={styles.banner__btn} type='button' onClick={onClick}>
        ОК
      </button>
    </header>
  );
};

export default Banner;
