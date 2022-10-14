/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const data = action.payload;
      state.data = data;
    },
    setLogOut: (state) => {
      state.data = null;
    },
  },
});

export const { setCredentials, setLogOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;
