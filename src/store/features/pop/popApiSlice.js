/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const popApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allPOP: builder.mutation({
      query: () => ({
        url: '/pop',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAllPOPMutation } = popApiSlice;