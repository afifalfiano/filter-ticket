/* eslint-disable prettier/prettier */
import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';
import authReducer from './features/auth/authSlice';
import btsReducer from './features/bts/btsSlice';
import complainReducer from './features/complain/complainSlice';
import complainHistoryReducer from './features/complain_history/complainHistorySlice';
import rfoReducer from './features/rfo/rfoSlice';
import popReducer from './features/pop/popSlice';
import teamReducer from './features/team/teamSlice';
import sumberKeluhanReducer from './features/sumber_keluhan/sumberKeluhanSlice';
import breadcrumbReducer from './features/breadcrumb/breadcrumbSlice';
import usersReducer from './features/users/usersSlice';
import reportReducer from './features/report/reportSlice';
import shiftReducer from './features/shift/shiftSlice';
import notificationReducer from './features/notification/notificationSlice';
// eslint-disable-next-line import/prefer-default-export
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    breadcrumb: breadcrumbReducer,
    complain: complainReducer,
    rfo: rfoReducer,
    complain_history: complainHistoryReducer,
    pop: popReducer,
    team: teamReducer,
    sumber_keluhan: sumberKeluhanReducer,
    bts: btsReducer,
    users: usersReducer,
    report: reportReducer,
    shift: shiftReducer,
    notification: notificationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
