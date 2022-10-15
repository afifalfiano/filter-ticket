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
  const [addComplain] = useAddComplainMutation();
  const [updateComplain] = useUpdateComplainMutation();
  const { data: user } = useSelector(selectCurrentUser);

  const initialValues = {
    id_pelanggan: detail?.id_pelanggan || '',
    nama_pelanggan: detail?.nama_pelanggan || '',
    nama_pelapor: detail?.nama_pelapor || '',
    nomor_pelapor: detail?.nomor_pelapor || '',
    nomor_keluhan: detail?.nomor_keluhan || '',
    source: detail?.source || '',
    email: detail?.email || '',
    keluhan: detail?.keluhan || '',
    status: detail?.status || '',
    pop_id: detail?.pop_id || '',
  };

  const onSubmitData = async (payload) => {
    const body = {
      id_pelanggan: payload.id_pelanggan,
      nama_pelanggan: payload.nama_pelanggan,
      nama_pelapor: payload.nama_pelapor,
      nomor_pelapor: payload.nomor_pelapor,
      nomor_keluhan: payload.nomor_keluhan || Math.random(5),
      source: payload.source || 'email',
      email: payload.email,
      keluhan: payload.keluhan,
      status: payload.status || 'open',
      pop_id: payload.pop_id || 1,
      user_id: user.user_id,
    };
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
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
        }
      } else {
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
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleReset = (reset, title) => {
    if (title === 'submit') {
      setTimeout(() => {
        if (detail === null) {
          reset();
        }
      }, 2000);
    } else {
      reset();
      document.getElementById('my-modal-complain').click();
    }
  };

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
                  <label htmlFor="source" className="label">
                    <span className="label-text"> Sumber Keluhan</span>
                  </label>
                  <Field
                    component="select"
                    id="source"
                    name="source"
                    value={values.source}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="1">Email</option>
                    <option value="2">Twitter</option>
                    <option value="3">Instagram</option>
                  </Field>
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="email" className="label">
                    <span className="label-text"> Kontak Sumber Keluhan</span>
                  </label>

                  <Field
                    id="email"
                    name="email"
                    placeholder="Kontak Sumber Keluhan"
                    value={values.email}
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

              <div className="form-control">
                <label htmlFor="email" className="label">
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
                    <input id="dropzone-file" type="file" className="hidden" />
                  </label>
                </div>
              </div>

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
