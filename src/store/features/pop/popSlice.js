/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const popSlice = createSlice({
  name: 'pop',
  initialState,
  reducers: {
    setPOP: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearPOP: (state) => {
      state.data = null;
    },
  },
});

export const { setPOP, clearPOP } = popSlice.actions;

export default popSlice.reducer;

export const selectAllPOP = (state) => state.pop;
