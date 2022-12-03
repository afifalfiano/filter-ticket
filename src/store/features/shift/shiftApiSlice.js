/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const shiftApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    indexShift: builder.mutation({
      query: () => ({
        url: '/shift',
        method: 'GET',
      }),
    }),
    createShift: builder.mutation({
      query: ({ body }) => ({
        url: '/shift',
        method: 'POST',
        body
      }),
    }),
    updateShift: builder.mutation({
      query: ({ id, body }) => ({
        url: `/shift/${id}`,
        method: 'PUT',
        body
      }),
    }),
    deleteShift: builder.mutation({
      query: (id) => ({
        url: `/shift/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const { useIndexShiftMutation, useCreateShiftMutation, useUpdateShiftMutation, useDeleteShiftMutation } = shiftApiSlice;
