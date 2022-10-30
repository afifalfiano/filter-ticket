/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.mutation({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
  }),
});

export const { useAllUsersMutation } = usersApiSlice;
