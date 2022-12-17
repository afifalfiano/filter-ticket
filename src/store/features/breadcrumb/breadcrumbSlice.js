/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [{ path: '/dashboard', title: 'Dasbor' }],
};

const breadcrumbSlice = createSlice({
  name: 'breadcrumb',
  initialState,
  reducers: {
    updateBreadcrumb: (state, action) => {
      const data = action.payload;
      state.data = data;
    },
    resetBreadcrumb: (state) => {
      state.data = [];
    }
  },
});

export const { updateBreadcrumb } = breadcrumbSlice.actions;

export default breadcrumbSlice.reducer;

export const selectBreadcrumb = (state) => state.breadcrumb;
