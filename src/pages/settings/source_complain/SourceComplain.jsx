import { useDispatch } from 'react-redux';
import { updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';

function SourceComplain() {
  const dispatch = useDispatch();
  dispatch(
    updateBreadcrumb([
      { path: '/source_complain', title: 'Pengaturan Sumber Keluhan' },
    ])
  );

  return <h1>Pengaturan Sumber Keluhan Comming Soon!</h1>;
}

export default SourceComplain;
