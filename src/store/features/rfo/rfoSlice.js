/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  detail: {},
  rfo_masal: [],
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
    setRFOMasal: (state, action) => {
      const { data } = action.payload;
      state.rfo_masal = data;
    },
  },
});

export const { setRFO, setRFOById, clearRFO, setRFOMasal } = rfoSlice.actions;

export default rfoSlice.reducer;

export const selectAllRFO = (state) => state.rfo;
export const selectAllRFOMasal = (state) => state.rfo.rfo_masal;
