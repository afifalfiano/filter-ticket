/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import authReducer from './features/auth/authSlice';
import btsReducer from './features/bts/btsSlice';
import complainReducer from './features/complain/complainSlice';
import rfoReducer from './features/rfo/rfoSlice';
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    bts: btsReducer,
    complain: complainReducer,
    rfo: rfoReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
