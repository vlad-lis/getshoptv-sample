import axios from 'axios';
import { NUMVERIFY_URL, NUMVERIFY_ACCESS_KEY } from './constants';

type ValidationResponse = {
  valid: boolean;
  line_type: string;
};

const validatePhoneNumber = async (
  number: string
): Promise<ValidationResponse | null> => {
  try {
    const response = await axios.get(
      `${NUMVERIFY_URL}?number=${number}&access_key=${NUMVERIFY_ACCESS_KEY}`
    );

    return response.data;
  } catch (err) {
    console.error(`Numverify validation request error: ${err}`);
  }

  return null;
};

export default validatePhoneNumber;
