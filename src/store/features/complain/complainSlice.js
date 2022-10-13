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
  },
});

export const { setComplain, setComplainById } = complainSlice.actions;

export default complainSlice.reducer;

export const selectAllComplain = (state) => state.complain;
