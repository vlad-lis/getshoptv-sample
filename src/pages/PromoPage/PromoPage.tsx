import { ReactElement } from 'react';
import styles from './PromoPage.module.scss';
import ApplicationForm from '../../components/ApplicationForm/ApplicationForm';

const PromoPage = (): ReactElement => {
  return (
    <main className={styles.promo}>
      <ApplicationForm />
    </main>
  );
};

export default PromoPage;
