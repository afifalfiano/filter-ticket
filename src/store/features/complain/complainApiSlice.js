/* eslint-disable object-curly-newline */
/* eslint-disable max-len */

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
    addComplain: builder.mutation({
      query: (body) => ({
        url: `/keluhan`,
        method: 'POST',
        body
      }),
    }),
    updateComplain: builder.mutation({
      query: ({ id, body }) => ({
        url: `/keluhan/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
    }),
    addReply: builder.mutation({
      query: (body) => ({
        url: `/balasan`,
        method: 'POST',
        body,
      }),
    }),
    complainClosed: builder.mutation({
      query: (id) => ({
        url: `/close/${id}`,
        method: 'PUT',
      }),
    }),
    lampiranFile: builder.mutation({
      query: ({ body }) => ({
        url: `/lampiran-keluhan`,
        method: 'POST',
        body
      }),
    }),
    lampiranFileBalasan: builder.mutation({
      query: ({ body }) => ({
        url: `/lampiran-balasan`,
        method: 'POST',
        body
      }),
    }),
  }),
});

export const { useAllComplainMutation, useComplainByIdMutation, useDeleteComplainMutation, useAddComplainMutation, useUpdateComplainMutation, useAddReplyMutation, useComplainClosedMutation, useLampiranFileMutation, useLampiranFileBalasanMutation } = complainApiSlice;
