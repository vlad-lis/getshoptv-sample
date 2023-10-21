import { configureStore } from '@reduxjs/toolkit';
import applicationFormReducer from './applicationFormSlice';

const store = configureStore({
  reducer: {
    applicationForm: applicationFormReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
