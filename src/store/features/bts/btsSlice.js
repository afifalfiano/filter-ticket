/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const btsSlice = createSlice({
  name: 'bts',
  initialState,
  reducers: {
    setBTS: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearBTS: (state) => {
      state.data = null;
    },
  },
});

export const { setBTS, clearBTS } = btsSlice.actions;

export default btsSlice.reducer;

export const selectAllBTS = (state) => state.bts;
