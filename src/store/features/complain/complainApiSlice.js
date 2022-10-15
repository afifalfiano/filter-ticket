/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const complainApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allComplain: builder.mutation({
      query: () => ({
        url: '/keluhan',
        method: 'GET',
      }),
    }),
    complainById: builder.mutation({
      query: (id) => ({
        url: `/keluhan/${id}`,
        method: 'GET',
      }),
    }),
    deleteComplain: builder.mutation({
      query: (id) => ({
        url: `/keluhan/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useAllComplainMutation, useComplainByIdMutation, useDeleteComplainMutation } = complainApiSlice;
