/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    setReport: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearReport: (state) => {
      state.data = null;
    },
  },
});

export const { setReport, clearReport } = reportSlice.actions;

export default reportSlice.reducer;

export const selectAllReport = (state) => state.report;
