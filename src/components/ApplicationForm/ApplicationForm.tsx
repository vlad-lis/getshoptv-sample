import { ReactElement } from "react";
import styles from "./ApplicationForm.module.scss";

const ApplicationForm = (): ReactElement => {
  return (
    <form className={styles.form}>
      <fieldset className={styles.form__phoneFieldset}>
        <label className={styles.form__phoneLabel} htmlFor="phonenumber">
          Введите ваш номер мобильного телефона
        </label>
        <input id="phonenumber" placeholder="+7(___)-___-__-__" />
        <span className={styles.form__phoneSublabel}>
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </span>
      </fieldset>

      <div className={styles.form__numInput}>
        <button className={styles.form__numBtn} type="button">
          1
        </button>
        <button className={styles.form__numBtn} type="button">
          2
        </button>
        <button className={styles.form__numBtn} type="button">
          3
        </button>
        <button className={styles.form__numBtn} type="button">
          4
        </button>
        <button className={styles.form__numBtn} type="button">
          5
        </button>
        <button className={styles.form__numBtn} type="button">
          6
        </button>
        <button className={styles.form__numBtn} type="button">
          7
        </button>
        <button className={styles.form__numBtn} type="button">
          8
        </button>
        <button className={styles.form__numBtn} type="button">
          9
        </button>
        <button
          className={`${styles.form__numBtn} ${styles.form__eraseBtn}`}
          type="button"
        >
          СТЕРЕТЬ
        </button>
        <button className={styles.form__numBtn} type="button">
          0
        </button>
      </div>

      <fieldset className={styles.form__pdFieldset}>
        <input
          className={styles.form__pdCheckbox}
          id="pd-checkbox"
          type="checkbox"
        />
        <label htmlFor="pd-checkbox" className={styles.form__pdLabel}>
          Согласие на обработку персональных данных
        </label>
      </fieldset>
      <button className={styles.form__submitBtn} type="submit">
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </form>
  );
};

export default ApplicationForm;
