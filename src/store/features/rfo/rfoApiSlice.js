/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { apiSlice } from '../../../api/apiSlice';

export const rfoApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allRFO: builder.mutation({
      query: () => ({
        url: '/rfo-keluhan',
        method: 'GET',
      }),
    }),
    deleteRFOKeluhan: builder.mutation({
      query: (id) => ({
        url: `/delete-rfo-keluhan/${id}`,
        method: 'GET',
      }),
    }),
    rfoById: builder.mutation({
      query: (id) => ({
        url: `/rfo-keluhan/${id}`,
        method: 'GET',
      }),
    }),
    rfoGangguanById: builder.mutation({
      query: (id) => ({
        url: `/rfo-gangguan/${id}`,
        method: 'GET',
      }),
    }),
    addRFOKeluhan: builder.mutation({
      query: (body) => ({
        url: '/rfo-keluhan',
        method: 'POST',
        body
      }),
    }),
    updateRFOKeluhan: builder.mutation({
      query: ({ id, body }) => ({
        url: `/rfo-keluhan/${id}`,
        method: 'PUT',
        body
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
    updateRFOGangguan: builder.mutation({
      query: ({ id, body }) => ({
        url: `/rfo-gangguan/${id}`,
        method: 'PUT',
        body
      }),
    }),
    deleteRFOGangguan: builder.mutation({
      query: (id) => ({
        url: `/delete-rfo-gangguan/${id}`,
        method: 'GET',
      }),
    }),
    updateKeluhanRFOGangguan: builder.mutation({
      query: ({ id, body }) => ({
        url: `/keluhan-rfo-gangguan/${id}`,
        method: 'PUT',
        body
      }),
    }),
    updateKeluhanRFOKeluhan: builder.mutation({
      query: ({ id, body }) => ({
        url: `/keluhan-rfo-keluhan/${id}`,
        method: 'PUT',
        body
      }),
    }),
  }),
});

export const { useAllRFOMutation, useDeleteRFOKeluhanMutation, useRfoByIdMutation, useRfoGangguanByIdMutation, useAddRFOKeluhanMutation, useUpdateRFOKeluhanMutation, useAllRFOMasalMutation, useAddRFOGangguanMutation, useUpdateRFOGangguanMutation, useDeleteRFOGangguanMutation, useUpdateKeluhanRFOGangguanMutation, useUpdateKeluhanRFOKeluhanMutation } = rfoApiSlice;
