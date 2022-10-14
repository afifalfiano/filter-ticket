import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import Container from './Container';
import Navbar from '../navbar/Navbar';

function RequireAuth() {
  const token = useSelector(selectCurrentUser);
  return token.data ? (
    <>
      <Navbar />
      <Container>
        <Outlet />
      </Container>
    </>
  ) : (
    <Navigate to="/sign-in" replace />
  );
}
export default RequireAuth;
