/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRequestOTPMutation } from '../../../store/features/auth/authApiSlice';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [requestOTP] = useRequestOTPMutation();
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const onSubmitData = async () => {
    try {
      const data = await requestOTP(email).unwrap();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-20 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-lg">Lupa Password</h1>
        <div className="my-5 flex justify-center">
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleEmail}
            value={email}
            className="input input-md input-bordered p-2.5"
          />
        </div>
        <div className="flex justify-center gap-5 mt-10 items-center mx-2">
          <Link className="btn btn-md btn-block" to="/sign_in">
            Masuk
          </Link>
          <button
            type="submit"
            className="btn btn-md btn-block btn-success"
            onClick={onSubmitData}
            disabled={email === ''}
          >
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
