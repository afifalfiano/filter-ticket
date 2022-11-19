/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useVerificationEmailMutation } from '../../../store/features/auth/authApiSlice';

function VerificationSuccess() {
  const token = useParams();
  console.log(token, 'id');
  const [verificationEmail] = useVerificationEmailMutation();

  const verificationToken = async () => {
    try {
      const body = token.token.split('=');
      console.log(body[1]);
      const data = await verificationEmail(body[1]).unwrap();
      console.log(data);
      toast.success('Berhasil verifikasi akun.', {
        style: {
          padding: '16px',
          backgroundColor: '#36d399',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'success',
        icon: false,
      });
    } catch (error) {
      console.log(error);
      toast.success('Gagal verifikasi akun.', {
        style: {
          padding: '16px',
          backgroundColor: '#ff492d',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'success',
        icon: false,
      });
    }
  };

  useEffect(() => {
    verificationToken();
  }, []);

  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-20 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-lg">Verifikasi Email Berhasil</h1>
        <div className="my-5 flex justify-center">
          <div className="bg-red-100 w-52 h-52 items-center flex justify-center">
            image
          </div>
        </div>
        <p className="label w-56">
          Verifikasi email telah berhasil dilakukan silahkan login ke aplikasi.
        </p>
        <div className="form-control mt-5 items-center mx-2">
          <Link className="btn btn-md btn-block" to="/sign_in">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerificationSuccess;
