/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
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
        <h1 className="font-semibold text-lg">Halaman Tidak Ditemukan</h1>
        <div className="my-5 flex justify-center">
          <div className="bg-red-100 w-52 h-52 items-center flex justify-center">
            image
          </div>
        </div>
        <div className="form-control mt-5 items-center mx-2">
          <button
            type="button"
            className="btn btn-md mt-2"
            onClick={handleBtnBack}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
