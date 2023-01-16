import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useComplainByIdMutation, useComplainClosedMutation } from '../../../store/features/complain/complainApiSlice';
import { useAddRFOKeluhanMutation, useRfoByIdMutation, useUpdateKeluhanRFOKeluhanMutation, useUpdateRFOKeluhanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setComplainById } from '../../../store/features/complain/complainSlice';
import { setRFOById } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../detail/DashboardDetail';
import { Formik, Field, Form } from 'formik';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { RFOSingleSchema } from '../../../utils/schema_validation_form';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';

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
  const [complainById] = useComplainByIdMutation();
  const [rfoById] = useRfoByIdMutation();
  const [addRFOKeluhan] = useAddRFOKeluhanMutation()
  const [updateRFOKeluhan] = useUpdateRFOKeluhanMutation()
  const [complainClosed] = useComplainClosedMutation()
  const [updateKeluhanRFOKeluhan] = useUpdateKeluhanRFOKeluhanMutation()
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

  const getRFOKeluhanById = async () => {
    try {
      const data = await rfoById(idRfoKeluhan).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
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
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  }

  const getComplainById = async () => {
    try {
      const data = await complainById(id).unwrap();
      dispatch(setComplainById({ ...data }));
      setDetailComplain(data.data);
    } catch (error) {
      catchError(error, true);
    }
  };

  useEffect(() => {
    const data = [...navigasi.data, { path: `/dashboard/rfo_single/${id}?id_rfo=${idRfoKeluhan}`, title: 'Dasbor Reason For Outage Keluhan' }]
    dispatch(updateBreadcrumb(data))
    getComplainById();
    if (idRfoKeluhan !== 'null') {
      getRFOKeluhanById();
    }
  }, []);

  const onSubmitData = async (payload, resetForm) => {
    const start = new Date(detailComplain.created_at);
    const lastTime = detailComplain?.balasan.length > 0
      ? detailComplain?.balasan[detailComplain.balasan.length - 1].created_at
      : detailComplain?.created_at
    const end = new Date(lastTime);
    // const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} ${start.getHours()}:${start.getMinutes()}:${start.getSeconds()}:${start.getMilliseconds()}`;
    // const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} ${end.getHours()}:${end.getMinutes()}:${end.getSeconds()}:${end.getMilliseconds()}`;
    const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} 12:00:00.000`;
    const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} 12:00:00.000`;
    const body = {
      nomor_tiket: payload.nomor_tiket,
      mulai_keluhan: formatStart,
      selesai_keluhan: formatEnd,
      problem: payload.problem,
      action: payload.action,
      status: 'closed',
      deskripsi: payload.deskripsi,
      user_id: user.id_user,
      keluhan_id: detailComplain.id_keluhan
    };
    try {
      // create
      let data;
      if (idRfoKeluhan === 'null') {
        data = await addRFOKeluhan(body).unwrap();
      } else {
        data = await updateRFOKeluhan({ id: idRfoKeluhan, body }).unwrap();
      }
      if (data?.status === 'success' || data?.status === 'Success') {
          handleResponse(data);
          const bodyUpdate = {
            rfo_keluhan_id: data.id_rfo_keluhan
          }
          const updateKeluhan = await updateKeluhanRFOKeluhan({ id, body: bodyUpdate })
          if (updateKeluhan.data.status === 'success' || updateKeluhan.data.status === 'Success') {
              handleResponse(updateKeluhan);
              const closed = await complainClosed(detailComplain.id_keluhan);
              if (closed?.data?.status === 'success' || closed?.data?.status === 'Success') {
                handleResponse(closed);
                setTimeout(() => {
                  resetForm();
                  navigate('/dashboard', { replace: true })
                }, 1000)
              } else {
                catchError(closed, true);
              }
          }
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  return (
    <>
      <div className="w-full py-5 px-5 flex-col gap-3 lg:flex-row md:gap-0 flex w-min-full bg-blue-200 rounded-md">
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Referensi Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.nomor_keluhan}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Pelanggan</td>
                <td>:</td>
                <td>{detailComplain?.id_pelanggan} - {detailComplain?.nama_pelanggan}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Kontak</td>
                <td>:</td>
                <td>{detailComplain?.nama_pelapor} - {detailComplain?.nomor_pelapor}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Sumber Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.sumber?.sumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Waktu Dibuat</td>
                <td>:</td>
                <td>{new Date(detailComplain?.created_at).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Waktu Diubah</td>
                <td>:</td>
                <td>
                  {detailComplain?.balasan.length > 0
                    ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleString('id-ID')
                    : new Date(detailComplain?.created_at).toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Status Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.status}</td>
              </tr>
              <tr className="text-left">
                <td className="w-36 md:w-52 lg:w-auto">Detail Sumber Keluhan</td>
                <td>:</td>
                <td>{detailComplain?.detail_sumber}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex w-full gap-5 mt-5 flex-col-reverse md:flex-row">
        <div className="flex-1 w-full mt-5">
          <h1 className="text-center font-semibold">Reason For Outage Keluhan</h1>

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

                  <div className="flex flex-col md:flex-row gap-5">
                    <div className="form-control flex-1">
                      <label htmlFor="mulai_gangguan" className="label">
                        <span className="label-text"> Waktu Mulai Keluhan</span>
                      </label>

                      <Field
                        id="mulai_gangguan"
                        name="mulai_gangguan"
                        placeholder=""
                        value={new Date(detailComplain?.created_at).toLocaleString('id-ID')}
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
                          ? new Date(detailComplain?.balasan[detailComplain.balasan.length - 1].created_at).toLocaleString('id-ID')
                          : new Date(detailComplain?.created_at).toLocaleString('id-ID')}
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
                </div>
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
                    <button disabled={!isValid} type="submit" className="btn btn-md btn-success text-white">
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
