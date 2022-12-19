/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useVerificationEmailMutation } from '../../../store/features/auth/authApiSlice';
import handleResponse from '../../../services/handleResponse';
import catchError from '../../../services/catchError';

function VerificationSuccess() {
  const params = useLocation();
  const [verificationEmail] = useVerificationEmailMutation();

  const verificationToken = async () => {
    try {
      const body = params.search.split('=');
      const data = await verificationEmail(body[1]).unwrap();
      if (data.status === 'Success' || data.status === 'success') {
        handleResponse(data);
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  };

  useEffect(() => {
    verificationToken();
  }, []);

  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-10 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-2xl">Verifikasi Email Berhasil</h1>
        <div className="my-5 flex justify-center">
          <img src="/confirm_email.svg" alt="https://storyset.com/device" className="w-72 items-center flex justify-center" />
          {/* <div className="bg-red-100 w-52 h-52 items-center flex justify-center">
            image
          </div> */}
        </div>
        <p className="label w-72">
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
