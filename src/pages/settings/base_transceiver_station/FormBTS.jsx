import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import {
  useAddBtsMutation,
  useUpdateBtsMutation,
} from '../../../store/features/bts/btsApiSlice';
import { selectAllPOP } from '../../../store/features/pop/popSlice';
import { FormBTSSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { ButtonIconExit } from '../../../components';

function FormBTS({ stateModal, getInfo, detail, titleAction }) {
  const [addData] = useAddBtsMutation();
  const [updateBts] = useUpdateBtsMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    nama_bts: detail?.nama_bts || '',
    deskripsi: detail?.deskripsi || '',
    nama_pic: detail?.nama_pic || '',
    nomor_pic: detail?.nomor_pic || '',
    lokasi: detail?.lokasi || '',
    pop_id: detail?.pop_id || '',
    kordinat: detail?.kordinat || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = (title) => {
    const newState = {
      ...stateModal,
      bts: { ...stateModal.bts, showAddModalBts: false, showUpdateModalBts: false, showDetailModalBts: false },
    };
    dispatch(setModal(newState));
  };

  const dataPOP = useSelector(selectAllPOP);

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      nama_bts: payload.nama_bts,
      deskripsi: payload.deskripsi,
      nama_pic: payload.nama_pic,
      nomor_pic: payload.nomor_pic,
      lokasi: payload.lokasi,
      pop_id: payload.pop_id || 1,
      kordinat: payload.kordinat,
      user_id: user.id_user,
    };
    try {
      // create
      if (detail === null) {
        doCreate(body, resetForm);
      } else {
        // update
        doUpdate(body);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const doUpdate = async (body) => {
    const update = await updateBts({
      id: detail.id_bts,
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

  const doCreate = async (body, resetForm) => {
    const add = await addData({ ...body });
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

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box lg:h-fit h-auto max-h-fit max-w-xl">
      <ButtonIconExit onClick={onBtnClose} />

        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah Base Transceiver Station' : titleAction === 'update' && 'Ubah Base Transceiver Station'}
          {titleAction === 'read' && 'Detail Base Transceiver Station'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormBTSSchema}
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
            handleBlur,
            handleChange,
            resetForm,
          }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="nama_bts" className="label">
                  <span className="label-text"> Nama BTS:</span>
                </label>
                <Field
                  id="nama_bts"
                  name="nama_bts"
                  placeholder="Nama BTS"
                  value={values.nama_bts}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.nama_bts && touched.nama_bts ? (
                  <div className="label label-text text-red-500">{errors.nama_bts}</div>
                ) : null}
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="nama_pic" className="label">
                    <span className="label-text"> Nama PIC</span>
                  </label>
                  <Field
                    id="nama_pic"
                    name="nama_pic"
                    value={values.nama_pic}
                    disabled={titleAction === 'read'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Nama PIC"
                    className="input input-md input-bordered max-w-full"
                  />
                  {errors.nama_pic && touched.nama_pic ? (
                    <div className="label label-text text-red-500">{errors.nama_pic}</div>
                  ) : null}
                </div>

                <div className="form-control flex-1">
                  <label htmlFor="nomor_pic" className="label">
                    <span className="label-text"> Kontak PIC</span>
                  </label>

                  <Field
                    id="nomor_pic"
                    name="nomor_pic"
                    value={values.nomor_pic}
                    disabled={titleAction === 'read'}
                    placeholder="Kontak PIC"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered max-w-full"
                  />
                  {errors.nomor_pic && touched.nomor_pic ? (
                    <div className="label label-text text-red-500">{errors.nomor_pic}</div>
                  ) : null}
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-3">
                <div className="form-control flex-1">
                  <label htmlFor="lokasi" className="label">
                    <span className="label-text"> Alamat Lengkap</span>
                  </label>
                  <Field
                    id="lokasi"
                    name="lokasi"
                    value={values.lokasi}
                    disabled={titleAction === 'read'}
                    placeholder="Alamat Lengkap"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="input input-md input-bordered max-w-full"
                  />
                  {errors.lokasi && touched.lokasi ? (
                    <div className="label label-text text-red-500">{errors.lokasi}</div>
                  ) : null}
                </div>
                <div className="form-control flex-1">
                  <label htmlFor="location" className="label">
                    <span className="label-text"> POP (Area Operasional)</span>
                  </label>
                  <Field
                    component="select"
                    id="pop_id"
                    name="pop_id"
                    value={values.pop_id}
                    disabled={titleAction === 'read'}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    className="select w-full max-w-full input-bordered"

                  >
                    <option value="" label="Pilih POP" defaultValue={""}>Pilih POP</option>
                    {dataPOP.data.map((item, index) => (
                      <option key={index} id={item.id_pop} value={item.id_pop} label={item.pop}>
                        {item.pop}
                      </option>
                    ))}
                  </Field>
                  {errors.pop_id && touched.pop_id ? (
                    <div className="label label-text text-red-500">{errors.pop_id}</div>
                  ) : null}
                </div>
              </div>
              <div className="form-control">
                <label htmlFor="kordinat" className="label">
                  <span className="label-text"> Koordinat:</span>
                </label>

                <Field
                  id="kordinat"
                  name="kordinat"
                  placeholder="Koordinat"
                  value={values.kordinat}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  disabled={titleAction === 'read'}
                  className="input input-md input-bordered max-w-full"
                />
                {errors.kordinat && touched.kordinat ? (
                  <div className="label label-text text-red-500">{errors.kordinat}</div>
                ) : null}
              </div>
              <div className="form-control">
                <label htmlFor="deskripsi" className="label">
                  <span className="label-text"> Deskripsi Base Transceiver Station:</span>
                </label>
                <Field
                  id="deskripsi"
                  component="textarea"
                  name="deskripsi"
                  placeholder="Deskripsi Base Transceiver Station"
                  value={values.deskripsi}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full h-28"
                />
                {errors.deskripsi && touched.deskripsi ? (
                  <div className="label label-text text-red-500">{errors.deskripsi}</div>
                ) : null}
              </div>
              <hr className="my-2 mt-10" />
              {titleAction !== 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md  w-32"
                  onClick={onBtnClose}
                >
                  Batal
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  htmlFor="my-modal-3"
                  className="btn btn-md  w-32 btn-success text-white"
                >
                  Simpan
                </button>
              </div>
              )}
              {titleAction === 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
                  onClick={onBtnClose}
                >
                  Kembali
                </button>
              </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormBTS;
