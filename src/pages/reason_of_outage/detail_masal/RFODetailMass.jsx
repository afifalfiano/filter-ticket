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
import { Formik, Field, Form } from 'formik';
import toast from 'react-hot-toast';
import { useRfoGangguanByIdMutation, useUpdateRFOKeluhanMutation } from '../../../store/features/rfo/rfoApiSlice';
import { setRFOGangguanById } from '../../../store/features/rfo/rfoSlice';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../../store/features/breadcrumb/breadcrumbSlice';
import { RFOMasalSchema } from '../../../utils/schema_validation_form';

/* eslint-disable jsx-a11y/label-has-associated-control */
function RFODetailMass() {
  const { id } = useParams();
  const [rfoGangguanById, { isSuccess }] = useRfoGangguanByIdMutation();
  const [detailRFOMasal, setDetailRFOMasal] = useState([]);
  const [files, setFiles] = useState([]);
  const onHandleFileUpload = ($event) => {
    console.log($event.target.files, 'file');
    console.log($event.target.files.length, 'file');
    const file = $event.target.files;
    file.length > 0 ? setFiles(file[0]) : setFiles([]);
  };

  const dispatch = useDispatch();
  const getRFOMasalKeluhanById = async () => {
    try {
      const data = await rfoGangguanById(id).unwrap();
      console.log(data);
      if (data.status === 'success') {
        dispatch(setRFOGangguanById(data));
        setDetailRFOMasal(data.data);
        console.log(detailRFOMasal, 'cek');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialValues = {
    problem: detailRFOMasal?.problem || '',
    action: detailRFOMasal?.action || '',
    deskripsi: detailRFOMasal?.action || '',
    mulai_gangguan: new Date(detailRFOMasal?.mulai_gangguan).toLocaleString() || '',
    selesai_gangguan: new Date(detailRFOMasal?.selesai_gangguan).toLocaleString() || '',
    nomor_tiket: detailRFOMasal?.nomor_tiket || '',
    durasi: detailRFOMasal?.durasi || '',
    lampiran: detailRFOMasal?.lampiran || '',
  };

  const { data: user } = useSelector(selectCurrentUser);

  const onSubmitData = async (payload) => {
  };

  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const data = [...navigasi.data, { path: `/reason_of_outage/detail_masal/${id}`, title: 'Detail Reason Of Outage' }]
    dispatch(updateBreadcrumb(data))
    getRFOMasalKeluhanById();
  }, []);

  const navigate = useNavigate();
  return (
    <div className="flex w-full gap-5">
      <div className="flex-1 w-full">
        <h1 className="text-center font-semibold">Reason Of Outage Masal</h1>

        <Formik
          enableReinitialize
          validationSchema={RFOMasalSchema}
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
                    disabled
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
                    disabled
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
                    disabled
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
                      value={values.mulai_gangguan}
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
                      value={values.selesai_gangguan}
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
                    disabled
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
                    navigate(-1);
                  }}
                >
                  Kembali
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <div className=" border-gray-100 border-2" />

      <div className="flex-1 w-full">
        <h1 className="text-center font-semibold">
          Daftar Data Keluhan Terdampak
        </h1>

        <div className="w-full overflow-auto mt-6" style={{ height: '35rem' }}>
          {isSuccess && detailRFOMasal?.keluhan.map((item) => (
            <div className="border-2 border-gray-100 rounded-md mt-3 p-3">
              <table className="border-none items-center w-full" id={item.id_keluhan}>
                <tbody>
                  <tr className="text-left">
                    <td>ID Pelanggan</td>
                    <td>:</td>
                    <td>
                      {item.id_pelanggan}
                    </td>
                  </tr>
                  <tr className="text-left">
                    <td>Nama Pelanggan</td>
                    <td>:</td>
                    <td>{item.nama_pelanggan}</td>
                  </tr>
                  <tr className="text-left">
                    <td>Kontak</td>
                    <td>:</td>
                    <td>{item.nama_pelapor} - {item.nomor_pelapor}</td>
                  </tr>
                  <tr className="text-left">
                    <td>Sumber Keluhan</td>
                    <td>:</td>
                    <td>{item.sumber.sumber} - {item.detail_sumber} </td>
                  </tr>
                  <tr className="text-left">
                    <td>Keluhan</td>
                    <td>:</td>
                    <td>{item.keluhan}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
          {isSuccess && detailRFOMasal?.keluhan.length === 0 && (
          <div className="border-2 border-gray-100 rounded-md mt-3 p-3">
            <table className="border-none items-center w-full">
              <tbody>
                <tr className="text-left">
                  <td>ID Pelanggan</td>
                  <td>:</td>
                  <td>
                    -
                  </td>
                </tr>
                <tr className="text-left">
                  <td>Nama Pelanggan</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
                <tr className="text-left">
                  <td>Kontak</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
                <tr className="text-left">
                  <td>Sumber Keluhan</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
                <tr className="text-left">
                  <td>Keluhan</td>
                  <td>:</td>
                  <td>-</td>
                </tr>
              </tbody>
            </table>
          </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RFODetailMass;
