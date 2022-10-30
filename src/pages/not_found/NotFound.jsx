/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';

function NotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/dashboard', title: 'Dasbor' }]));
  }, []);

  const handleBtnBack = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <div>Halaman Tidak Ditemukan</div>
      <button type="button" className="btn btn-md mt-2" onClick={handleBtnBack}>
        Kembali
      </button>
    </>
  );
}

export default NotFound;
