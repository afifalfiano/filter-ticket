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
  }),
});

export const {
  useAllReportMutation,
} = reportApiSlice;