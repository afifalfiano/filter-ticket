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
  }),
});

export const { useAllTeamMutation } = teamApiSlice;
