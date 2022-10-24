/* eslint-disable import/named */
/* eslint-disable max-len */
/* eslint-disable no-undef */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable import/order */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-alert */
import { useEffect, useState } from 'react';
import { HiDocumentText, HiOutlineCloudUpload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useComplainByIdMutation, useComplainClosedMutation } from '../../../store/features/complain/complainApiSlice';
import { useAddRFOKeluhanMutation, useRfoByIdMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setComplainById } from '../../../store/features/complain/complainSlice';
import { selectRFODetail, setRFOById } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../detail/DashboardDetail';
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import * as Yup from 'yup';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';

const RFOSingleSchema = Yup.object().shape({
  problem: Yup.string()
    .required('Wajib diisi.'),
  action: Yup.string()
    .required('Wajib diisi.'),
  deskripsi: Yup.string()
    .required('Wajib diisi.'),
  mulai_gangguan: Yup.string()
    .optional(),
  selesai_gangguan: Yup.string()
    .optional(),
  nomor_tiket: Yup.string()
    .optional(),
  durasi: Yup.string()
    .optional(),
});

function DashboardRFOSingle() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const idRfoKeluhan = searchParams.get('id_rfo');
  console.log(idRfoKeluhan, 'dapat');
  console.log(location, ';loc');
  const [detailComplain, setDetailComplain] = useState(null);
  const { id } = useParams();
  console.log(id, 'param');
  const [complainById, { isSuccess: isSuccessComplainById }] = useComplainByIdMutation();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);
  const [rfoById, { isSuccess: isSuccessRfoById }] = useRfoByIdMutation();
  const [rfoKeluhan, setRfoKeluhan] = useState(null);

  const history = location.pathname.includes('history');

  let initialValues = {
    problem: rfoKeluhan?.problem || '',
    action: rfoKeluhan?.action || '',
    deskripsi: rfoKeluhan?.deskripsi || '',
    mulai_gangguan: new Date(rfoKeluhan?.mulai_gangguan).toLocaleString() || '',
    selesai_gangguan: new Date(rfoKeluhan?.selesai_gangguan).toLocaleString() || '',
    nomor_tiket: rfoKeluhan?.nomor_tiket || '',
    durasi: rfoKeluhan?.durasi || '',
    lampiran: rfoKeluhan?.lammpiran || '',

  }

  const lastUpdate = detailComplain?.balasan.length > 0
    ? detailComplain?.balasan[detailComplain.balasan.length - 1].created_at
    : detailComplain?.created_at

  const daysCompare = (startDate, endDate) => {
    const difference = startDate.getTime() - endDate.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

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

  const getRFOKeluhanById = async () => {
    try {
      const data = await rfoById(idRfoKeluhan).unwrap();
      console.log(data, 'rfo id after update');
      if (data.status === 'success') {
        dispatch(setRFOById({ ...data }))
        setRfoKeluhan({ ...data });
        initialValues = {
          problem: rfoKeluhan?.problem,
          action: rfoKeluhan?.action,
          deskripsi: rfoKeluhan?.deskripsi,
          mulai_gangguan: new Date(rfoKeluhan?.mulai_gangguan).toLocaleString(),
          selesai_gangguan: new Date(rfoKeluhan?.selesai_gangguan).toLocaleString(),
          nomor_tiket: rfoKeluhan?.nomor_tiket,
          durasi: rfoKeluhan?.durasi,
          lampiran: rfoKeluhan?.lammpiran,
        }
        console.log(rfoKeluhan, 'yuhuz');
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getComplainById = async () => {
    try {
      const data = await complainById(id).unwrap();
      dispatch(setComplainById({ ...data }));
      setDetailComplain(data.data);
      if (data.data.status === 'closed') {
        console.log('closed nih')
      } else {
        console.log('open nih')
      }
      console.log(data, 'data');
    } catch (err) {
      console.log(err);
    }
  };

  const [addRFOKeluhan, { isSuccess }] = useAddRFOKeluhanMutation()

  const [complainClosed] = useComplainClosedMutation()

  const navigasi = useSelector(selectBreadcrumb);

  const { data: user } = useSelector(selectCurrentUser);

  useEffect(() => {
    const data = [...navigasi.data, { path: `/dashboard/rfo_single/${id}?id_rfo=${idRfoKeluhan}`, title: 'Dasbor Reason Of Outage Single' }]
    dispatch(updateBreadcrumb(data))
    getComplainById();
    if (idRfoKeluhan !== null) {
      getRFOKeluhanById();
    }
  }, []);

  const onSubmitData = async (payload, resetForm) => {
    const start = new Date(detailComplain.created_at);
    const end = new Date(lastUpdate);
    // const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth()}` : start.getMonth()}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`;
    // const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth()}` : end.getMonth()}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`;
    const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth()}` : start.getMonth()}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} 12:00:00.000`;
    const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth()}` : end.getMonth()}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} 12:00:00.000`;
    const body = {
      nomor_tiket: payload.nomor_tiket,
      mulai_gangguan: formatStart,
      selesai_gangguan: formatEnd,
      problem: payload.problem,
      action: payload.action,
      status: 'closed',
      deskripsi: payload.deskripsi,
      lampiran_rfo_keluhan: payload.lampiran || '-',
      user_id: user.id_user,
      keluhan_id: detailComplain.id_keluhan
    };
    try {
      // create
      const update = await addRFOKeluhan(body).unwrap();
      console.log(body, 'body');
      if (update?.status === 'success') {
        toast.success('Berhasil menambahkan RFO.', {
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
        setTimeout(async () => {
          const closed = await complainClosed(detailComplain.user_id);
          console.log(closed, 'cls');
          if (closed?.data?.status === 'success') {
            toast.success('Data Keluhan Berhasil Ditutup.', {
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

            setTimeout(async () => {
              resetForm();
              navigate('/dashboard', { replace: true })
            }, 1000)
          } else {
            toast.error(`${closed?.data?.message}`, {
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
          console.log(closed, 'cek');
        }, 1000);
      } else {
        console.log(update, 'err');
        toast.error(update?.message, {
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
    <>
      <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md">
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>Referensi Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.nomor_keluhan}</td>
              </tr>
              <tr className="text-left">
                <td>Pelanggan</td>
                <td>:</td>
                <td>{detailComplain?.id_pelanggan} - {detailComplain?.nama_pelanggan}</td>
              </tr>
              <tr className="text-left">
                <td>Kontak</td>
                <td>:</td>
                <td>{detailComplain?.nama_pelapor} - {detailComplain?.nomor_pelapor}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>Waktu Dibuat</td>
                <td>:</td>
                <td>{new Date(detailComplain?.created_at).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="text-left">
                <td>Waktu Diubah</td>
                <td>:</td>
                <td>
                  {detailComplain?.balasan.length > 0
                    ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleString('id-ID')
                    : new Date(detailComplain?.created_at).toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="text-left">
                <td>Status Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-full gap-5 mt-5">
        <div className="flex-1 w-full mt-5">
          <h1 className="text-center font-semibold">Reason Of Outage Single</h1>

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
              isSubmitting,
              isValid,
              setFieldValue,
              handleChange,
              handleBlur,
              resetForm,
            }) => (
              <Form>
                <div className="flex flex-col gap-3">
                  <div className="form-control">
                    <label htmlFor="problem" className="label">
                      <span className="label-text"> Masalah:</span>
                    </label>

                    <Field
                      id="problem"
                      name="problem"
                      placeholder="Masalah"
                      value={values.problem}
                      disabled={history ? true : null}
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
                      disabled={history ? true : null}
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
                      disabled={history ? true : null}
                      className="textarea textarea-bordered h-24"
                    />
                    {errors.deskripsi && touched.deskripsi ? (
                      <div className="label label-text text-red-500">{errors.deskripsi}</div>
                    ) : null}
                  </div>

                  <div className="flex gap-5">
                    <div className="form-control flex-1">
                      <label htmlFor="mulai_gangguan" className="label">
                        <span className="label-text"> Waktu Mulai Keluhan</span>
                      </label>

                      <Field
                        id="mulai_gangguan"
                        name="mulai_gangguan"
                        placeholder=""
                        value={new Date(detailComplain?.created_at).toLocaleDateString('id-ID')}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled
                        className="input input-md input-bordered  max-w-full"
                      />
                      {errors.mulai_gangguan && touched.mulai_gangguan ? (
                        <div className="label label-text text-red-500">{errors.mulai_gangguan}</div>
                      ) : null}

                    </div>

                    <div className="form-control flex-1">
                      <label htmlFor="selesai_gangguan" className="label">
                        <span className="label-text"> Waktu Selesai Keluhan</span>
                      </label>

                      <Field
                        id="selesai_gangguan"
                        name="selesai_gangguan"
                        placeholder=""
                        value={detailComplain?.balasan.length > 0
                          ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleDateString('id-ID')
                          : new Date(detailComplain?.created_at).toLocaleDateString('id-ID')}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled
                        className="input input-md input-bordered  max-w-full"
                      />
                      {errors.selesai_gangguan && touched.selesai_gangguan ? (
                        <div className="label label-text text-red-500">{errors.selesai_gangguan}</div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-2">
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
                      disabled={history ? true : null}
                      className="input input-md input-bordered  max-w-full"
                    />
                  </div>

                  <div className="form-control flex-1">
                    <label htmlFor="durasi" className="label">
                      <span className="label-text"> Durasi (Hari)</span>
                    </label>

                    <Field
                      id="durasi"
                      name="durasi"
                      placeholder=""
                      value={daysCompare(new Date(lastUpdate), new Date(detailComplain?.created_at))}
                      type="text"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="input input-md input-bordered  max-w-full"
                    />
                    {errors.durasi && touched.durasi ? (
                      <div className="label label-text text-red-500">{errors.durasi}</div>
                    ) : null}
                  </div>
                </div>

                {!history ? (
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
                ) : (
                  <div className="mt-2 font-semibold">
                    File Upload: {detailComplain?.lampiran || '-'}
                  </div>
                )}

                {!history && idRfoKeluhan === null ? (
                  <div className="modal-action justify-center mt-10">
                    <button
                      type="button"
                      className="btn btn-md mr-5"
                      onClick={() => {
                        navigate('/dashboard');
                      }}
                    >
                      Kembali
                    </button>
                    <button disabled={!isValid} type="submit" className="btn btn-md btn-success">
                      Simpan
                    </button>
                  </div>
                ) : (
                  <div className="modal-action justify-center mt-10">

                    <button
                      type="button"
                      className="btn btn-md mr-5"
                      onClick={() => {
                        navigate('/history_dashboard');
                        // navigate('/dashboard');
                      }}
                    >
                      Kembali
                    </button>
                  </div>
                )}

              </Form>
            )}
          </Formik>

        </div>

        <div className=" border-gray-100 border-2" />

        <div
          className="flex-1 overflow-auto mt-6 w-full"
          style={{ height: '50rem' }}
        >
          <h1 className="text-center font-semibold">
            Riwayat Follow Up Keluhan
          </h1>

          <DashboardDetail rfoSingle />
        </div>
      </div>
    </>
  );
}
export default DashboardRFOSingle;
