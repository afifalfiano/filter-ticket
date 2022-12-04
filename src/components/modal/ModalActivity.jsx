/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
/* eslint-disable react/button-has-type */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setModal } from '../../store/features/modal/modalSlice';
import UploadFile from '../common/forms/UploadFile';
import styles from './Modal.module.css';

export function ModalActivity({ stateModal, detail, title }) {
  console.log(detail, 'modal portal');
  useEffect(() => {}, []);

  const dispatch = useDispatch();
  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      dashboard: { ...stateModal.dashboard, showAddModalComplain: false },
    };
    dispatch(setModal(newState));
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className={`modal-box ${styles['modal-box-custom']}`}>
        <button
          htmlFor="my-modal-complain"
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onBtnClose}
        >
          ✕
        </button>
        <h3 className="text-lg font-bold">
          {detail === null ? 'Tambah Keluhan' : 'Ubah Keluhan'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            console.log(values);
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            isValid,
            touched,
            handleChange,
            handleBlur,
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
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="" label="Pilih POP">
                      Pilih POP
                    </option>
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="" label="Pilih Sumber">
                      Pilih Sumber
                    </option>
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
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              {!detail && <UploadFile />}
            </Form>
          )}
        </Formik>
        <hr className="my-2 mt-5" />
        <div className="modal-action justify-center">
          <button
            type="button"
            htmlFor="my-modal-complain"
            className="btn btn-md"
            onClick={onBtnClose}
          >
            Batal
          </button>
          <button
            type="button"
            htmlFor="my-modal-complain"
            className="btn btn-md btn-success"
            onClick={onBtnClose}
          >
            Simpan
          </button>
        </div>
      </div>
      {/* <form className={styles.modalContent}>
        <div className={styles.container}>
          <h1 style={{ fontSize: '20px' }}>Update Stock</h1>
          <p style={{ fontSize: '14px' }}>
            Masukkan jumlah stok yang tersedia di rak saat ini.
          </p>
          <div>Test</div>
          <div className={styles.button}>
            <button onClick={() => onClose(false)}>Kembali</button>
          </div>
        </div>
      </form> */}
    </div>
  );
}
