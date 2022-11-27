/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const graphApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStatistik: builder.mutation({
      query: () => ({
        url: '/statistik',
        method: 'GET',
      }),
    }),
    getStatistikFilter: builder.mutation({
      query: (param) => ({
        url: `/statistik-range${param}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetStatistikMutation, useGetStatistikFilterMutation } = graphApiSlice;
