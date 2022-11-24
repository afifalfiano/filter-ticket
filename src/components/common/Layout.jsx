/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
// import { selectBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';

function Layout({ render }) {
  const { data } = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const urlChanges = window.location.pathname;
  // const breadcrumb = useSelector(selectBreadcrumb);
  useEffect(() => {
    const datalocal = localStorage.getItem('user');
    // console.log(data, 'data state redux');
    console.log(datalocal, 'data state storage');
    if (datalocal) {
      navigate('/dashboard', { replace: true });
      render(false);
    } else {
      navigate(urlChanges, { replace: true });
      render(true);
    }
  }, [urlChanges]);

  return !data && <Outlet />;
}
export default Layout;
