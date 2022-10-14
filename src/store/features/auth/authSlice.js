/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: null,
  bearer_token: null,
  username: null,
  role_id: null,
  pop_id: null,
  id_user: null,
  expires_in: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log(state, 'st');
      console.log(action, 'act');
      const {
        username,
        email,
        role_id,
        pop_id,
        id_user,
        expires_in,
        bearer_token,
      } = action.payload;
      state.email = email;
      state.bearer_token = bearer_token;
      state.username = username;
      state.role_id = role_id;
      state.pop_id = pop_id;
      state.id_user = id_user;
      state.expires_in = expires_in;
    },
    setLogOut: (state) => {
      // localStorage.clear();
      state.email = null;
      state.bearer_token = null;
      state.username = null;
      state.role_id = null;
      state.pop_id = null;
      state.id_user = null;
      state.expires_in = null;
    },
  },
});

export const { setCredentials, setLogOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth;
