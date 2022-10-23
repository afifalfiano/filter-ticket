/* eslint-disable consistent-return */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { setCredentials, setLogOut } from '../store/features/auth/authSlice';
import { clearBTS } from '../store/features/bts/btsSlice';
import { clearComplain } from '../store/features/complain/complainSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  mode: 'cors',
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.data;
    console.log(endpoint, 'hd');
    if (token?.bearer_token) {
      headers.set('authorization', `Bearer ${token?.bearer_token}`);
    }
    // if (endpoint === 'addComplain') {
    //   headers.set('Content-Type', 'multipart/form-data');
    // }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  try {
    const result = await baseQuery(args, api, extraOptions);
    console.log(result, 'ts');
    if (result?.error?.data === 'Please login first') {
      api.dispatch((action) => {
        action(setLogOut());
        action(clearBTS());
        action(clearComplain());
      });
      localStorage.clear();
    }

    if (result?.error?.data === '\nPlease login first') {
      api.dispatch((action) => {
        action(setLogOut());
        action(clearBTS());
        action(clearComplain());
      });
      localStorage.clear();
      window.location.reload();
    }

    if (result?.error?.status === 'FETCH_ERROR') {
      toast.error('Kesalahan Pada Server', {
        style: {
          padding: '16px',
          backgroundColor: '#ff492d',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'error',
        icon: false,
      });
    }
    return result;
  } catch (error) {
    console.log(error, 'err');
  }
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
