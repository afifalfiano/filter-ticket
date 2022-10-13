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
  },
});

export const { setBTS } = btsSlice.actions;

export default btsSlice.reducer;

export const selectAllBTS = (state) => state.bts;