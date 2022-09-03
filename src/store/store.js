/* eslint-disable import/no-named-as-default */
import { configureStore } from '@reduxjs/toolkit';
import counterSlice from './features/counter/counterSlice';

// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    counter: counterSlice,
  },
});
