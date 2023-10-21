// find index of the last digit in a string (for backspace button)
export const findLastDigitIndex = (str: string): number => {
  let i = str.length - 1;

  while (i >= 0) {
    if (/\d/.test(str[i])) {
      return i;
    }
    i -= 1;
  }

  return -1;
};

// get phone number for numveriry request
export const parsePhoneNumber = (number: string): string => {
  return number.replace(/\D/g, '');
};
