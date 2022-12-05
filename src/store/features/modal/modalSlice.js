/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const initState = {
  dashboard: {
    showAddModalComplain: false,
    showDeleteModalComplain: false,
    showUpdateModalComplain: false,
    showRFOTroubleModal: false,
    showRevertModalComplain: false,
  },
  rfo: {
    showAddModalRFOTrouble: false,
    showUpdateModalRFOTrouble: false,
    showDeleteModalRFOTrouble: false,
  },
  report: {
    showDetailModalReport: false,
    showDeleteModalReport: false,
  },
  history_dashboard: {
    showRevertModalHistoryComplain: false,
  },
  bts: {
    showAddModalBts: false,
    showDeleteModalBts: false,
    showUpdateModalBts: false,
    showDetailModalBts: false,
  },
  user: {
    showUpdateModalBts: false,
  },
  pop: {
    showAddModalPop: false,
    showDeleteModalPop: false,
    showUpdateModalPop: false,
  },
  source_complain: {
    showAddModalSourceComplain: false,
    showDeleteModalSourceComplain: false,
    showUpdateModalSourceComplain: false,
  },
  role: {
    showAddModalRole: false,
    showDeleteModalRole: false,
    showUpdateModalRole: false,
  },
  shift: {
    showAddModalShift: false,
    showDeleteModalShift: false,
    showUpdateModalShift: false,
  },
  profile: {
    showPreviewImageModal: false,
  },
}

const initialState = {
  data: initState
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action) => {
      const data = action.payload;
      state.data = data;
    },
    clearModal: (state) => {
      state.data = null;
    },
  },
});

export const { setModal, clearModal } = modalSlice.actions;

export default modalSlice.reducer;

export const selectModalState = (state) => state.modal.data;
