/* eslint-disable object-curly-newline */

/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  detail: {},
  rfo_masal: [],
  detail_masal: {},
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
    setRFOGangguanById: (state, action) => {
      const { data } = action.payload;
      state.detail_masal = data;
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

export const { setRFO, setRFOById, setRFOGangguanById, clearRFO, setRFOMasal } = rfoSlice.actions;

export default rfoSlice.reducer;

export const selectAllRFO = (state) => state.rfo.data;
export const selectAllRFOMasal = (state) => state.rfo.rfo_masal;
export const selectRFODetail = (state) => state.rfo.detail;
export const selectRFODetailGangguan = (state) => state.rfo.detail_masal;
