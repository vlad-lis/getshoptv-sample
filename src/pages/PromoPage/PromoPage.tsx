import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './PromoPage.module.scss';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';
import PromoQrBox from '../../components/PromoQrBox/PromoQrBox';
import WhiteCloseBtn from '../../components/UI/WhiteCloseBtn/WhiteCloseBtn';

const PromoPage = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <main className={styles.promo}>
      <ApplicationForm />
      <div className={styles.promo__qr}>
        <PromoQrBox />
      </div>
      <div className={styles.promo__closeBtn}>
        <WhiteCloseBtn onClick={() => navigate('/')} />
      </div>
    </main>
  );
};

export default PromoPage;
