/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const dataLocal = localStorage.getItem('user');
const dataParse = JSON.parse(dataLocal);

const initialState = {
  data: dataParse || null,
  profile: null,
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
    notifChangeProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setCredentials, setLogOut, notifChangeProfile } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;
export const subscribeChangeProfile = (state) => state.auth.profile;
