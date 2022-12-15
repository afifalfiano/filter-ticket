import { apiSlice } from '../../../api/apiSlice';

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotification: builder.mutation({
      query: () => ({
        url: '/notifikasi',
        method: 'GET',
      }),
    }),
    postNotification: builder.mutation({
      query: ({ body }) => ({
        url: '/notifikasi',
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
    storeAllNotification: builder.mutation({
      query: ({ body }) => ({
        url: `/broadcast-notifikasi`,
        method: 'POST',
        body,
      }),
    }),
    readAllNotification: builder.mutation({
      query: () => ({
        url: `/read-all-notifikasi`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useGetNotificationMutation, usePostNotificationMutation, useReadNotificationMutation, useStoreAllNotificationMutation, useReadAllNotificationMutation } = notificationApiSlice;
