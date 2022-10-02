/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

/* eslint-disable react/prop-types */
function FormUpdateProfile({ handleForm }) {
  const [fullName, setFullName] = useState('Afif Alfiano');
  const [email, setEmail] = useState('afif@gmail.com');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('12345');
  const [confirmPassword, setConfirmPassword] = useState('123456');
  const [oldPassword, setOldPassword] = useState('123456');

  const onBtnBack = () => {
    handleForm(false);
  };

  const onBtnSubmit = () => {
    toast.success('Berhasil perbarui profile.', {
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
      handleForm(false);
    }, 2000);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleFullName = (event) => {
    setFullName(event.target.value);
  };

  const handleTeam = (event) => {
    setTeam(event.target.value);
  };

  const handleLocation = (event) => {
    setLocation(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPassword = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleOldPassword = (event) => {
    setOldPassword(event.target.value);
  };

  return (
    <div>
      <div className="flex items-start justify-center">
        <div className="text-center">
          <div className="avatar placeholder">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
              <span className="text-3xl">A</span>
            </div>
          </div>
          <h1 className="font-semibold text-xl mt-5">Ubah Profile</h1>
          <div className="my-5 flex justify-center gap-7">
            <div className="border-gray-200 rounded-md border-2 w-80 h-auto items-center flex-1 flex-row justify-center">
              <div className="px-5 py-5">
                <div className="form-control">
                  <label htmlFor="fullName" className="label">
                    <span className="label-text"> Nama Lengkap:</span>
                  </label>

                  <input
                    type="fullName"
                    value={fullName}
                    id="fullName"
                    onChange={handleFullName}
                    className="input input-md input-bordered  max-w-full"
                  />
                </div>

                <div className="form-control">
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

                <div className="form-control">
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

                <div className="form-control">
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
              </div>
            </div>
            <div className="border-gray-200 rounded-md border-2 w-80 h-auto items-center flex-1 flex-row justify-center">
              <div className="px-5 py-5">
                <div className="form-control ">
                  <label htmlFor="oldPassword" className="label">
                    <span className="label-text"> Password Lama:</span>
                  </label>
                  <input
                    type="oldPassword"
                    value={oldPassword}
                    id="oldPassword"
                    onChange={handleOldPassword}
                    className="input input-md input-bordered  max-w-full"
                  />
                </div>

                <div className="form-control ">
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

                <div className="form-control ">
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
              </div>
            </div>
          </div>
          <div className="flex flex-nowrap gap-5 justify-center">
            <button
              type="button"
              onClick={onBtnBack}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md bg-black text-white w-24"
            >
              Kembali
            </button>
            <button
              type="submit"
              onClick={onBtnSubmit}
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-24 bg-success"
            >
              Simpan
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default FormUpdateProfile;
