import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import useArrowNavigation from '../../utils/useArrowNavHook';
import styles from './PromoPage.module.scss';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';
import PromoQrBox from '../../components/PromoQrBox/PromoQrBox';
import WhiteCloseBtn from '../../components/UI/WhiteCloseBtn/WhiteCloseBtn';
import SuccessFormSubmitMsg from '../../components/SuccessfulFormSubmitMsg/SuccessfulFormSubmitMsg';
import BlackCloseBtn from '../../components/UI/BlackCloseBtn/BlackCloseBtn';

const PromoPage = (): ReactElement => {
  const navigate = useNavigate();

  const successfulSubmit = useSelector(
    (state: RootState) => state.applicationForm.successfulSubmit
  );

  const parentRef = useArrowNavigation({ selectors: 'button' });

  return (
    <main className={styles.promo} ref={parentRef}>
      {successfulSubmit ? <SuccessFormSubmitMsg /> : <ApplicationForm />}
      <div className={styles.promo__qr}>
        <PromoQrBox />
      </div>
      <div className={styles.promo__closeBtn}>
        {successfulSubmit ? (
          <BlackCloseBtn onClick={() => navigate('/')} />
        ) : (
          <WhiteCloseBtn onClick={() => navigate('/')} />
        )}
      </div>
    </main>
  );
};

export default PromoPage;
