import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import { decryptLocalStorage } from '../../utils/helper';

function Layout({ render }) {
  const { data } = useSelector(selectCurrentUser);
  const navigate = useNavigate();
  const urlChanges = window.location.pathname;
  useEffect(() => {
    const datalocal = decryptLocalStorage('user_encrypt');
    console.log(datalocal, 'data state storage');
    if (datalocal) {
      navigate('/dashboard', { replace: true });
      render(false);
    } else if (urlChanges.match(/verification/)) {
      render(true);
    } else {
      navigate(urlChanges, { replace: true });
      render(true); 
    }
  }, [urlChanges]);

  return !data && <Outlet />;
}
export default Layout;
