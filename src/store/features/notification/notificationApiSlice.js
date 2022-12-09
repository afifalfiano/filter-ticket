/* eslint-disable max-len */
/* eslint-disable prettier/prettier */
import { apiSlice } from '../../../api/apiSlice';

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.mutation({
      query: () => ({
        url: '/notifikasi2',
        method: 'GET',
      }),
    }),
    postNotification: builder.mutation({
      query: ({ body }) => ({
        url: '/notifikasi2',
        method: 'POST',
        body
      }),
    }),
    readNotification: builder.mutation({
      query: ({ body }) => ({
        url: `/read-notifikasi`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetNotificationMutation, usePostNotificationMutation, useReadNotificationMutation } = notificationApiSlice;
