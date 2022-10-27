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
import { useAddComplainMutation, useUpdateComplainMutation } from '../../../store/features/complain/complainApiSlice';
import { selectAllPOP } from '../../../store/features/pop/popSlice';
import { useAllSumberKeluhanMutation } from '../../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { selectAllSumberKeluhan, setSumberKeluhan } from '../../../store/features/sumber_keluhan/sumberKeluhanSlice';

const ComplainFormSchema = Yup.object().shape({
  id_pelanggan: Yup.string()
    .required('Wajib diisi.'),
  nama_pelanggan: Yup.string()
    .required('Wajib diisi.'),
  pop_id: Yup.string()
    .required('Wajib diisi.'),
  sumber: Yup.string()
    .required('Wajib diisi.'),
  detail_sumber: Yup.string()
    .required('Wajib diisi.'),
  nama_pelapor: Yup.string()
    .required('Wajib diisi.'),
  nomor_pelapor: Yup.string()
    .required('Wajib diisi.'),
  keluhan: Yup.string()
    .required('Wajib diisi.'),
});

function ComplainModalForm({ getInfo, detail }) {
  const [addComplain, { isSuccess: isSuccessCreate }] = useAddComplainMutation();
  const [updateComplain, { isSuccess: isSuccessUpdate }] = useUpdateComplainMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const popData = useSelector(selectAllPOP);
  console.log(popData, 'pop nih')
  const [files, setFiles] = useState([]);

  const dataSumber = useSelector(selectAllSumberKeluhan);

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

  const onSubmitData = async (payload, resetForm) => {
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
          sumber_id: payload.sumber,
          detail_sumber: payload.detail_sumber,
          keluhan: payload.keluhan,
          status: 'open',
          pop_id: payload.pop_id,
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
          resetForm();
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

  const onHandleReset = (reset) => {
    reset();
    document.getElementById('my-modal-complain').click();
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
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.keluhan && touched.keluhan ? (
                  <div className="label label-text text-red-500">{errors.keluhan}</div>
                ) : null}
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
                    onHandleReset(resetForm);
                  }}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={!isValid}
                  htmlFor="my-modal-complain"
                  className="btn btn-md btn-success"
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