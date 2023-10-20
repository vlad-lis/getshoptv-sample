import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Banner.module.scss';

const Banner = (): ReactElement => {
  const navigate = useNavigate();

  const handleButtonClick = (): void => {
    navigate('/promo');
  };

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
      <button
        className={styles.banner__btn}
        type='button'
        onClick={handleButtonClick}
      >
        ОК
      </button>
    </header>
  );
};

export default Banner;
