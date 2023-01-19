/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';

function NotFound() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(
      updateBreadcrumb([
        { path: '/dashboard', title: 'Halaman Tidak Ditemukan' },
      ])
    );
  }, []);

  const handleBtnBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-5 justify-center">
      <div className="text-center">
      <h1 className="font-semibold text-2xl">Halaman Tidak Ditemukan</h1>
        <div className="my-5 flex justify-center">
        <div className="my-5 flex justify-center">
          <img src="/not-found.svg" width={'100%'} height={'100%'} alt="https://storyset.com/work" className="w-72 items-center flex justify-center" />
        </div>
        </div>
        <div className="form-control mt-5 items-center mx-2">
          <Button type="button" className="mt-2" onClick={() => handleBtnBack()} >Kembali</Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
