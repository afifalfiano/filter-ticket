/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const handleValidation = () => {
    if (
      email.trim().includes('@') &&
      fullName.trim().length > 0 &&
      password.trim().length > 0 &&
      confirmPassword.trim().length > 0
    ) {
      const compare = password.trim() === confirmPassword.trim();
      console.log(compare, 'cmp');
      console.log(password.trim(), 'paswd');
      console.log(confirmPassword.trim(), 'paswd cnf');
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
      confirmPassword,
      fullName,
      location,
      team,
    };
    console.log(user, 'user');
    const local = JSON.stringify(user);
    localStorage.setItem('user', local);

    toast.success('Berhasil buat akun baru.', {
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

    setTimeout(() => {
      navigate('/verification_email', { replace: true });
    }, 2000);
    // window.location.reload();
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    handleValidation();
  };

  const handleFullName = (event) => {
    setFullName(event.target.value);
    handleValidation();
  };

  const handleTeam = (event) => {
    setTeam(event.target.value);
    handleValidation();
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
    handleValidation();
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    handleValidation();
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
    handleValidation();
  };

  return (
    <div className="grid grid-flow-col gap-3 h-screen min-h-screen">
      <div className="col-span-6 bg-gray-200 ">
        <p className="flex justify-center align-middle items-center  min-h-screen">
          Image
        </p>
      </div>
      <div className="col-span-1 h-full bg-white">
        <form onSubmit={onSubmitLogin} className="flex-row pl-16 pr-16">
          <div className="pt-6">
            <h4 className="text-2xl text-center font-semibold">
              Silahkan Mendaftar
            </h4>
          </div>
          <div className="form-control pt-4">
            <label htmlFor="fullName" className="label">
              <span className="label-text"> Nama Lengkap:</span>
            </label>

            <input
              type="text"
              value={fullName}
              id="fullName"
              onChange={handleFullName}
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="form-control pt-4">
            <label htmlFor="email" className="label">
              <span className="label-text"> Email:</span>
            </label>

            <input
              type="email"
              value={email}
              id="email"
              onChange={handleEmail}
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="form-control pt-4">
            <label htmlFor="team" className="label">
              <span className="label-text"> Tim:</span>
            </label>

            <select
              className="select w-full max-w-full input-bordered"
              id="team"
              value={team}
              onChange={handleTeam}
            >
              <option disabled>Pilih Tim</option>
              <option>HELPDESK</option>
              <option>NOC</option>
            </select>
          </div>

          <div className="form-control pt-4">
            <label htmlFor="location" className="label">
              <span className="label-text"> POP(Lokasi):</span>
            </label>

            <select
              className="select w-full max-w-full input-bordered"
              value={location}
              onChange={handleLocation}
            >
              <option disabled>Pilih Lokasi</option>
              <option>Yogyakarta</option>
              <option>Solo</option>
              <option>Surakarta</option>
            </select>
          </div>

          <div className="form-control pt-4 ">
            <label htmlFor="password" className="label">
              <span className="label-text"> Password:</span>
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={handlePassword}
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="form-control pt-4 ">
            <label htmlFor="confirmPassword" className="label">
              <span className="label-text"> Konfirmsi Password:</span>
            </label>
            <input
              type="password"
              value={confirmPassword}
              id="confirmPassword"
              onChange={handleConfirmPassword}
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="form-control mt-5">
            <button
              type="submit"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-block"
              disabled={!valid}
            >
              Daftar
            </button>
          </div>

          <div className="label justify-center pt-4">
            <span>Sudah punya akun?</span>
            <span className="font-bold link-primary">
              <Link to="/sign_in">&nbsp; Masuk</Link>
            </span>
          </div>
          <Toaster />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
