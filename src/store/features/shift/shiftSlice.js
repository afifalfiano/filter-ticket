/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const shiftSlice = createSlice({
  name: 'shift',
  initialState,
  reducers: {
    setShift: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearShift: (state) => {
      state.data = null;
    },
  },
});

export const { setShift, clearShift } = shiftSlice.actions;

export default shiftSlice.reducer;

export const selectAllShift = (state) => state.shift;
