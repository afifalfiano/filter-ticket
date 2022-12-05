/* eslint-disable no-unused-vars */
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  selectCurrentUser,
  setCredentials,
} from '../../store/features/auth/authSlice';
import Container from './Container';
import Navbar from '../navbar/Navbar';
import { selectBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { decryptLocalStorage } from '../../utils/helper';

function RequireAuth() {
  const { data } = useSelector(selectCurrentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const breadcrumb = useSelector(selectBreadcrumb);
  const user = localStorage.getItem('user_encrypt');
  // const urlChanges = window.location.pathname.split('/').pop();

  useEffect(() => {
    // if (!data) {
    console.log(user, 'usr');
    if (user !== null) {
      const local = decryptLocalStorage('user_encrypt');
      console.log(local, 'lokal');
      dispatch(setCredentials(local));
    } else {
      navigate('/sign_in', { replace: true });
      window.location.reload();
    }
    // }
  }, []);

  return (
    user && (
      <>
        <Navbar />
        <Toaster />
        <Container>
          <Outlet />
        </Container>
      </>
    )
  );
}
export default RequireAuth;
