import { useDispatch } from 'react-redux';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

function Users() {
  const dispatch = useDispatch();
  dispatch(
    updateBreadcrumb([{ path: '/users', title: 'Pengaturan Pengguna' }])
  );

  return <h1>Pengaturan Pengguna Comming Soon!</h1>;
}

export default Users;
