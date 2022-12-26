import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  setCredentials,
} from '../../store/features/auth/authSlice';
import Container from './Container';
import Navbar from '../navbar/Navbar';
import { decryptLocalStorage } from '../../utils/helper';

function RequireAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = localStorage.getItem('user_encrypt');

  useEffect(() => {
    if (user !== null) {
      const local = decryptLocalStorage('user_encrypt');
      dispatch(setCredentials(local));
    } else {
      navigate('/sign_in', { replace: true });
      window.location.reload();
    }
  }, []);

  return (
    user && (
      <>
        <Navbar />
        <Toaster />
        <Container className="pt-10">
          <Outlet />
        </Container>
      </>
    )
  );
}
export default RequireAuth;
