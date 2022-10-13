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
      // state.email = email;
      // state.bearer_token = bearer_token;
      // state.username = username;
      // state.role_id = role_id;
      // state.pop_id = pop_id;
      // state.id_user = id_user;
      // state.expires_in = expires_in;
    },
  },
});

export const { setBTS } = btsSlice.actions;

export default btsSlice.reducer;

export const selectAllBTS = (state) => state.bts;
