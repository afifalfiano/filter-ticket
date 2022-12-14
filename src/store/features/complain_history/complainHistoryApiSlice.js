/* eslint-disable max-len */

import { apiSlice } from '../../../api/apiSlice';

export const complainHistoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allComplainHistory: builder.mutation({
      query: (param) => ({
        url: `/history${param}`,
        method: 'GET',
      }),
    }),
    complainHistoryById: builder.mutation({
      query: (id) => ({
        url: `/history/${id}`,
        method: 'GET',
      }),
    }),
    complainHistoryReopen: builder.mutation({
      query: (id) => ({
        url: `/open/${id}`,
        method: 'PUT',
      }),
    }),
  }),
});

export const { useAllComplainHistoryMutation, useComplainHistoryByIdMutation, useComplainHistoryReopenMutation } = complainHistoryApiSlice;
