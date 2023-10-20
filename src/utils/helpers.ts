// find index of the last digit in a string
const findLastDigitIndex = (str: string): number => {
  let i = str.length - 1;

  while (i >= 0) {
    if (/\d/.test(str[i])) {
      return i;
    }
    i -= 1;
  }

  return -1;
};

export default findLastDigitIndex;
