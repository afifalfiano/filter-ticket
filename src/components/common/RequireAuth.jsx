import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import {
  setCredentials,
} from '../../store/features/auth/authSlice';
import { decryptLocalStorage } from '../../utils/helper';
import { Suspense } from 'react';
import loadable from '@loadable/component';


const Navbar = loadable(() => import('../navbar/Navbar'));
const Container = loadable(() => import('./Container'));

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
      // window.location.reload();
    }
  }, []);

  const renderLoader = () => <p>Loading...</p>;

  return (
    user && (
      <>
        <Navbar />
        <Toaster />
        <Container>
          <Suspense fallback={renderLoader()}>
            <Outlet />
          </Suspense>
        </Container>
      </>
    )
  );
}
export default RequireAuth;
