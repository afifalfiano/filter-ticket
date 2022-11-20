/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-alert */
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { useChangeAvatarMutation } from '../../store/features/auth/authApiSlice';

function PreviewImage({ getInfo }) {
  const [avatar, setAvatar] = useState(null);
  const [file, setFile] = useState(null);
  const [changeAvatar] = useChangeAvatarMutation();
  const handleChange = (e) => {
    console.log(e.target.files);
    setAvatar(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  }
  const onSubmitData = async () => {
    const formData = new FormData();
    formData.append('avatar', file);
    try {
      // create
      // update
      const update = await changeAvatar(formData).unwrap();
      console.log(update, 'body');
      if (update.status === 'success') {
        toast.success('Berhasil ubah foto profile.', {
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
          getInfo({ status: 'success' });
          document.getElementById('my-modal-3').click();
        }, 2000);
      } else {
        toast.error(update.message, {
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
      }
    } catch (error) {
      console.log(error);
      toast.error(error.data.message, {
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
    }
  };

  const onHandleReset = () => {
    setFile(null);
    setAvatar(null);
    document.getElementById('my-modal-3').click();
  };

  return (
    <div className="modal">
      <div className="modal-box max-w-2xl">
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">Preview Profile Baru</h3>
        <hr className="my-2" />
        <div className="flex justify-center align-middle items-center  flex-col text-cennter">
          <label
            htmlFor="dropzone-file"
            className="btn btn-md bg-slate-500 text-white cursor-pointer border-none mt-5"
          >
            {' '}
            Unggah Foto Baru
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleChange}
            />
          </label>
          <div className="border rounded-md mt-5 p-5">
            {avatar && <img src={avatar} alt="avatar" className="image-full max-w-md" />}
            {!avatar && <p>Belum ada gambar</p>}
          </div>
        </div>
        <hr className="my-2 mt-10" />

        <div className="modal-action justify-center">
          <button
            type="button"
            htmlFor="my-modal-3"
            className="btn btn-md"
            onClick={onHandleReset}
          >
            Batal
          </button>
          <button
            disabled={avatar === null}
            type="submit"
            htmlFor="my-modal-3"
            className="btn btn-md btn-success"
            onClick={onSubmitData}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default PreviewImage;
