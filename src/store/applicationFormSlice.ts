import { createSlice } from '@reduxjs/toolkit';
import { TApplicationFormState } from '../types/types';

const initialState: TApplicationFormState = {
  successfulSubmit: false,
};

const applicationFormSlice = createSlice({
  name: 'applicationForm',
  initialState,
  reducers: {
    setSuccessfulSubmit: (state) => {
      state.successfulSubmit = true;
    },
  },
});

export const { setSuccessfulSubmit } = applicationFormSlice.actions;
export default applicationFormSlice.reducer;
