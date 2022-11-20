/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { data } = action.payload;
      state.data = [...data];
    },
    clearNotification: (state) => {
      state.data = [];
    },
  },
});

export const { setNotification, clearNotification } = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectAllNotification = (state) => state.notification;
