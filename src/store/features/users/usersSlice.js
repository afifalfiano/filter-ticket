import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      const { data } = action.payload;
      state.data = data;
    },
    clearUsers: (state) => {
      state.data = null;
    },
  },
});

export const { setUsers, clearUsers } = usersSlice.actions;

export default usersSlice.reducer;

export const selectAllUsers = (state) => state.users;
