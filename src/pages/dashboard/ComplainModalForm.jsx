/* eslint-disable no-console */
/* eslint-disable import/no-duplicates */
/* eslint-disable react/prop-types */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/button-has-type */
/* eslint-disable react/no-unknown-property */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiOutlineClipboardCheck,
  HiOutlineClipboardList,
  HiQuestionMarkCircle,
  HiExclamation,
} from 'react-icons/hi';
import { FaUndoAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import styles from './ComplainModalForm.module.css';
import { useAddComplainMutation, useUpdateComplainMutation } from '../../store/features/complain/complainApiSlice';

function ComplainModalForm({ getInfo, detail }) {
  const [addComplain, { isSuccess: isSuccessCreate }] = useAddComplainMutation();
  const [updateComplain, { isSuccess: isSuccessUpdate }] = useUpdateComplainMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const [files, setFiles] = useState([]);

  const initialValues = {
    id_pelanggan: detail?.id_pelanggan || '',
    nama_pelanggan: detail?.nama_pelanggan || '',
    nama_pelapor: detail?.nama_pelapor || '',
    nomor_pelapor: detail?.nomor_pelapor || '',
    nomor_keluhan: detail?.nomor_keluhan || '',
    sumber: detail?.sumber || '',
    detail_sumber: detail?.detail_sumber || '',
    keluhan: detail?.keluhan || '',
    status: detail?.status || '',
    pop_id: detail?.pop_id || '',
  };

  const onSubmitData = async (payload) => {
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        // const formData = new FormData();
        // formData.append('id_pelanggan', payload.id_pelanggan)
        // formData.append('nama_pelanggan', payload.nama_pelanggan)
        // formData.append('nama_pelapor', payload.nama_pelapor)
        // formData.append('nomor_pelapor', payload.nomor_pelapor)
        // formData.append('sumber', payload.sumber || 'Email')
        // formData.append('detail_sumber', payload.detail_sumber)
        // formData.append('keluhan', payload.keluhan)
        // formData.append('status', payload.status || 'open')
        // formData.append('pop_id', payload.pop_id || 1)
        // formData.append('user_id', user.id_user)
        // formData.append('lampiran', files)
        const body = {
          id_pelanggan: payload.id_pelanggan,
          nama_pelanggan: payload.nama_pelanggan,
          nama_pelapor: payload.nama_pelapor,
          nomor_pelapor: payload.nomor_pelapor,
          nomor_keluhan: payload.nomor_keluhan || Math.random(5),
          sumber: payload.sumber || 'email',
          detail_sumber: payload.detail_sumber,
          keluhan: payload.keluhan,
          status: payload.status || 'open',
          pop_id: payload.pop_id || 1,
          user_id: user.id_user,
          lampiran: '',
        };
        const add = await addComplain({ ...body });
        if (add.data.status === 'success') {
          toast.success('Berhasil tambah data keluhan.', {
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
            document.getElementById('my-modal-complain').click();
            getInfo({ status: 'success' });
          }, 2000);
        } else {
          toast.error(`${add.data.message}`, {
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
      } else {
        const body = {
          nama_pelapor: payload.nama_pelapor,
          nomor_pelapor: payload.nomor_pelapor,
          sumber: payload.sumber || 'Email',
          detail_sumber: payload.detail_sumber,
          keluhan: payload.keluhan,
          pop_id: payload.pop_id || 1,
        };
        // update

        const update = await updateComplain({
          id: detail.id_keluhan,
          body: { ...body },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil ubah data komplain.', {
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
            document.getElementById('my-modal-complain').click();
          }, 2000);
        } else {
          toast.error(update.data.message, {
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

  const onHandleReset = (reset, title) => {
    if (title === 'submit') {
      setTimeout(() => {
        if (detail === null) {
          if (isSuccessCreate || isSuccessUpdate) {
            reset();
          }
        }
      }, 2000);
    } else {
      reset();
      document.getElementById('my-modal-complain').click();
    }
  };

  const onHandleFileUpload = ($event) => {
    console.log($event.target.files, 'file');
    console.log($event.target.files.length, 'file');
    const file = $event.target.files;
    file.length > 0 ? setFiles(file[0]) : setFiles([]);
  }

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
  }

  return (
    <div className="modal">
      <div className={`${styles['modal-box-custom']}`}>
        <label
          htmlFor="my-modal-complain"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">
          {detail === null ? 'Tamba Keluhan' : 'Ubah Keluhan'}
        </h3>
        <hr className="my-2" />

        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values) => {
            onSubmitData(values);
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            isValid,
            setFieldValue,
            handleChange,
            resetForm,
          }) => (
            <Form>
              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="id_pelanggan" className="label">
                    <span className="label-text"> ID Pelanggan</span>
                  </label>
                  <Field
                    id="id_pelanggan"
                    name="id_pelanggan"
                    placeholder="ID Pelanggan"
                    value={values.id_pelanggan}
                    className="input input-md input-bordered  max-w-full"
                    disabled={detail !== null ? true : null}
                  />
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="nama_pelanggan" className="label">
                    <span className="label-text"> Nama Pelanggan</span>
                  </label>

                  <Field
                    id="nama_pelanggan"
                    name="nama_pelanggan"
                    placeholder="Nama Pelanggan"
                    value={values.nama_pelanggan}
                    className="input input-md input-bordered  max-w-full"
                    disabled={detail !== null ? true : null}
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-grow-1 w-1/2">
                  <label htmlFor="pop_id" className="label">
                    <span className="label-text"> POP (Lokasi)</span>
                  </label>
                  <Field
                    component="select"
                    id="pop_id"
                    name="pop_id"
                    value={values.pop_id}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="1">Yogyakarta</option>
                    <option value="2">Solo</option>
                    <option value="3">Surakarta</option>
                  </Field>
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="sumber" className="label">
                    <span className="label-text"> Sumber Keluhan</span>
                  </label>
                  <Field
                    component="select"
                    id="sumber"
                    name="sumber"
                    value={values.sumber}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="1">Email</option>
                    <option value="2">Twitter</option>
                    <option value="3">Instagram</option>
                  </Field>
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="detail_sumber" className="label">
                    <span className="label-text"> Kontak Sumber Keluhan</span>
                  </label>

                  <Field
                    id="detail_sumber"
                    name="detail_sumber"
                    placeholder="Kontak Sumber Keluhan"
                    value={values.detail_sumber}
                    className="input input-md input-bordered  max-w-full"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="nama_pelapor" className="label">
                    <span className="label-text"> Nama Kontak</span>
                  </label>

                  <Field
                    id="nama_pelapor"
                    name="nama_pelapor"
                    placeholder="Nama Kontak"
                    value={values.nama_pelapor}
                    className="input input-md input-bordered  max-w-full"
                  />
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="nomor_pelapor" className="label">
                    <span className="label-text"> Nomor Kontak</span>
                  </label>

                  <Field
                    id="nomor_pelapor"
                    name="nomor_pelapor"
                    placeholder="Nomor Kontak"
                    value={values.nomor_pelapor}
                    className="input input-md input-bordered  max-w-full"
                  />
                </div>
              </div>

              <div className="form-control">
                <label htmlFor="keluhan" className="label">
                  <span className="label-text"> Keluhan Awal:</span>
                </label>

                <Field
                  id="keluhan"
                  name="keluhan"
                  component="textarea"
                  placeholder="Keluhan"
                  value={values.keluhan}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              {!detail && (
              <div className="form-control">
                <label htmlFor="lampiran" className="label">
                  <span className="label-text"> Unggah Lampiran:</span>
                </label>

                <div className="flex justify-center items-center w-full">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col justify-center items-center w-full h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer "
                  >
                    <div className="flex flex-col justify-center items-center pt-5 pb-6">
                      <HiOutlineCloudUpload size={28} />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, WORD, JPG, JPEG
                      </p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" onChange={onHandleFileUpload} />
                  </label>
                </div>
                <div className="mt-2 font-semibold">
                  File Upload: {files.name} - {formatBytes(files.size)}
                </div>
              </div>
              )}

              <hr className="my-2 mt-5" />
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-complain"
                  className="btn btn-md"
                  onClick={() => {
                    onHandleReset(resetForm, 'title');
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  htmlFor="my-modal-complain"
                  className="btn btn-md btn-success"
                  onClick={() => {
                    onHandleReset(resetForm, 'submit');
                  }}
                >
                  Simpan
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default ComplainModalForm;
