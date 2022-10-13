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
      query: ({ id }) => ({
        url: `/bts/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useAllBtsMutation, useBtsById } = btsApiSlice;
