/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { apiSlice } from '../../../api/apiSlice';

export const popApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allPOP: builder.mutation({
      query: () => ({
        url: '/pop',
        method: 'GET',
      }),
    }),
    POPById: builder.mutation({
      query: (id) => ({
        url: `/pop/${id}`,
        method: 'GET',
      }),
    }),
    addPOP: builder.mutation({
      query: (body) => ({
        url: '/pop',
        method: 'POST',
        body: { ...body },
      }),
    }),
    updatePOP: builder.mutation({
      query: ({ id, body }) => ({
        url: `/pop/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
    }),
    deletePOP: builder.mutation({
      query: (id) => ({
        url: `/pop/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAllPOPMutation,
  usePOPByIdMutation,
  useAddPOPMutation,
  useUpdatePOPMutation,
  useDeletePOPMutation,
} = popApiSlice;