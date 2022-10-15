/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  detail: {},
};

const rfoSlice = createSlice({
  name: 'rfo',
  initialState,
  reducers: {
    setRFO: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    setRFOById: (state, action) => {
      const { data } = action.payload;
      state.detail = data;
    },
    clearRFO: (state) => {
      state.data = null;
      state.detail = null;
    },
  },
});

export const { setRFO, setRFOById, clearRFO } = rfoSlice.actions;

export default rfoSlice.reducer;

export const selectAllRFO = (state) => state.rfo;
