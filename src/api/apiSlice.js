/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setCredentials, setLogOut } from '../store/features/auth/authSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:8000/api',
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const { bearer_token } = getState().auth;
    if (bearer_token) {
      headers.set('authorization', `Bearer ${bearer_token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result, 'rst');
  if (result?.error?.originalStatus === 403) {
    console.log('sending refresh token');
    // send refresh token to get new access token
    const refreshResult = await baseQuery('/refresh', api, extraOptions);
    console.log(refreshResult);
    if (refreshResult?.data) {
      const { user } = api.getState().auth;
      // store the new token
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setLogOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
