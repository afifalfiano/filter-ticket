/* eslint-disable import/named */
/* eslint-disable max-len */
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
import { useAddRFOKeluhanMutation, useRfoByIdMutation, useUpdateKeluhanRFOKeluhanMutation, useUpdateRFOKeluhanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setComplainById } from '../../../store/features/complain/complainSlice';
import { selectRFODetail, setRFOById } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../detail/DashboardDetail';
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import UploadFile from '../../../components/common/forms/UploadFile';
import { RFOSingleSchema } from '../../../utils/schema_validation_form';

function DashboardRFOSingle() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = location.pathname.includes('history');
  const [searchParams] = useSearchParams();
  const idRfoKeluhan = searchParams.get('id_rfo');
  const navigasi = useSelector(selectBreadcrumb);

  const [detailComplain, setDetailComplain] = useState(null);
  const [rfoKeluhan, setRfoKeluhan] = useState(null);
  const [complainById, { isSuccess: isSuccessComplainById }] = useComplainByIdMutation();
  const [rfoById, { isSuccess: isSuccessRfoById }] = useRfoByIdMutation();
  const [addRFOKeluhan, { isSuccess }] = useAddRFOKeluhanMutation()
  const [updateRFOKeluhan] = useUpdateRFOKeluhanMutation()
  const [complainClosed] = useComplainClosedMutation()
  const [updateKeluhanRFOKeluhan] = useUpdateKeluhanRFOKeluhanMutation()
  let lastUpdate = null;
  const { data: user } = useSelector(selectCurrentUser);
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

  // this function running if the complain have rfo gangguan id
  const getRFOKeluhanById = async () => {
    try {
      const data = await rfoById(idRfoKeluhan).unwrap();
      if (data.status === 'success') {
        dispatch(setRFOById(data.data))
        setRfoKeluhan(data.data);
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
      lastUpdate = detailComplain?.balasan.length > 0
        ? detailComplain?.balasan[detailComplain.balasan.length - 1].created_at
        : detailComplain?.created_at
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const data = [...navigasi.data, { path: `/dashboard/rfo_single/${id}?id_rfo=${idRfoKeluhan}`, title: 'Dasbor Reason Of Outage Single' }]
    dispatch(updateBreadcrumb(data))
    getComplainById();
    if (idRfoKeluhan !== 'null') {
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
      let data;
      let message;
      if (idRfoKeluhan === 'null') {
        data = await addRFOKeluhan(body).unwrap();
        message = 'Berhasil menambahkan RFO';
      } else {
        data = await updateRFOKeluhan({ id: idRfoKeluhan, body }).unwrap();
        message = 'Berhasil memperbarui RFO';
      }
      console.log(body, 'body');
      if (data?.status === 'success') {
        toast.success(message, {
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
          console.log(data, 'cek data baru')
          const bodyUpdate = {
            rfo_keluhan_id: data.id_rfo_keluhan
          }
          const updateKeluhan = await updateKeluhanRFOKeluhan({ id, body: bodyUpdate })

          if (updateKeluhan.data.status === 'success') {
            toast.success(updateKeluhan.data.message, {
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
              const closed = await complainClosed(detailComplain.id_keluhan);
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
            }, 2000);
          }
        }, 0);
      } else {
        console.log(data, 'err');
        toast.error(data?.message, {
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
                      disabled={history || detailComplain?.status === 'closed' ? true : null}
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
                      disabled={history || detailComplain?.status === 'closed' ? true : null}
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
                      disabled={history || detailComplain?.status === 'closed' ? true : null}
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
                      disabled={history || detailComplain?.status === 'closed' ? true : null}
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
                      value={values.durasi}
                      type="text"
                      onBlur={handleBlur}
                      disabled
                      onChange={handleChange}
                      className="input input-md input-bordered  max-w-full"
                    />
                    {errors.durasi && touched.durasi ? (
                      <div className="label label-text text-red-500">{errors.durasi}</div>
                    ) : null}
                  </div>
                </div>

                {(!history && idRfoKeluhan === 'null' && detailComplain?.status === 'open') ? (
                  <UploadFile />

                ) : (
                  <div className="mt-2 font-semibold">
                    File Upload: {detailComplain?.lampiran || '-'}
                  </div>
                )}

                {(!history && detailComplain?.status === 'open') || idRfoKeluhan === 'null' ? (
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
                        if (history && detailComplain?.status === 'closed') {
                          navigate('/history_dashboard');
                        } else {
                          navigate('/dashboard');
                        }
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
