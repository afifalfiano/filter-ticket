/* eslint-disable max-len */
/* eslint-disable object-curly-newline */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const teamApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allTeam: builder.mutation({
      query: () => ({
        url: '/role',
        method: 'GET',
      }),
    }),
    teamById: builder.mutation({
      query: (id) => ({
        url: `/role/${id}`,
        method: 'GET',
      }),
    }),
    addTeam: builder.mutation({
      query: (body) => ({
        url: '/role',
        method: 'POST',
        body: { ...body },
      }),
    }),
    updateTeam: builder.mutation({
      query: ({ id, body }) => ({
        url: `/role/${id}`,
        method: 'PUT',
        body: { ...body },
      }),
    }),
    deleteTeam: builder.mutation({
      query: (id) => ({
        url: `/role/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAllTeamMutation,
  useTeamByIdMutation,
  useAddTeamMutation,
  useUpdateTeamMutation,
  useDeleteTeamMutation,
} = teamApiSlice;