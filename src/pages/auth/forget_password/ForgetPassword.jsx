/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import {
  useRequestOTPMutation,
  useResetPasswordMutation,
} from '../../../store/features/auth/authApiSlice';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const [otp, setOTP] = useState('');
  const [password, setPassword] = useState('');
  const [showOTP, setShowOTP] = useState(true);
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
      console.log(data);
      if (data.status === 'Success') {
        toast.success('OTP berhasil dikirim. Silahkan cek email anda.', {
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
        setOTP('');
        setPassword('');
        setShowOTP(true);
      } else {
        toast.success('OTP gagal dikirim.', {
          style: {
            padding: '16px',
            backgroundColor: '#ff492d',
            color: 'white',
          },
          duration: 2000,
          position: 'top-right',
          id: 'error',
          icon: false,
        });
        setShowOTP(false);
        setOTP('');
        setPassword('');
      }
    } catch (error) {
      console.log(error);
      toast.success('OTP gagal dikirim.', {
        style: {
          padding: '16px',
          backgroundColor: '#ff492d',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'error',
        icon: false,
      });
      setShowOTP(false);
      setOTP('');
      setPassword('');
    }
  };

  const requestAPIEmail = async () => {
    try {
      const params = `?otp=${otp}&password=${password}`;
      const data = await resetPassword(params).unwrap();
      console.log(data);
      if (data.status === 'Success') {
        toast.success('Password berhasil direset.', {
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
        setShowOTP(true);
        setTimeout(() => {
          navigate('/sign_in');
        }, 2000);
      } else {
        toast.success('OTP tidak valid.', {
          style: {
            padding: '16px',
            backgroundColor: '#ff492d',
            color: 'white',
          },
          duration: 2000,
          position: 'top-right',
          id: 'error',
          icon: false,
        });
        setShowOTP(false);
      }
    } catch (error) {
      console.log(error);
      toast.success('OTP tidak valid.', {
        style: {
          padding: '16px',
          backgroundColor: '#ff492d',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'error',
        icon: false,
      });
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
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-20 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-lg">Lupa Password</h1>
        <div className="my-5 flex justify-center">
          {!showOTP && (
            <input
              type="email"
              name="email"
              id="email"
              onChange={handleInput}
              placeholder="Masukan email"
              value={email}
              className="input input-md input-bordered p-2.5"
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
                <p>Belum menerima kode OTP?</p>{' '}
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
          <Link className="btn btn-md btn-block" to="/sign_in">
            Kembali
          </Link>
          <button
            type="submit"
            className="btn btn-md btn-block btn-success"
            onClick={onSubmitData}
            disabled={showOTP ? otp === '' || password === '' : email === ''}
          >
            Kirim {!showOTP ? 'Email' : 'OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
