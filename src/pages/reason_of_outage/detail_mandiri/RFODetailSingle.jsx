/* eslint-disable no-use-before-define */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable max-len */
/* eslint-disable no-irregular-whitespace */
/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { HiDocumentText, HiOutlineCloudUpload } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';
import { useRfoByIdMutation, useUpdateRFOKeluhanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setRFOById } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../../dashboard/detail/DashboardDetail';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { RFOSingleSchema } from '../../../utils/schema_validation_form';

/* eslint-disable jsx-a11y/label-has-associated-control */
function RFODetailSingle() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditData = searchParams.get('edit');
  const [rfoById, { isSuccess }] = useRfoByIdMutation();
  const [detailRFO, setDetailRFO] = useState(null);
  const [files, setFiles] = useState([]);
  const onHandleFileUpload = ($event) => {
    console.log($event.target.files, 'file');
    console.log($event.target.files.length, 'file');
    const file = $event.target.files;
    file.length > 0 ? setFiles(file[0]) : setFiles([]);
  };

  const dispatch = useDispatch();
  let lastUpdate = null;

  const getRFOKeluhanById = async () => {
    try {
      const data = await rfoById(id).unwrap();
      console.log(data);
      if (data.status === 'success') {
        dispatch(setRFOById(data));
        setDetailRFO(data.data);
        lastUpdate = detailRFO?.keluhan?.balasan?.length > 0
          ? detailRFO?.keluhan?.balasan[detailRFO?.keluhan?.balasan?.length - 1].created_at
          : detailRFO?.keluhan?.created_at
        console.log(detailRFO, 'cek');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const data = [...navigasi.data, { path: `/reason_of_outage/detail_single/${id}`, title: 'Detail Reason Of Outage' }]
    dispatch(updateBreadcrumb(data))
    getRFOKeluhanById();
  }, []);

  const daysCompare = (startDate, endDate) => {
    const difference = startDate.getTime() - endDate.getTime();
    const TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return TotalDays;
  };

  const initialValues = {
    problem: detailRFO?.problem || '',
    action: detailRFO?.action || '',
    deskripsi: detailRFO?.action || '',
    mulai_gangguan: detailRFO?.mulai_gangguan || '',
    selesai_gangguan: detailRFO?.selesai_gangguan || '',
    nomor_tiket: detailRFO?.nomor_tiket || '',
    durasi: detailRFO?.durasi || '',
    lampiran: detailRFO?.lampiran || '',
  };

  const [updateRFOKeluhan] = useUpdateRFOKeluhanMutation();

  const { data: user } = useSelector(selectCurrentUser);

  const onSubmitData = async (payload) => {
    const start = new Date(detailRFO?.keluhan.created_at);
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
      keluhan_id: detailRFO.keluhan.id_keluhan,
      deskripsi: payload.deskripsi,
      lampiran_rfo_keluhan: payload.lampiran || '-',
      user_id: user.id_user,
    };
    try {
      // create
      const update = await updateRFOKeluhan({ id, body }).unwrap();
      console.log(body, 'body');
      if (update?.status === 'success') {
        toast.success('Berhasil memperbarui RFO Keluhan.', {
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

  function formatBytes(bytes, decimals = 2) {
    if (!+bytes) return '0 Bytes'

    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

    const i = Math.floor(Math.log(bytes) / Math.log(k))

    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`
  }

  const navigate = useNavigate();
  return (
    <>
      <div className="w-full py-5 px-5 flex w-min-full bg-blue-200 rounded-md">
        <div className="flex-1 w-full">
          <table className="border-none items-center w-full">
            <tbody>
              <tr className="text-left">
                <td>Referensi Keluhan</td>
                <td>:</td>
                <td>{detailRFO?.keluhan?.nomor_keluhan}</td>
              </tr>
              <tr className="text-left">
                <td>Pelanggan</td>
                <td>:</td>
                <td>{detailRFO?.keluhan?.id_pelanggan} - {detailRFO?.keluhan?.nama_pelanggan}</td>
              </tr>
              <tr className="text-left">
                <td>Kontak</td>
                <td>:</td>
                <td>{detailRFO?.keluhan?.nama_pelapor} - {detailRFO?.keluhan?.nomor_pelapor}</td>
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
                <td>{new Date(detailRFO?.keluhan?.created_at).toLocaleString('id-ID')}</td>
              </tr>
              <tr className="text-left">
                <td>Waktu Diubah</td>
                <td>:</td>
                <td>
                  {detailRFO?.keluhan?.balasan?.length > 0
                    ? new Date(detailRFO?.keluhan?.balasan[detailRFO?.keluhan?.balasan?.length - 1].created_at).toLocaleString('id-ID')
                    : new Date(detailRFO?.keluhan?.created_at).toLocaleString('id-ID')}
                </td>
              </tr>
              <tr className="text-left">
                <td>Status Keluhan</td>
                <td>:</td>
                <td>{detailRFO?.keluhan?.status}</td>
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
                      component="textarea"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!isEditData}
                      className="textarea textarea-bordered h-24"
                    />
                    {errors.problem && touched.problem ? (
                      <div className="label label-text text-red-500">
                        {errors.problem}
                      </div>
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
                      disabled={!isEditData}
                      className="textarea textarea-bordered h-24"
                    />
                    {errors.action && touched.action ? (
                      <div className="label label-text text-red-500">
                        {errors.action}
                      </div>
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
                      disabled={!isEditData}
                      onChange={handleChange}
                      className="textarea textarea-bordered h-24"
                    />
                    {errors.deskripsi && touched.deskripsi ? (
                      <div className="label label-text text-red-500">
                        {errors.deskripsi}
                      </div>
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
                        value={new Date(
                          detailRFO?.keluhan?.created_at
                        ).toLocaleDateString('id-ID')}
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled
                        className="input input-md input-bordered  max-w-full"
                      />
                      {errors.mulai_gangguan && touched.mulai_gangguan ? (
                        <div className="label label-text text-red-500">
                          {errors.mulai_gangguan}
                        </div>
                      ) : null}
                    </div>

                    <div className="form-control flex-1">
                      <label htmlFor="selesai_gangguan" className="label">
                        <span className="label-text">
                          {' '}
                          Waktu Selesai Keluhan
                        </span>
                      </label>

                      <Field
                        id="selesai_gangguan"
                        name="selesai_gangguan"
                        placeholder=""
                        value={
                          detailRFO?.keluhan?.balasan.length > 0
                            ? new Date(
                              detailRFO?.keluhan?.balasan[
                                detailRFO?.balasan?.length - 1
                              ]?.created_at
                            ).toLocaleDateString('id-ID')
                            : new Date(
                              detailRFO?.keluhan?.created_at
                            ).toLocaleDateString('id-ID')
                        }
                        type="text"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        disabled
                        className="input input-md input-bordered  max-w-full"
                      />
                      {errors.selesai_gangguan && touched.selesai_gangguan ? (
                        <div className="label label-text text-red-500">
                          {errors.selesai_gangguan}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="form-control flex-1">
                    <label htmlFor="nomor_tiket" className="label">
                      <span className="label-text">
                        {' '}
                        Tiket Pelaporan (Opsional)
                      </span>
                    </label>

                    <Field
                      id="nomor_tiket"
                      name="nomor_tiket"
                      placeholder=""
                      value={values.nomor_tiket}
                      type="text"
                      disabled={!isEditData}
                      onBlur={handleBlur}
                      onChange={handleChange}
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
                      disabled
                      onBlur={handleBlur}
                      onChange={handleChange}
                      className="input input-md input-bordered  max-w-full"
                    />
                    {errors.durasi && touched.durasi ? (
                      <div className="label label-text text-red-500">
                        {errors.durasi}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="modal-action justify-center mt-10">
                  <button
                    type="button"
                    className="btn btn-md mr-5"
                    onClick={() => {
                      navigate('/reason_of_outage');
                    }}
                  >
                    Kembali
                  </button>

                  { isEditData
                  && (
                  <button
                    disabled={!isValid}
                    type="submit"
                    className="btn btn-md btn-success"
                  >
                    Simpan
                  </button>
                  )}
                </div>
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

          {isSuccess && (
            <DashboardDetail rfoSingle idComplain={detailRFO?.keluhan_id} />
          )}
        </div>
      </div>
    </>
  );
}
export default RFODetailSingle;
