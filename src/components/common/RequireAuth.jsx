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
  let { data } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  if (!data) {
    const user = localStorage.getItem('user');
    const local = JSON.parse(user);
    console.log(local, 'lokal');
    dispatch(setCredentials(local));
    data = local;
  }

  return (
    data && (
      <>
        <Navbar />
        <Container>
          <Outlet />
        </Container>
      </>
    )
  );
}
export default RequireAuth;
