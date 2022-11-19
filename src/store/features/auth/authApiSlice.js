/* eslint-disable object-curly-newline */
/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: { ...credentials },
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'GET',
      }),
    }),
    register: builder.mutation({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/profile',
        method: 'PUT',
        body,
      }),
    }),
    getProfile: builder.mutation({
      query: () => ({
        url: '/profile',
        method: 'GET',
      }),
    }),
    requestOTP: builder.mutation({
      query: (email) => ({
        url: `/otp?email=${email}`,
        method: 'GET',
      }),
    }),
    verificationEmail: builder.mutation({
      query: (token) => ({
        url: `/verification/?token=${token}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation, useUpdateProfileMutation, useGetProfileMutation, useRequestOTPMutation, useVerificationEmailMutation } = authApiSlice;
