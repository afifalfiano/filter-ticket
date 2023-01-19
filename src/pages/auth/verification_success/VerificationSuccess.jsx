/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useVerificationEmailMutation } from '../../../store/features/auth/authApiSlice';
import handleResponse from '../../../services/handleResponse';
import catchError from '../../../services/catchError';
import { Button } from '../../../components';

function VerificationSuccess() {
  const navigate = useNavigate();
  const params = useLocation();
  const [verificationEmail] = useVerificationEmailMutation();

  const verificationToken = async () => {
    try {
      const body = params.search.split('=');
      const data = await verificationEmail(body[1]).unwrap();
      if (data.status === 'Success' || data.status === 'success') {
        handleResponse(data);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
          <img src="/confirm_email.svg" width={'100%'} height={'100%'} alt="https://storyset.com/device" className="w-72 items-center flex justify-center" />
        </div>
        <p className="label w-72">
          Verifikasi email telah berhasil dilakukan silahkan login ke aplikasi.
        </p>
        <div className="form-control mt-5 items-center mx-2">
          <Button type="submit" style={{width: '100%'}} onClick={() => navigate('/sign_in')} >Masuk</Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationSuccess;
