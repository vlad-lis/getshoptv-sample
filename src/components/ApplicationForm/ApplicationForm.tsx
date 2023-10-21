import { ReactElement, useEffect, useState } from 'react';
import { useMask } from '@react-input/mask';
import styles from './ApplicationForm.module.scss';
import { findLastDigitIndex, parsePhoneNumber } from '../../utils/helpers';
import validatePhoneNumber from '../../utils/numverifyValidation';

const ApplicationForm = (): ReactElement => {
  // state for valid number and valid form
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isPdBtnChecked, setIsPdBtnChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // phone number mask
  const inputRef = useMask({
    mask: '+7(___)___-__-__',
    showMask: true,
    separate: false,
  });

  // phone input class
  const [phoneInputClass, setPhoneInputClass] = useState(
    styles.form__phoneInput
  );

  // submit button class
  const submitBtnClass = `${styles.form__submitBtn}
  ${isFormValid && styles.form__submitBtn_active}`;

  // state for handling button css on keydown
  const [activeButtons, setActiveButtons] = useState<{
    [key: string]: boolean;
  }>({});

  // handling css on keydown
  const numBtnClass = (number: string) =>
    `${styles.form__numBtn}
    ${activeButtons[number] && styles.form__numBtn_active}`;

  const eraseBtnClass = `${styles.form__numBtn} ${styles.form__eraseBtn}
    ${activeButtons.Backspace && styles.form__numBtn_active}`;

  // zero is rendered separately after backspace, 1-9 with map()
  const numberButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  // number validation function
  const runNumberValidation = async (number: string): Promise<void> => {
    const validationData = await validatePhoneNumber(number);

    if (
      validationData &&
      validationData.valid &&
      validationData.line_type === 'mobile'
    ) {
      setPhoneInputClass(styles.form__phoneInput);
      setIsNumberValid(true);
      setIsErrorShown(false);
    } else {
      setPhoneInputClass(
        `${styles.form__phoneInput} ${styles.form__phoneInput_invalid}`
      );
      setIsNumberValid(false);
      setIsErrorShown(true);
      setIsPdBtnChecked(false);
    }
  };

  // button clicks
  const handleNumberButtonClick = (number: string): void => {
    if (inputRef.current) {
      inputRef.current.value = inputRef.current.value.replace(/_/, number);
    }

    // run validation on last digit input
    if (
      inputRef.current?.value.length === 16 &&
      !/_/.test(inputRef.current.value)
    ) {
      const parsedPhoneNumber = parsePhoneNumber(inputRef.current.value);
      runNumberValidation(parsedPhoneNumber);
    }
  };

  const handleEraseButtonClick = (): void => {
    if (inputRef.current) {
      const maskedValue = inputRef.current.value;
      const lastDigitIndex = findLastDigitIndex(maskedValue);

      // erase last digit, but ignore the first one (country code)
      if (lastDigitIndex && lastDigitIndex !== -1 && lastDigitIndex !== 1) {
        const newValue = `${maskedValue.substring(
          0,
          lastDigitIndex
        )}_${maskedValue.substring(lastDigitIndex + 1)}`;
        inputRef.current.value = newValue;
      }

      // reset validation
      setIsNumberValid(false);
    }
  };

  // pd checkbox click
  const handlePdCheckboxClick = (): void => {
    setIsPdBtnChecked(!isPdBtnChecked);
  };

  // keyboard press
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      if (/[0-9]/.test(key)) {
        handleNumberButtonClick(key);
        setActiveButtons((prev) => ({ ...prev, [key]: true }));
      } else if (key === 'Backspace') {
        handleEraseButtonClick();
        setActiveButtons((prev) => ({ ...prev, [key]: true }));
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const { key } = event;
      if (/[0-9]/.test(key) || key === 'Backspace') {
        setActiveButtons((prev) => ({ ...prev, [key]: false }));
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  // submit form
  const handleSubmitBtn: React.MouseEventHandler<HTMLButtonElement> = async (
    event
  ) => {
    event.preventDefault();
    if (inputRef.current) {
      const parsedPhoneNumber = parsePhoneNumber(inputRef.current.value);
      const validationData = await validatePhoneNumber(parsedPhoneNumber);
      console.log(validationData);
    }
  };

  // validate form
  useEffect(() => {
    if (
      isNumberValid &&
      isPdBtnChecked &&
      inputRef.current &&
      !/_/.test(inputRef.current.value)
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [isNumberValid, isPdBtnChecked, inputRef]);

  return (
    <form className={styles.form}>
      <fieldset className={styles.form__phoneFieldset}>
        <label className={styles.form__phoneLabel} htmlFor='phonenumber'>
          Введите ваш номер мобильного телефона
        </label>
        <input id='phonenumber' className={phoneInputClass} ref={inputRef} />
        <span className={styles.form__phoneSublabel}>
          и с Вами свяжется наш менеждер для дальнейшей консультации
        </span>
      </fieldset>

      <div className={styles.form__numInput}>
        {numberButtons.map((number) => (
          <button
            key={number}
            className={numBtnClass(number)}
            type='button'
            onClick={() => handleNumberButtonClick(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={eraseBtnClass}
          type='button'
          onClick={handleEraseButtonClick}
        >
          СТЕРЕТЬ
        </button>
        <button
          className={numBtnClass('0')}
          type='button'
          onClick={() => handleNumberButtonClick('0')}
        >
          0
        </button>
      </div>

      {isErrorShown ? (
        <div className={styles.form__error}>НЕВЕРНО ВВЁДЕН НОМЕР</div>
      ) : (
        <fieldset className={styles.form__pdFieldset}>
          <input
            className={styles.form__pdCheckbox}
            id='pd-checkbox'
            type='checkbox'
            onClick={handlePdCheckboxClick}
          />
          <label htmlFor='pd-checkbox' className={styles.form__pdLabel}>
            Согласие на обработку персональных данных
          </label>
        </fieldset>
      )}

      <button
        className={submitBtnClass}
        type='submit'
        onClick={handleSubmitBtn}
        disabled={!isFormValid}
      >
        ПОДТВЕРДИТЬ НОМЕР
      </button>
    </form>
  );
};

export default ApplicationForm;
