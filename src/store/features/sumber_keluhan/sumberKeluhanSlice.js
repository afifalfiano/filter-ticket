import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const sumberKeluhanSlice = createSlice({
  name: 'sumber_keluhan',
  initialState,
  reducers: {
    setSumberKeluhan: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearSumberKeluhan: (state) => {
      state.data = null;
    },
  },
});

export const { setSumberKeluhan, clearSumberKeluhan } = sumberKeluhanSlice.actions;

export default sumberKeluhanSlice.reducer;

export const selectAllSumberKeluhan = (state) => state.sumber_keluhan;
