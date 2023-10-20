import { ReactElement, useEffect } from 'react';
import { useMask } from '@react-input/mask';
import styles from './ApplicationForm.module.scss';
import findLastDigitIndex from '../../utils/helpers';

const ApplicationForm = (): ReactElement => {
  // phone number mask
  const inputRef = useMask({
    mask: '+7(___)___-__-__',
    replacement: { _: /\d/ },
    showMask: true,
    separate: true,
  });

  // zero is rendered separately after backspace, 1-9 with map()
  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // button clicks
  const handleNumberButtonClick = (number: string): void => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value.replace(/_/, number);
    }
  };

  const handleEraseButtonClick = (): void => {
    if (inputRef.current) {
      const maskedValue = inputRef.current.value;
      const lastDigitIndex = findLastDigitIndex(maskedValue);

      // erase last digit, but leave the first one
      if (lastDigitIndex && lastDigitIndex !== -1 && lastDigitIndex !== 1) {
        const newValue = `${maskedValue.substring(
          0,
          lastDigitIndex
        )}_${maskedValue.substring(lastDigitIndex + 1)}`;
        inputRef.current.value = newValue;
      }
    }
  };

  // keyboard press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      if (/[0-9]/.test(key)) {
        handleNumberButtonClick(key);
      } else if (key === 'Backspace') {
        handleEraseButtonClick();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <form className={styles.form}>
      <fieldset className={styles.form__phoneFieldset}>
        <label className={styles.form__phoneLabel} htmlFor='phonenumber'>
          Введите ваш номер мобильного телефона
        </label>
        <input
          id='phonenumber'
          className={styles.form__phoneInput}
          ref={inputRef}
        />
        <span className={styles.form__phoneSublabel}>
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </span>
      </fieldset>

      <div className={styles.form__numInput}>
        {numberButtons.map((number) => (
          <button
            key={number}
            className={styles.form__numBtn}
            type='button'
            onClick={() => handleNumberButtonClick(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`${styles.form__numBtn} ${styles.form__eraseBtn}`}
          type='button'
          onClick={handleEraseButtonClick}
        >
          СТЕРЕТЬ
        </button>
        <button
          className={styles.form__numBtn}
          type='button'
          onClick={() => handleNumberButtonClick('0')}
        >
          0
        </button>
      </div>

      <fieldset className={styles.form__pdFieldset}>
        <input
          className={styles.form__pdCheckbox}
          id='pd-checkbox'
          type='checkbox'
        />
        <label htmlFor='pd-checkbox' className={styles.form__pdLabel}>
          Согласие на обработку персональных данных
        </label>
      </fieldset>
      <button className={styles.form__submitBtn} type='submit'>
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </form>
  );
};

export default ApplicationForm;
