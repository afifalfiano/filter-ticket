/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const sumberKeluhanApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allSumberKeluhan: builder.mutation({
      query: () => ({
        url: '/sumber-keluhan',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAllSumberKeluhanMutation } = sumberKeluhanApiSlice;