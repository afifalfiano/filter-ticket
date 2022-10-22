import { useDispatch } from 'react-redux';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';

function Statistics() {
  const dispatch = useDispatch();
  dispatch(updateBreadcrumb([{ path: '/statistics', title: 'Statistik' }]));

  return <h1>Comming Soon!</h1>;
}

export default Statistics;
