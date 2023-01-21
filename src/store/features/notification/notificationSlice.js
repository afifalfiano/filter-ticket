
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  totalNotification: 0,
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      const { data } = action.payload;
      state.data = [...data];
    },
    setTotalCount: (state, action) => {
      state.totalNotification = action.payload;
    },
    clearNotification: (state) => {
      state.data = [];
      state.totalNotification = 0;
    },
  },
});

export const { setNotification, clearNotification, setTotalCount } = notificationSlice.actions;

export default notificationSlice.reducer;

export const selectAllNotification = (state) => state.notification;
export const selectTotalCountNotification = (state) => state.notification.totalNotification;
