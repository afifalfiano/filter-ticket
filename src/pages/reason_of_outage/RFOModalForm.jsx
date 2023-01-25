import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import {
  useAddRFOGangguanMutation, useUpdateRFOGangguanMutation,
} from '../../store/features/rfo/rfoApiSlice';
import styles from './RFOModalForm.module.css';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import { setModal } from '../../store/features/modal/modalSlice';
import { RFOSingleSchema } from '../../utils/schema_validation_form';
import catchError from '../../services/catchError';
import handleResponse from '../../services/handleResponse';
import { Button, ButtonIconExit, Required } from '../../components';

function RFOModalForm({ stateModal, getInfo, detail }) {
  const initialValues = {
    problem: detail?.problem || '',
    action: detail?.action || '',
    deskripsi: detail?.deskripsi || '',
    mulai_gangguan: detail?.mulai_gangguan || '',
    selesai_gangguan: detail?.selesai_gangguan || '',
    nomor_tiket: detail?.nomor_tiket || '',
    status: detail?.status || '',
    lampiran: '' || '',

  }

  const dispatch = useDispatch();

  const onBtnClose = (title) => {
    const newState = {
      ...stateModal,
      rfo: { ...stateModal.rfo, showAddModalRFOTrouble: false, showUpdateModalRFOTrouble: false },
    };
    dispatch(setModal(newState));
  };

  const { data: user } = useSelector(selectCurrentUser);

  const [addRFOGangguan] = useAddRFOGangguanMutation()
  const [updateRFOGangguan] = useUpdateRFOGangguanMutation()

  const onSubmitData = async (payload, resetForm) => {
    const start = new Date(payload.mulai_gangguan);
    const end = new Date(payload.selesai_gangguan);
    const timeStart = `${start.getHours().toString().length === 1 ? `0${start.getHours()}` : start.getHours()}:${start.getMinutes().toString().length === 1 ? `0${start.getMinutes()}` : start.getMinutes()}:${start.getSeconds().toString().length === 1 ? `0${start.getSeconds()}` : start.getSeconds()}.${start.getMilliseconds()}0`;
    const timeEnd = `${end.getHours().toString().length === 1 ? `0${end.getHours()}` : end.getHours()}:${end.getMinutes().toString().length === 1 ? `0${end.getMinutes()}` : end.getMinutes()}:${end.getSeconds().toString().length === 1 ? `0${end.getSeconds()}` : end.getSeconds()}.${start.getMilliseconds()}0`;
    const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} ${timeStart}`;
    const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} ${timeEnd}`;

    // const formatStart = `${start.getFullYear()}-${start.getMonth().toString().length === 1 ? `0${start.getMonth() + 1}` : start.getMonth() + 1}-${start.getDate().toString().length === 1 ? `0${start.getDate()}` : start.getDate()} 12:00:00.000`;
    // const formatEnd = `${end.getFullYear()}-${end.getMonth().toString().length === 1 ? `0${end.getMonth() + 1}` : end.getMonth() + 1}-${end.getDate().toString().length === 1 ? `0${end.getDate()}` : end.getDate()} 12:00:00.000`;
    const body = {
      nomor_tiket: payload.nomor_tiket,
      mulai_gangguan: formatStart,
      selesai_gangguan: formatEnd,
      problem: payload.problem,
      action: payload.action,
      status: payload.status,
      deskripsi: payload.deskripsi,
      durasi: payload.durasi,
      user_id: user.id_user,
    };
    try {
      // create
      if (detail === null) {
        doCreate(body, resetForm)
      } else {
        // update
        doUpdate(body);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const doCreate = async (body, resetForm) => {
    const add = await addRFOGangguan({ ...body });
    if (add.data.status === 'success' || add.data.status === 'Success') {
      handleResponse(add);
      setTimeout(() => {
        resetForm();
        onBtnClose();
        getInfo({ status: 'success' });
      }, 2000);
    } else {
      catchError(add, true);
    }
  }

  const doUpdate = async (body) => {
    const update = await updateRFOGangguan({
      id: detail.id_rfo_gangguan,
      body: { ...body },
    });
    if (update.data.status === 'success' || update.data.status === 'Success') {
      handleResponse(update);
      setTimeout(() => {
        getInfo({ status: 'success' });
        onBtnClose();
      }, 2000);
    } else {
      catchError(update, true);
    }
  }

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className={`modal-box h-fit max-h-fit ${styles['modal-box-custom']}`}>
        <ButtonIconExit onClick={onBtnClose} />
        <h3 className="text-lg font-bold">{detail === null ? ('Tambah Reason For Outage Gangguan') : ('Ubah Reason For Outage Gangguan')}</h3>
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
                  className="textarea textarea-bordered h-10"
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
                  className="textarea textarea-bordered h-10"
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
                  onChange={handleChange}
                  className="textarea textarea-bordered h-24"
                />
                {errors.deskripsi && touched.deskripsi && <Required errors={errors.deskripsi} />}
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="mulai_gangguan" className="label">
                    <span className="label-text"> Waktu Mulai Gangguan</span>
                  </label>

                  <Field
                    id="mulai_gangguan"
                    name="mulai_gangguan"
                    placeholder=""
                    value={values.mulai_gangguan}
                    type="datetime-local"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.mulai_gangguan && touched.mulai_gangguan && <Required errors={errors.mulai_gangguan} />}

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
                    type="datetime-local"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered  max-w-full"
                  />
                  {errors.selesai_gangguan && touched.selesai_gangguan && <Required errors={errors.selesai_gangguan} />}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
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
                    <option value="" label="Pilih Status" defaultValue={""}>Pilih Status</option>
                    <option value="open" label="Open">Open</option>
                    <option value="closed" label="Closed">Closed</option>
                  </Field>
                  {errors.status && touched.status && <Required errors={errors.status} />}
                </div>
              </div>

              <hr className="my-2 mt-5" />
              <div className="modal-action justify-center">
                <Button type="button" className="mr-5" onClick={() => onBtnClose()} >Batal</Button>
                <Button type="submit" disabled={!isValid} className="btn-success">Simpan</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RFOModalForm;