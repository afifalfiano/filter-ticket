import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setLogOut } from '../store/features/auth/authSlice';
import { clearBTS } from '../store/features/bts/btsSlice';
import { clearComplain } from '../store/features/complain/complainSlice';
import catchError from '../services/catchError';
import { clearComplainHistory } from '../store/features/complain_history/complainHistorySlice';
import { clearModal } from '../store/features/modal/modalSlice';
import { clearNotification } from '../store/features/notification/notificationSlice';
import { clearPOP } from '../store/features/pop/popSlice';
import { clearReport } from '../store/features/report/reportSlice';
import { clearRFO } from '../store/features/rfo/rfoSlice';
import { clearShift } from '../store/features/shift/shiftSlice';
import { clearSumberKeluhan } from '../store/features/sumber_keluhan/sumberKeluhanSlice';
import { clearTeam } from '../store/features/team/teamSlice';
import { clearUsers } from '../store/features/users/usersSlice';

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
    if (result?.error) {
      const data = {
        status : result?.error.status || result?.error?.originalStatus,
        data: {
          message: result?.error?.data?.message || result?.error?.status.toString()
        }
      }
      if (data?.data?.message?.includes('Keluhan') || data?.data?.message?.includes('Statistic')) {
        catchError(data, false);
      } else {
        catchError(data);
      }
    }
    if (result?.error?.data?.message?.match(/Please login first/ig) || result?.error?.data?.message?.match(/Please activate account/ig)) {
      api.dispatch((action) => {
        action(setLogOut());
        action(clearBTS());
        action(clearComplain());
        action(clearComplainHistory());
        action(clearModal());
        action(clearNotification());
        action(clearPOP());
        action(clearReport());
        action(clearRFO());
        action(clearShift());
        action(clearSumberKeluhan());
        action(clearTeam());
        action(clearUsers());
      });
      localStorage.clear();
      window.location.reload();
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
