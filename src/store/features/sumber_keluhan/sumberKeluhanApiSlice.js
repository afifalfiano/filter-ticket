/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { apiSlice } from '../../../api/apiSlice';

export const sumberKeluhanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSumberKeluhan: builder.mutation({
      query: () => ({
        url: '/sumber-keluhan',
        method: 'GET',
      }),
    }),
    sumberKeluhanById: builder.mutation({
      query: (id) => ({
        url: `/sumber-keluhan/${id}`,
        method: 'GET',
      }),
    }),
    addSumberKeluhan: builder.mutation({
      query: (body) => ({
        url: '/sumber-keluhan',
        method: 'POST',
        body: { ...body },
      }),
    }),
    updateSumberKeluhan: builder.mutation({
      query: ({ id, body }) => ({
        url: `/sumber-keluhan/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
    }),
    deleteSumberKeluhan: builder.mutation({
      query: (id) => ({
        url: `/delete-sumber-keluhan/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAllSumberKeluhanMutation,
  useSumberKeluhanByIdMutation,
  useAddSumberKeluhanMutation,
  useUpdateSumberKeluhanMutation,
  useDeleteSumberKeluhanMutation,
} = sumberKeluhanApiSlice;