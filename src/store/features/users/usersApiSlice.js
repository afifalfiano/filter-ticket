/* eslint-disable max-len */
/* eslint-disable object-curly-newline */

import { apiSlice } from '../../../api/apiSlice';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allUsers: builder.mutation({
      query: (param) => ({
        url: `/user${param}`,
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
    activateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/reactivate-user/${id}`,
        method: 'GEt',
      }),
    }),
    deactivateUser: builder.mutation({
      query: ({ id }) => ({
        url: `/user/deactivate-user/${id}`,
        method: 'GET',
      }),
    }),
    deleteUsers: builder.mutation({
      query: (id) => ({
        url: `/delete-user/${id}`,
        method: 'GET',
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
  useActivateUserMutation,
  useDeactivateUserMutation
} = usersApiSlice;
