import { apiSlice } from '../../../api/apiSlice';

export const btsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allBts: builder.mutation({
      query: () => ({
        url: '/bts',
        method: 'GET',
      }),
    }),
    btsById: builder.mutation({
      query: (id) => ({
        url: `/bts/${id}`,
        method: 'GET',
      }),
    }),
    addBts: builder.mutation({
      query: (body) => ({
        url: '/bts',
        method: 'POST',
        body: { ...body },
      }),
    }),
    updateBts: builder.mutation({
      query: ({ id, body }) => ({
        url: `/bts/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
    }),
    deleteBts: builder.mutation({
      query: (id) => ({
        url: `/bts/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAllBtsMutation,
  useBtsByIdMutation,
  useAddBtsMutation,
  useUpdateBtsMutation,
  useDeleteBtsMutation,
} = btsApiSlice;
