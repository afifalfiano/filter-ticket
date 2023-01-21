/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { apiSlice } from '../../../api/apiSlice';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allReport: builder.mutation({
      query: (param) => ({
        url: `/laporan${param}`,
        method: 'GET',
      }),
    }),
    getOneReport: builder.mutation({
      query: (id) => ({
        url: `/laporan/${id}`,
        method: 'GET',
      }),
    }),
    saveReport: builder.mutation({
      query: ({ body }) => ({
        url: '/laporan',
        method: 'POST',
        body
      }),
    }),
    getUserLaporan: builder.mutation({
      query: () => ({
        url: '/laporan-user',
        method: 'GET',
      }),
    }),
    allShift: builder.mutation({
      query: () => ({
        url: '/shift',
        method: 'GET',
      }),
    }),
    getKeluhanLaporan: builder.mutation({
      query: ({ body }) => ({
        url: '/laporan-keluhan',
        method: 'POST',
        body
      }),
    }),
    deleteLaporan: builder.mutation({
      query: (id) => ({
        url: `/delete-laporan/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAllReportMutation,
  useGetOneReportMutation,
  useSaveReportMutation,
  useGetUserLaporanMutation,
  useAllShiftMutation,
  useGetKeluhanLaporanMutation,
  useDeleteLaporanMutation
} = reportApiSlice;