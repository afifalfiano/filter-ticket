/* eslint-disable no-irregular-whitespace */
/* eslint-disable max-len */
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
import { useEffect, useState } from 'react';
import {
  HiOutlineCloudUpload,
  HiSearch,
  HiPencil,
  HiTrash,
  HiEye,
  HiQuestionMarkCircle,
} from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import {
  useAllRFOMutation,
  useAllRFOMasalMutation,
  useAddRFOGangguanMutation,
  useUpdateRFOGangguanMutation,
} from '../../store/features/rfo/rfoApiSlice';
import {
  selectAllRFO,
  selectAllRFOMasal,
  setRFO,
  setRFOMasal,
} from '../../store/features/rfo/rfoSlice';
import styles from './RFOModalForm.module.css';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import UploadFile from '../../components/common/forms/UploadFile';
import { RFOSingleSchema } from '../../utils/schema_validation_form';

function RFOModalForm({ getInfo, detail }) {
  console.log(detail, 'cek render sajax');
  const initialValues = {
    problem: detail?.problem || '',
    action: detail?.action || '',
    deskripsi: detail?.deskripsi || '',
    mulai_gangguan: detail?.mulai_gangguan.split(' ')[0] || '',
    selesai_gangguan: detail?.selesai_gangguan.split(' ')[0] || '',
    nomor_tiket: detail?.nomor_tiket || '',
    // durasi: detail?.durasi || '',
    status: detail?.status || '',
    lampiran: '' || '',

  }

  const { data: user } = useSelector(selectCurrentUser);

  const [files, setFiles] = useState([]);

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
  }

  const onHandleFileUpload = ($event) => {
    console.log($event.target.files, 'file');
    console.log($event.target.files.length, 'file');
    const file = $event.target.files;
    file.length > 0 ? setFiles(file[0]) : setFiles([]);
  }

  const [addRFOGangguan] = useAddRFOGangguanMutation()
  const [updateRFOGangguan] = useUpdateRFOGangguanMutation()

  const daysCompare = (startDate, endDate) => {
    const difference = startDate.getTime() - endDate.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const onSubmitData = async (payload, resetForm) => {
    // const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth()}` : start.getMonth()}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`;
    // const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth()}` : end.getMonth()}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`;
    const start = new Date(payload.mulai_gangguan);
    const end = new Date(payload.selesai_gangguan);
    const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth()}` : start.getMonth()}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} 12:00:00.000`;
    const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth()}` : end.getMonth()}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} 12:00:00.000`;
    const body = {
      nomor_tiket: payload.nomor_tiket,
      mulai_gangguan: formatStart,
      selesai_gangguan: formatEnd,
      problem: payload.problem,
      action: payload.action,
      status: payload.status,
      deskripsi: payload.deskripsi,
      durasi: payload.durasi,
      lampiran_rfo_keluhan: payload.lampiran || '-',
      user_id: user.id_user,
    };
    console.log(payload, 'py');
    try {
      // create
      if (detail === null) {
        const add = await addRFOGangguan({ ...body });
        if (add.data.status === 'success') {
          toast.success('Berhasil Tambah RFO Gangguan.', {
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
            document.getElementById('my-modal-3').click();
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
        const update = await updateRFOGangguan({
          id: detail.id_rfo_gangguan,
          body: { ...body },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil Ubah RFO Gangguan.', {
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
      toast.error(error?.message, {
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

  return (
    <div className="modal">
      <div className={`${styles['modal-box-custom']}`}>
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
        <h3 className="text-lg font-bold">{detail === null ? ('Tambah Reason Of Outage Masal') : ('Ubah Reason Of Outage Masal')}</h3>
        <hr className="my-2" />

        <Formik
          enableReinitialize
          validationSchema={RFOSingleSchema}
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleChange,
            handleBlur,
            resetForm,
          }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="problem" className="label">
                  <span className="label-text"> Masalah:</span>
                </label>

                <Field
                  id="problem"
                  name="problem"
                  placeholder="Masalah"
                  value={values.problem}
                  component="textarea"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                />
                {errors.problem && touched.problem ? (
                  <div className="label label-text text-red-500">{errors.problem}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="action" className="label">
                  <span className="label-text"> Aksi:</span>
                </label>

                <Field
                  id="action"
                  name="action"
                  placeholder="Aksi"
                  value={values.action}
                  component="textarea"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                />
                {errors.action && touched.action ? (
                  <div className="label label-text text-red-500">{errors.action}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="deskripsi" className="label">
                  <span className="label-text"> Deskripsi:</span>
                </label>

                <Field
                  id="deskripsi"
                  name="deskripsi"
                  placeholder="Deskripsi"
                  value={values.deskripsi}
                  component="textarea"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                />
                {errors.deskripsi && touched.deskripsi ? (
                  <div className="label label-text text-red-500">{errors.deskripsi}</div>
                ) : null}
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="mulai_gangguan" className="label">
                    <span className="label-text"> Waktu Mulai Gangguan</span>
                  </label>

                  <Field
                    id="mulai_gangguan"
                    name="mulai_gangguan"
                    placeholder=""
                    value={values.mulai_gangguan}
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.mulai_gangguan && touched.mulai_gangguan ? (
                    <div className="label label-text text-red-500">{errors.mulai_gangguan}</div>
                  ) : null}

                </div>

                <div className="form-control flex-1">
                  <label htmlFor="selesai_gangguan" className="label">
                    <span className="label-text"> Waktu Selesai Gangguan</span>
                  </label>

                  <Field
                    id="selesai_gangguan"
                    name="selesai_gangguan"
                    placeholder=""
                    value={values.selesai_gangguan}
                    type="date"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.selesai_gangguan && touched.selesai_gangguan ? (
                    <div className="label label-text text-red-500">{errors.selesai_gangguan}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="nomor_tiket" className="label">
                    <span className="label-text"> Tiket Pelaporan (Opsional)</span>
                  </label>

                  <Field
                    id="nomor_tiket"
                    name="nomor_tiket"
                    placeholder=""
                    value={values.nomor_tiket}
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                </div>

                {/* <div className="form-control flex-1">
                  <label htmlFor="durasi" className="label">
                    <span className="label-text"> Durasi (Hari)</span>
                  </label>

                  <Field
                    id="durasi"
                    name="durasi"
                    placeholder=""
                    value={values.durasi}
                    // daysCompare(new Date(values?.selesai_gangguan), new Date(values?.mulai_gangguan)
                    type="text"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.durasi && touched.durasi ? (
                    <div className="label label-text text-red-500">{errors.durasi}</div>
                  ) : null}
                </div> */}
                <div className="form-control flex-1">
                  <label htmlFor="location" className="label">
                    <span className="label-text"> Status</span>
                  </label>
                  <Field
                    component="select"
                    id="status"
                    name="status"
                    value={values.status}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"

                  >
                    <option value="" label="Pilih Status" selected>Pilih Status</option>
                    <option value="open" label="Open">Open</option>
                    <option value="closed" label="Closed">Closed</option>
                  </Field>
                  {errors.status && touched.status ? (
                    <div className="label label-text text-red-500">{errors.pop_id}</div>
                  ) : null}
                </div>
              </div>

              <UploadFile />

              <hr className="my-2 mt-5" />
              <div className="modal-action justify-center">
                <button
                  htmlFor="my-modal-3"
                  type="button"
                  className="btn btn-md mr-5"
                  onClick={() => {
                    resetForm();
                    document.getElementById('my-modal-3').click();
                  }}
                >
                  Batal
                </button>
                <button type="submit" htmlFor="my-modal-3" className="btn btn-md btn-success" disabled={!isValid}>
                  Simpan
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RFOModalForm;