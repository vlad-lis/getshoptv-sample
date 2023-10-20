import { ReactElement } from 'react';
import styles from './Banner.module.scss';
import banner from '../../static/banner.json';

const Banner = (): ReactElement => {
  return (
    <header className={styles.banner}>
      <h1 className={styles.banner__title}>{banner.title}</h1>
      <div className={styles.banner__qr} />
      <p className={styles.banner__subtitle}>{banner.subtitle}</p>
      <button className={styles.banner__btn} type='button'>
        {banner.button}
      </button>
    </header>
  );
};

export default Banner;
