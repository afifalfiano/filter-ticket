import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useRequestOTPMutation,
  useResetPasswordMutation,
} from '../../../store/features/auth/authApiSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { Button } from '../../../components/index';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [requestOTP] = useRequestOTPMutation();
  const [resetPassword] = useResetPasswordMutation();
  const handleInput = (event) => {
    const { id, value } = event.target;
    if (id === 'email') {
      setEmail(value);
    }
    if (id === 'otp') {
      setOTP(value);
    }

    if (id === 'password') {
      setPassword(value);
    }
  };
  const requestAPIOTP = async () => {
    try {
      const data = await requestOTP(email).unwrap();
      if (data.status === 'Success' || data.status === 'success') {
        handleResponse(data);
        setOTP('');
        setPassword('');
        setShowOTP(true);
      } else {
        catchError(data, true);
        setShowOTP(false);
        setOTP('');
        setPassword('');
      }
    } catch (error) {
      catchError(error, true);
      setShowOTP(false);
      setOTP('');
      setPassword('');
    }
  };

  const requestAPIEmail = async () => {
    try {
      const params = `?otp=${otp}&password=${password}`;
      const data = await resetPassword(params).unwrap();
      if (data.status === 'Success' || data.status === 'success') {
        handleResponse(data);
        setShowOTP(true);
        setTimeout(() => {
          navigate('/sign_in');
        }, 2000);
      } else {
        catchError(data, true);
        setShowOTP(false);
      }
    } catch (error) {
      catchError(error, true);
      setShowOTP(false);
    }
  };

  const onSubmitData = async () => {
    if (!showOTP) {
      requestAPIOTP();
    } else {
      requestAPIEmail();
    }
  };
  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-10 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-2xl">Lupa Password</h1>
        <div className="w-full justify-center p-10">
          <img fetchpriority="high" src="/forget_password.svg" width={'100%'} height={'100%'} alt="https://storyset.com/people" className="w-auto items-center flex justify-center " />
        </div>
        <div className="my-1 flex justify-center">
          {!showOTP && (
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
              placeholder="Masukan email"
              value={email}
              className="input input-md input-bordered p-2.5 w-60"
            />
          )}
          {showOTP && (
            <div className="flex flex-col gap-5">
              <div className="form-control">
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  placeholder="Masukan kode OTP"
                  onChange={handleInput}
                  value={otp}
                  className="input input-md input-bordered p-2.5"
                />
              </div>
              <div className="form-control">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Masukan password baru"
                  onChange={handleInput}
                  value={password}
                  className="input input-md input-bordered p-2.5"
                />
              </div>
              <div className="flex gap-3">
                <p>Belum menerima kode OTP?</p>
                <span
                  className="link link-hover text-primary inline"
                  onClick={requestAPIOTP}
                >
                  Kirim ulang
                </span>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-center gap-5 mt-10 items-center mx-2">
          <Button type="button" onClick={() => navigate('/sign_in')}>Kembali</Button>
          <Button type="submit" className="btn-success" onClick={() => onSubmitData()} disabled={showOTP ? otp === '' || password === '' : email === ''}>Kirim {!showOTP ? 'Email' : 'OTP'}</Button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
