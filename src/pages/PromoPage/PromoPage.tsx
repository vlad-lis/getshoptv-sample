import { ReactElement, useEffect } from 'react';
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

  // state to render component after submit success
  const successfulSubmit = useSelector(
    (state: RootState) => state.applicationForm.successfulSubmit
  );

  // arrow navigation
  const parentRef = useArrowNavigation({
    selectors: 'button, input[type="checkbox"]',
  });

  // inactivity timer
  useEffect(() => {
    let inactivityTimer: number;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        navigate('/');
      }, 10000);
    };

    document.addEventListener('keydown', resetInactivityTimer);
    document.addEventListener('click', resetInactivityTimer);

    resetInactivityTimer();

    return () => {
      document.removeEventListener('keydown', resetInactivityTimer);
      document.removeEventListener('click', resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, [navigate]);

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
