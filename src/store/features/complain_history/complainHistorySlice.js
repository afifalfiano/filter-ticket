/* eslint-disable max-len */

/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  detail: {},
};

const complainHistorySlice = createSlice({
  name: 'complain_history',
  initialState,
  reducers: {
    setComplainHistory: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    setComplainHistoryById: (state, action) => {
      const { data } = action.payload;
      state.detail = data;
    },
    clearComplainHistory: (state) => {
      state.data = null;
      state.detail = null;
    },
  },
});

export const { setComplainHistory, setComplainHistoryById, clearComplainHistory } = complainHistorySlice.actions;

export default complainHistorySlice.reducer;

export const selectAllComplainHistory = (state) => state.complain_history;
