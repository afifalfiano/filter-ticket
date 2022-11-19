/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const reportApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allReport: builder.mutation({
      query: () => ({
        url: '/laporan',
        method: 'GET',
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
    })
  }),
});

export const {
  useAllReportMutation,
  useGetUserLaporanMutation,
  useAllShiftMutation,
  useGetKeluhanLaporanMutation
} = reportApiSlice;