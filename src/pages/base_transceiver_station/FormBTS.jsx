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
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import {
  useAddBtsMutation,
  useUpdateBtsMutation,
} from '../../store/features/bts/btsApiSlice';

function FormBTS({ getInfo, detail }) {
  console.log(detail, 'cek render');
  const [addData] = useAddBtsMutation();
  const [updateBts] = useUpdateBtsMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    btsName: detail?.nama_bts || '',
    picName: detail?.nama_pic || '',
    picContact: detail?.nomor_pic || '',
    fullAddress: detail?.lokasi || '',
    popLocation: detail?.pop_id || '',
    coordinat: detail?.kordinat || '',
  };
  const handlePOP = ($event) => {
    console.log($event, 'ev');
  };

  const onSubmitData = async (payload) => {
    const body = {
      nama_bts: payload.btsName,
      nama_pic: payload.picName,
      nomor_pic: payload.picContact,
      lokasi: payload.fullAddress,
      pop_id: payload.pop_id || 1,
      kordinat: payload.coordinat,
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
            document.getElementById('my-modal-3').click();
            getInfo({ status: 'success' });
          }, 2000);
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
            document.getElementById('my-modal-3').click();
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
      document.getElementById('my-modal-3').click();
    }
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
        <h3 className="text-lg font-bold">
          {detail === null ? 'Tamba BTS' : 'Ubah BTS'}
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
              <div className="form-control">
                <label htmlFor="btsName" className="label">
                  <span className="label-text"> Nama BTS:</span>
                </label>
                <Field
                  id="btsName"
                  name="btsName"
                  placeholder="Nama BTS"
                  value={values.btsName}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="picName" className="label">
                    <span className="label-text"> Nama PIC</span>
                  </label>
                  <Field
                    id="picName"
                    name="picName"
                    value={values.picName}
                    placeholder="Nama PIC"
                    className="input input-md input-bordered max-w-full"
                  />
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="picContact" className="label">
                    <span className="label-text"> Kontak PIC</span>
                  </label>

                  <Field
                    id="picContact"
                    name="picContact"
                    value={values.picContact}
                    placeholder="Kontak PIC"
                    className="input input-md input-bordered max-w-full"
                  />
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="fullAddress" className="label">
                    <span className="label-text"> Alamat Lengkap</span>
                  </label>
                  <Field
                    id="fullAddress"
                    name="fullAddress"
                    value={values.fullAddress}
                    placeholder="Alamat Lengkap"
                    className="input input-md input-bordered max-w-full"
                  />
                </div>
                <div className="form-control flex-1">
                  <label htmlFor="location" className="label">
                    <span className="label-text"> POP (Lokasi)</span>
                  </label>
                  <Field
                    component="select"
                    id="popLocation"
                    name="popLocation"
                    value={values.popLocation}
                    className="select w-full max-w-full input-bordered"

                  >
                    <option value="1">Yogyakarta</option>
                    <option value="2">Solo</option>
                    <option value="3">Surakarta</option>
                  </Field>
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="coordinat" className="label">
                  <span className="label-text"> Koordinat:</span>
                </label>

                <Field
                  id="coordinat"
                  name="coordinat"
                  placeholder="Koordinat"
                  value={values.coordinat}
                  className="input input-md input-bordered max-w-full"
                />
              </div>
              {/* <button type="submit">Submit</button> */}
              <hr className="my-2 mt-10" />
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
                  onClick={() => {
                    onHandleReset(resetForm, 'title');
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  htmlFor="my-modal-3"
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

export default FormBTS;
