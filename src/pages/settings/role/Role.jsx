import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

function Role() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/role', title: 'Pengaturan Role' }]));
  }, []);

  return <h1>Pengaturan Role Comming Soon!</h1>;
}

export default Role;
