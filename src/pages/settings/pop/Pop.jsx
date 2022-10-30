import { useDispatch } from 'react-redux';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

function Pop() {
  const dispatch = useDispatch();
  dispatch(updateBreadcrumb([{ path: '/pop', title: 'Pengaturan POP' }]));

  return <h1>Pengaturan POP Comming Soon!</h1>;
}

export default Pop;
