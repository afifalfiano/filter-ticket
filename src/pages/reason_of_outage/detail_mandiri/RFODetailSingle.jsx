import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useRfoByIdMutation, useUpdateRFOKeluhanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setRFOById } from '../../../store/features/rfo/rfoSlice';
import DashboardDetail from '../../dashboard/detail/DashboardDetail';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { RFOSingleSchema } from '../../../utils/schema_validation_form';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';

function RFODetailSingle() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEditData = searchParams.get('edit');
  const [rfoById, { isSuccess }] = useRfoByIdMutation();
  const [detailRFO, setDetailRFO] = useState(null);

  const dispatch = useDispatch();

  const getRFOKeluhanById = async () => {
    try {
      const data = await rfoById(id).unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setRFOById(data));
        setDetailRFO(data.data);
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  };

  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const data = [...navigasi.data, { path: `/reason_of_outage/detail_single/${id}`, title: 'Detail Reason Of Outage' }]
    dispatch(updateBreadcrumb(data))
    getRFOKeluhanById();
  }, []);

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
    const end = detailRFO.data?.keluhan?.balasan?.length > 0
    ? detailRFO.data?.keluhan?.balasan[detailRFO.data?.keluhan?.balasan?.length - 1].created_at
    : detailRFO.data?.keluhan?.created_at
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
      user_id: user.id_user,
    };
    try {
      // create
      const update = await updateRFOKeluhan({ id, body }).unwrap();
      if (update?.status === 'success' || update?.status === 'Success') {
        handleResponse(update);
      } else {
        catchError(update);
      }
    } catch (error) {
      catchError(error);
    }
  };

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
              <tr className="text-left">
                <td>Sumber Keluhan</td>
                <td>:</td>
                <td>{detailRFO?.keluhan?.sumber?.sumber}</td>
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
              <tr className="text-left">
                <td>Detail Sumber Keluhan</td>
                <td>:</td>
                <td>{detailRFO?.keluhan?.detail_sumber}</td>
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
                        ).toLocaleString('id-ID')}
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
                                detailRFO?.keluhan?.balasan?.length - 1
                              ]?.created_at
                            ).toLocaleString('id-ID')
                            : new Date(
                              detailRFO?.keluhan?.created_at
                            ).toLocaleString('id-ID')
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
            <DashboardDetail rfoSingle idComplain={detailRFO?.keluhan_id} showPaginate={false} />
          )}
        </div>
      </div>
    </>
  );
}
export default RFODetailSingle;
