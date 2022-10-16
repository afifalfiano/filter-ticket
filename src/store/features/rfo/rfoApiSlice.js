/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const rfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allRFO: builder.mutation({
      query: () => ({
        url: '/rfo-keluhan',
        method: 'GET',
      }),
    }),
    rfoById: builder.mutation({
      query: (id) => ({
        url: `/rfo-keluhan/${id}`,
        method: 'GET',
      }),
    }),
    allRFOMasal: builder.mutation({
      query: () => ({
        url: '/rfo-gangguan',
        method: 'GET',
      }),
    }),
    addRFOGangguan: builder.mutation({
      query: (body) => ({
        url: '/rfo-gangguan',
        method: 'POST',
        body
      }),
    }),
  }),
});

export const { useAllRFOMutation, useRfoByIdMutation, useAllRFOMasalMutation, useAddRFOGangguanMutation } = rfoApiSlice;
