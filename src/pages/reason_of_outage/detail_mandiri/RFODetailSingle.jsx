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
import { Button, Required, SectionInformation } from '../../../components';

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
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const data = [...navigasi.data, { path: `/reason_of_outage/detail_single/${id}`, title: 'Detail Reason For Outage' }]
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
    const endTime = detailRFO?.keluhan?.balasan?.length > 0
      ? detailRFO?.keluhan?.balasan[detailRFO?.keluhan?.balasan?.length - 1].created_at
      : detailRFO?.keluhan?.created_at;
    const end = new Date(endTime);
    const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} 12:00:00.000`;
    const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} 12:00:00.000`;
    const body = {
      nomor_tiket: payload.nomor_tiket,
      mulai_keluhan: formatStart,
      selesai_keluhan: formatEnd,
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
        setTimeout(() => {
          navigate('/reason_of_outage', { replace: true })
          dispatch(setRFOById({ data: {} }));
        }, 1000)
      } else {
        catchError(update, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const navigate = useNavigate();

  const btnBack = () => {
    dispatch(setRFOById({ data: {} }));
    navigate('/reason_of_outage');
  }

  return (
    <>
      <SectionInformation detailComplain={detailRFO?.keluhan} />
      <div className="flex w-full gap-5 mt-5 flex-col-reverse lg:flex-row">
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
                      component="textarea"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      disabled={!isEditData}
                      className="textarea textarea-bordered h-24"
                    />
                    {errors.problem && touched.problem && <Required errors={errors.problem} />}
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
                    {errors.action && touched.action && <Required errors={errors.action} />}
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
                    {errors.deskripsi && touched.deskripsi && <Required errors={errors.deskripsi} />}
                  </div>

                  <div className="flex flex-col lg:flex-row gap-5">
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
                      {errors.mulai_gangguan && touched.mulai_gangguan && <Required errors={errors.mulai_gangguan} />}
                    </div>

                    <div className="form-control flex-1">
                      <label htmlFor="selesai_gangguan" className="label">
                        <span className="label-text">

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
                      {errors.selesai_gangguan && touched.selesai_gangguan && <Required errors={errors.selesai_gangguan} />}
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-2">
                  <div className="form-control flex-1">
                    <label htmlFor="nomor_tiket" className="label">
                      <span className="label-text">
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
                  <Button type="button" className="mr-5" onClick={() => btnBack()} >Kembali</Button>
                  {isEditData && <Button disabled={!isValid} type="submit" className="btn-success">Simpan</Button>}
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
            <DashboardDetail rfoSingle idComplain={detailRFO?.keluhan?.id_keluhan} />
          )}
        </div>
      </div>
    </>
  );
}
export default RFODetailSingle;
