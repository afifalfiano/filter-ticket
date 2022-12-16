/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { apiSlice } from '../../../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.mutation({
      query: () => ({
        url: '/user',
        method: 'GET',
      }),
    }),
    usersById: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'GET',
      }),
    }),
    addUsers: builder.mutation({
      query: (body) => ({
        url: '/user',
        method: 'POST',
        body: { ...body },
      }),
    }),
    updateUsers: builder.mutation({
      query: ({ id, body }) => ({
        url: `/user/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAllUsersMutation,
  useUsersByIdMutation,
  useAddUsersMutation,
  useUpdateUsersMutation,
  useDeleteUsersMutation,
} = usersApiSlice;
