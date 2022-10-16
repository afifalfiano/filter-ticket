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
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useComplainByIdMutation, useComplainClosedMutation } from '../../../store/features/complain/complainApiSlice';
import { useAddRFOGangguanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setComplainById } from '../../../store/features/complain/complainSlice';
import { seelectRFODetail } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../detail/DashboardDetail';
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';

function DashboardRFOSingle() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location, ';loc');
  const [detailComplain, setDetailComplain] = useState(null);
  const { id } = useParams();
  console.log(id, 'param');
  const [complainById, { ...status }] = useComplainByIdMutation();
  const dispatch = useDispatch();
  const [files, setFiles] = useState([]);

  const history = location.pathname.includes('history');

  const initialValues = {
    problem: '',
    action: '',
    deskripsi: '',
    mulai_gangguan: '',
    selesai_gangguan: '',
    nomor_tiket: '',
    durasi: '',
    lampiran: '',

  }

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

  const getComplainById = async () => {
    try {
      const data = await complainById(id).unwrap();
      dispatch(setComplainById({ ...data }));
      setDetailComplain(data.data);
      console.log(data, 'data');
    } catch (err) {
      console.log(err);
    }
  };

  const [addRFOGangguan, { isSuccess }] = useAddRFOGangguanMutation()

  const [complainClosed] = useComplainClosedMutation()

  useEffect(() => {
    getComplainById();
  }, []);

  const onSubmitData = async (payload, resetForm) => {
    let dateUpdate;
    detailComplain?.balasan.length > 0
      ? dateUpdate = detailComplain?.balasan[detailComplain.balasan.length - 1].created_at
      : dateUpdate = detailComplain?.created_at
    const body = {
      nomor_tiket: payload.nomor_tiket,
      // mulai_gangguan: new Date(detailComplain.created_at).getTime(),
      // selesai_gangguan: new Date(dateUpdate).getTime(),
      mulai_gangguan: '2022-09-24 12:00:00.000',
      selesai_gangguan: '2022-09-24 12:00:00.000',
      problem: payload.problem,
      action: payload.action,
      status: 'closed',
      deskripsi: payload.deskripsi,
      lampiran_rfo_keluhan: payload.lampiran || '-',
      user_id: detailComplain.user_id,
    };
    try {
      // create
      const update = await addRFOGangguan(body).unwrap();
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
              setFieldValue,
              handleChange,
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
                      className="textarea textarea-bordered h-24"
                    />
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
                      disabled={history ? true : null}
                      className="textarea textarea-bordered h-24"
                    />
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
                      disabled={history ? true : null}
                      className="textarea textarea-bordered h-24"
                    />
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
                        disabled
                        className="input input-md input-bordered  max-w-full"
                      />

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
                        disabled
                        className="input input-md input-bordered  max-w-full"
                      />
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
                      disabled={history ? true : null}
                      className="input input-md input-bordered  max-w-full"
                    />
                  </div>

                  <div className="form-control flex-1">
                    <label htmlFor="durasi" className="label">
                      <span className="label-text"> Durasi</span>
                    </label>

                    <Field
                      id="durasi"
                      name="durasi"
                      placeholder=""
                      value={values.durasi}
                      type="text"
                      className="input input-md input-bordered  max-w-full"
                    />
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
                    File Upload: {detailComplain.lampiran || '-'}
                  </div>
                )}

                {!history ? (
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
                    <button type="submit" className="btn btn-md btn-success">
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
