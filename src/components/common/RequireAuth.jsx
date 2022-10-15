/* eslint-disable no-unused-vars */
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import {
  selectCurrentUser,
  setCredentials,
} from '../../store/features/auth/authSlice';
import Container from './Container';
import Navbar from '../navbar/Navbar';

function RequireAuth() {
  const { data } = useSelector(selectCurrentUser);

  return data ? (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/sign_in" replace />
  );
}
export default RequireAuth;
