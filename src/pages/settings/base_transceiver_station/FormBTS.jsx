/* eslint-disable max-len */
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
import { useState, useEffect } from 'react';
import * as Yup from 'yup';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import {
  useAddBtsMutation,
  useUpdateBtsMutation,
} from '../../../store/features/bts/btsApiSlice';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { selectAllPOP, setPOP } from '../../../store/features/pop/popSlice';
import { FormBTSSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';

function FormBTS({ stateModal, getInfo, detail, titleAction }) {
  console.log(detail, 'cek render');
  const [addData] = useAddBtsMutation();
  const [updateBts] = useUpdateBtsMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    nama_bts: detail?.nama_bts || '',
    nama_pic: detail?.nama_pic || '',
    nomor_pic: detail?.nomor_pic || '',
    lokasi: detail?.lokasi || '',
    pop_id: detail?.pop_id || '',
    kordinat: detail?.kordinat || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = (title) => {
    const newState = {
      ...stateModal,
      bts: { ...stateModal.bts, showAddModalBts: false, showUpdateModalBts: false, showDetailModalBts: false },
    };
    dispatch(setModal(newState));
  };

  const dataPOP = useSelector(selectAllPOP);
  console.log(dataPOP, 'cek pop');

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      nama_bts: payload.nama_bts,
      nama_pic: payload.nama_pic,
      nomor_pic: payload.nomor_pic,
      lokasi: payload.lokasi,
      pop_id: payload.pop_id || 1,
      kordinat: payload.kordinat,
      user_id: user.id_user,
    };
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        const add = await addData({ ...body });
        if (add.data.status === 'success') {
          toast.success('Berhasil tambah data bts.', {
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
            resetForm();
            // document.getElementById('my-modal-3').click();
            onBtnClose();
            getInfo({ status: 'success' });
          }, 2000);
        } else {
          toast.error(add.data.message, {
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
        // update
        const update = await updateBts({
          id: detail.id_bts,
          body: { ...body },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil ubah data bts.', {
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
            // document.getElementById('my-modal-3').click();
            onBtnClose();
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

  const onHandleReset = (reset) => {
    reset();
    // document.getElementById('my-modal-3').click();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box  h-fit max-h-fit max-w-xl">
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah BTS' : titleAction === 'update' && 'Ubah BTS'}
          {titleAction === 'read' && 'Detail BTS'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormBTSSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            isSubmitting,
            isValid,
            setFieldValue,
            handleBlur,
            handleChange,
            resetForm,
          }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="nama_bts" className="label">
                  <span className="label-text"> Nama BTS:</span>
                </label>
                <Field
                  id="nama_bts"
                  name="nama_bts"
                  placeholder="Nama BTS"
                  value={values.nama_bts}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.nama_bts && touched.nama_bts ? (
                  <div className="label label-text text-red-500">{errors.nama_bts}</div>
                ) : null}
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="nama_pic" className="label">
                    <span className="label-text"> Nama PIC</span>
                  </label>
                  <Field
                    id="nama_pic"
                    name="nama_pic"
                    value={values.nama_pic}
                    disabled={titleAction === 'read'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nama PIC"
                    className="input input-md input-bordered max-w-full"
                  />
                  {errors.nama_pic && touched.nama_pic ? (
                    <div className="label label-text text-red-500">{errors.nama_pic}</div>
                  ) : null}
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="nomor_pic" className="label">
                    <span className="label-text"> Kontak PIC</span>
                  </label>

                  <Field
                    id="nomor_pic"
                    name="nomor_pic"
                    value={values.nomor_pic}
                    disabled={titleAction === 'read'}
                    placeholder="Kontak PIC"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered max-w-full"
                  />
                  {errors.nomor_pic && touched.nomor_pic ? (
                    <div className="label label-text text-red-500">{errors.nomor_pic}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="lokasi" className="label">
                    <span className="label-text"> Alamat Lengkap</span>
                  </label>
                  <Field
                    id="lokasi"
                    name="lokasi"
                    value={values.lokasi}
                    disabled={titleAction === 'read'}
                    placeholder="Alamat Lengkap"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered max-w-full"
                  />
                  {errors.lokasi && touched.lokasi ? (
                    <div className="label label-text text-red-500">{errors.lokasi}</div>
                  ) : null}
                </div>
                <div className="form-control flex-1">
                  <label htmlFor="location" className="label">
                    <span className="label-text"> POP (Lokasi)</span>
                  </label>
                  <Field
                    component="select"
                    id="pop_id"
                    name="pop_id"
                    value={values.pop_id}
                    disabled={titleAction === 'read'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"

                  >
                    <option value="" label="Pilih POP" selected>Pilih POP</option>
                    {dataPOP.data.map((item) => (
                      <option id={item.id_pop} value={item.id_pop} label={item.pop}>
                        {item.pop}
                      </option>
                    ))}
                  </Field>
                  {errors.pop_id && touched.pop_id ? (
                    <div className="label label-text text-red-500">{errors.pop_id}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="kordinat" className="label">
                  <span className="label-text"> Koordinat:</span>
                </label>

                <Field
                  id="kordinat"
                  name="kordinat"
                  placeholder="Koordinat"
                  value={values.kordinat}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={titleAction === 'read'}
                  className="input input-md input-bordered max-w-full"
                />
                {errors.kordinat && touched.kordinat ? (
                  <div className="label label-text text-red-500">{errors.kordinat}</div>
                ) : null}
              </div>
              <hr className="my-2 mt-10" />
              {titleAction !== 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
                  onClick={onBtnClose}
                >
                  Batal
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  htmlFor="my-modal-3"
                  className="btn btn-md btn-success"
                >
                  Simpan
                </button>
              </div>
              )}
              {titleAction === 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
                  onClick={onBtnClose}
                >
                  Kembali
                </button>
              </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormBTS;
