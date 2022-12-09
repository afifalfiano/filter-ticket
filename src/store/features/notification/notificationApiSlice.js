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
    readNotification: builder.mutation({
      query: ({ body }) => ({
        url: `/read-notifikasi`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetNotificationMutation, useReadNotificationMutation } = notificationApiSlice;
