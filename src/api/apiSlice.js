/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setLogOut } from '../store/features/auth/authSlice';
import { clearBTS } from '../store/features/bts/btsSlice';
import { clearComplain } from '../store/features/complain/complainSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  mode: 'cors',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.data;
    console.log(endpoint, 'hd');
    if (token?.bearer_token) {
      headers.set('Authorization', `Bearer ${token?.bearer_token}`);
    }
    // if (endpoint === 'addComplain') {
    //   headers.set('Content-Type', 'multipart/form-data');
    // }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);
  if (result?.error?.data === 'Please login first') {
    api.dispatch((action) => {
      action(setLogOut());
      action(clearBTS());
      action(clearComplain());
    });
    localStorage.clear();
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
