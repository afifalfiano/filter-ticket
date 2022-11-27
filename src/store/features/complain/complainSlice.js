/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  detail: {},
};

const complainSlice = createSlice({
  name: 'complain',
  initialState,
  reducers: {
    setComplain: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    setComplainById: (state, action) => {
      const { data } = action.payload;
      state.detail = data;
    },
    clearComplain: (state) => {
      state.data = null;
      state.detail = null;
    },
  },
});

export const { setComplain, setComplainById, clearComplain } = complainSlice.actions;

export default complainSlice.reducer;

export const selectAllComplain = (state) => state.complain;
export const selectDetailComplain = (state) => state.complain.detail;
