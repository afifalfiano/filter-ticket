/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable no-prototype-builtins */
/* eslint-disable no-plusplus */
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
import * as Yup from 'yup';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import styles from './ComplainModalForm.module.css';
import { useAddComplainMutation, useLampiranFileMutation, useUpdateComplainMutation } from '../../../store/features/complain/complainApiSlice';
import { selectAllPOP } from '../../../store/features/pop/popSlice';
import { useAllSumberKeluhanMutation } from '../../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { selectAllSumberKeluhan, setSumberKeluhan } from '../../../store/features/sumber_keluhan/sumberKeluhanSlice';
import UploadFile from '../../../components/common/forms/UploadFile';
import { ComplainFormSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';
import { usePostNotificationMutation } from '../../../store/features/notification/notificationApiSlice';

function ComplainModalForm({ stateModal, getInfo, detail }) {
  const [addComplain, { isSuccess: isSuccessCreate }] = useAddComplainMutation();
  const [updateComplain, { isSuccess: isSuccessUpdate }] = useUpdateComplainMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const popData = useSelector(selectAllPOP);
  console.log(popData, 'pop nih')
  const [filesLocal, setFilesLocal] = useState([]);

  const dataSumber = useSelector(selectAllSumberKeluhan);
  const [lampiranFile] = useLampiranFileMutation();
  const [postNotification] = usePostNotificationMutation();

  const initialValues = {
    id_pelanggan: detail?.id_pelanggan || '',
    nama_pelanggan: detail?.nama_pelanggan || '',
    nama_pelapor: detail?.nama_pelapor || '',
    nomor_pelapor: detail?.nomor_pelapor || '',
    nomor_keluhan: detail?.nomor_keluhan || '',
    sumber: detail?.sumber_id || '',
    detail_sumber: detail?.detail_sumber || '',
    keluhan: detail?.keluhan || '',
    status: detail?.status || '',
    pop_id: detail?.pop_id || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = (title) => {
    const newState = {
      ...stateModal,
      dashboard: { ...stateModal.dashboard, showAddModalComplain: false, showUpdateModalComplain: false },
    };
    dispatch(setModal(newState));
  };

  const doPostNotification = async (keluhan_id) => {
    try {
      const body = {
        keluhan_id,
        pop_id: user.pop_id
      }
      const data = await postNotification({ body }).unwrap();
      console.log(data, 'res');
    } catch (error) {
      console.log(error);
    }
  }

  const onSubmitData = async (payload, resetForm) => {
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        const test = {
          string: payload.keluhan,
        }
        const sentimen = await fetch('https://tediyanwibowo.pythonanywhere.com/model', {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(test),
        });

        const resultSentimen = await sentimen.json()
        console.log(resultSentimen, 'sentimen');
        if (resultSentimen.hasOwnProperty('sentiment')) {
          const body = {
            id_pelanggan: payload.id_pelanggan,
            nama_pelanggan: payload.nama_pelanggan,
            nama_pelapor: payload.nama_pelapor,
            nomor_pelapor: payload.nomor_pelapor,
            sumber_id: payload.sumber,
            detail_sumber: payload.detail_sumber,
            keluhan: payload.keluhan,
            status: 'open',
            pop_id: payload.pop_id,
            user_id: user.id_user,
            sentimen_analisis: resultSentimen.sentiment,
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

            if (filesLocal.length > 0) {
              const formData = new FormData();
              formData.append('keluhan_id', add?.data?.id_keluhan?.id_keluhan);
              for (let index = 0; index < filesLocal.length; index++) {
                formData.append(`path[${index}]`, filesLocal[index])
              }

              const dataLampiran = await lampiranFile({ body: formData }).unwrap();
              console.log(dataLampiran, 'lampiran');
            }
            doPostNotification(add?.data?.id_keluhan?.id_keluhan);
            setTimeout(() => {
              resetForm();
              // document.getElementById('my-modal-complain').click();
              onBtnClose();
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
        }
      } else {
        const body = {
          nama_pelapor: payload.nama_pelapor,
          nomor_pelapor: payload.nomor_pelapor,
          sumber_id: payload.sumber,
          detail_sumber: payload.detail_sumber,
          keluhan: payload.keluhan,
          pop_id: payload.pop_id,
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
            onBtnClose();
            // document.getElementById('my-modal-complain').click();
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
    // document.getElementById('my-modal-complain').click();
  };

  const onHandleFileUpload = ($event) => {
    console.log($event, 'file');
    setFilesLocal($event);
  }

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className={`modal-box h-fit max-h-fit ${styles['modal-box-custom']}`}>
        <button
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
          validationSchema={ComplainFormSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values, resetForm);
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
                    value={values.id_pelanggan}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                    disabled={detail !== null ? true : null}
                  />
                  {errors.id_pelanggan && touched.id_pelanggan ? (
                    <div className="label label-text text-red-500">{errors.id_pelanggan}</div>
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                    disabled={detail !== null ? true : null}
                  />
                  {errors.nama_pelanggan && touched.nama_pelanggan ? (
                    <div className="label label-text text-red-500">{errors.nama_pelanggan}</div>
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="" label="Pilih POP">Pilih POP</option>
                    {popData.data.map((item) => (
                      <option value={item.id_pop} label={item.pop}>{item.pop}</option>
                    ))}
                  </Field>
                  {errors.pop_id && touched.pop_id ? (
                    <div className="label label-text text-red-500">{errors.pop_id}</div>
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"
                  >
                    <option value="" label="Pilih Sumber">Pilih Sumber</option>
                    {dataSumber.data.map((item) => (
                      <option value={item.id_sumber} label={item.sumber}>{item.sumber}</option>
                    ))}
                  </Field>
                  {errors.sumber && touched.sumber ? (
                    <div className="label label-text text-red-500">{errors.sumber}</div>
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.detail_sumber && touched.detail_sumber ? (
                    <div className="label label-text text-red-500">{errors.detail_sumber}</div>
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.nama_pelapor && touched.nama_pelapor ? (
                    <div className="label label-text text-red-500">{errors.nama_pelapor}</div>
                  ) : null}
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.nomor_pelapor && touched.nomor_pelapor ? (
                    <div className="label label-text text-red-500">{errors.nomor_pelapor}</div>
                  ) : null}
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
                  disabled={detail !== null}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.keluhan && touched.keluhan ? (
                  <div className="label label-text text-red-500">{errors.keluhan}</div>
                ) : null}
              </div>

              {!detail && (
                <UploadFile getFile={onHandleFileUpload} />

              )}

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
                  type="submit"
                  disabled={!isValid}
                  htmlFor="my-modal-complain"
                  className="btn btn-md btn-success text-white"
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
