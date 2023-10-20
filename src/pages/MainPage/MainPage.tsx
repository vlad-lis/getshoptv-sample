import { ReactElement, useEffect, useState } from 'react';
import Banner from '../../components/Banner/Banner';
import styles from './MainPage.module.scss';
import doggieSource from '../../videos/doggie.mp4';

const MainPage = (): ReactElement => {
  // banner visibility
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const bannerClass = isBannerVisible
    ? styles.main__banner
    : styles.main__banner_hidden;

  // display banner after 5 sec
  useEffect(() => {
    const delay = 5000;
    const timer = setTimeout(() => {
      setIsBannerVisible(true);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <main className={styles.main}>
      <video className={styles.main__video} autoPlay muted loop>
        <source src={doggieSource} type='video/mp4' />
        oh no
      </video>
      <div className={bannerClass}>
        <Banner />
      </div>
    </main>
  );
};

export default MainPage;
