/* eslint-disable object-curly-newline */

/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const teamSlice = createSlice({
  name: 'team',
  initialState,
  reducers: {
    setTeam: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearTeam: (state) => {
      state.data = null;
    },
  },
});

export const { setTeam, clearTeam } = teamSlice.actions;

export default teamSlice.reducer;

export const selectAllTeam = (state) => state.team;
