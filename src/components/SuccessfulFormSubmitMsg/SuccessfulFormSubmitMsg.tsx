import { ReactElement } from 'react';
import styles from './SuccessfulFormSubmitMsg.module.scss';

const SuccessFormSubmitMsg = (): ReactElement => {
  return (
    <section className={styles.msg}>
      <h3 className={styles.msg__title}>ЗАЯВКА ПРИНЯТА</h3>
      <p className={styles.msg__subtitle}>
        Держите телефон под рукой.
        <br />
        Скоро с Вами свяжется наш менеджер.
      </p>
    </section>
  );
};

export default SuccessFormSubmitMsg;
