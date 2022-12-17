import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLogOut } from '../store/features/auth/authSlice';
import { clearBTS } from '../store/features/bts/btsSlice';
import { clearComplain } from '../store/features/complain/complainSlice';
import catchError from '../services/catchError';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  mode: 'cors',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.data;
    // console.log(endpoint, 'endpoint');
    if (token?.bearer_token) {
      headers.set('authorization', `Bearer ${token?.bearer_token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    // console.log(result, 'ts');
    if (result?.error?.data?.message === 'Please login first') {
      api.dispatch((action) => {
        action(setLogOut());
        action(clearBTS());
        action(clearComplain());
      });
      localStorage.clear();
      window.location.reload();
    }

    if (result?.error?.data?.message === '\nPlease login first') {
      api.dispatch((action) => {
        action(setLogOut());
        action(clearBTS());
        action(clearComplain());
      });
      localStorage.clear();
      window.location.reload();
    }

    if (result?.error?.status === 'FETCH_ERROR') {
      catchError(result.error);
    }
    return result;
  } catch (error) {
    catchError(error);
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
