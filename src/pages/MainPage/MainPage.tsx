import { ReactElement, useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useArrowNavigation from '../../utils/useArrowNavHook';
import Banner from '../../components/Banner/Banner';
import styles from './MainPage.module.scss';
import doggieSource from '../../videos/doggie.mp4';

const MainPage = (): ReactElement => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // get pause timestamp if saved
  const videoPausedAt = sessionStorage.getItem('videoPausedAt') || '0';

  // play video
  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      video.currentTime = parseFloat(videoPausedAt);
      video.play();
    }
  }, [videoPausedAt, videoRef]);

  // arrow navigation
  const parentRef = useArrowNavigation({
    selectors: 'button, input[type="checkbox"]',
  });

  const handleBannerBtnClick = (): void => {
    // save pause timestamp
    sessionStorage.setItem(
      'videoPausedAt',
      String(videoRef.current?.currentTime)
    );

    navigate('/promo');
  };

  // banner visibility
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const bannerClass = isBannerVisible
    ? styles.main__banner
    : styles.main__banner_hidden;

  // display banner after 5 sec
  useEffect(() => {
    // no delay when resuming after pause
    if (!sessionStorage.getItem('videoPausedAt')) {
      const delay = 5000;
      const timer = setTimeout(() => {
        setIsBannerVisible(true);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    }

    return () => {};
  }, []);

  return (
    <main className={styles.main} ref={parentRef}>
      <video ref={videoRef} className={styles.main__video} autoPlay muted loop>
        <source src={doggieSource} type='video/mp4' />
        oh no
      </video>
      <div className={bannerClass}>
        <Banner onClick={handleBannerBtnClick} />
      </div>
    </main>
  );
};

export default MainPage;
