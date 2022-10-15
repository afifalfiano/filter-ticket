import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { selectCurrentUser } from '../../store/features/auth/authSlice';

function Layout() {
  const { data } = useSelector(selectCurrentUser);

  return !data && <Outlet />;
}
export default Layout;
