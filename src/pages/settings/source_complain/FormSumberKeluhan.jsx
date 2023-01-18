import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useAddSumberKeluhanMutation, useUpdateSumberKeluhanMutation } from '../../../store/features/sumber_keluhan/sumberKeluhanApiSlice';
import { FormSumberKeluhanSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { ButtonIconExit } from '../../../components';

function FormSumberKeluhan({ stateModal, getInfo, detail, titleAction }) {
  const [addSumberKeluhan] = useAddSumberKeluhanMutation();
  const [updateSumberKeluhan] = useUpdateSumberKeluhanMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    sumber: detail?.sumber || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      source_complain: { ...stateModal.source_complain, showAddModalSourceComplain: false, showUpdateModalSourceComplain: false },
    };
    dispatch(setModal(newState));
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      id_sumber: Math.floor(Math.random() * 90 + 10),
      sumber: payload.sumber,
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

  const doCreate = async (body, resetForm) => {
    const add = await addSumberKeluhan({ ...body });
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
    const update = await updateSumberKeluhan({
      id: detail.id_sumber,
      body: { ...body, id_sumber: detail.id_sumber },
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

  const onHandleReset = (reset) => {
    reset();
    onBtnClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box mt-5  h-fit max-h-fit  max-w-lg">
      <ButtonIconExit onClick={onBtnClose} />

        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah Sumber' : titleAction === 'update' && 'Ubah Sumber'}
          {titleAction === 'read' && 'Detail Sumber'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormSumberKeluhanSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleBlur,
            handleChange,
            resetForm,
          }) => (
            <Form>
              <div className="form-control">
                <label htmlFor="sumber" className="label">
                  <span className="label-text"> Nama Sumber:</span>
                </label>
                <Field
                  id="sumber"
                  name="sumber"
                  placeholder="Nama Sumber"
                  value={values.sumber}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.sumber && touched.sumber ? (
                  <div className="label label-text text-red-500">{errors.sumber}</div>
                ) : null}
              </div>

              <hr className="my-2 mt-10" />
              {titleAction !== 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md  w-32"
                  onClick={() => {
                    onHandleReset(resetForm);
                  }}
                >
                  Batal
                </button>
                <button
                  disabled={!isValid}
                  type="submit"
                  htmlFor="my-modal-3"
                  className="btn btn-md btn-success text-white  w-32"
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
                  onClick={() => {
                    onHandleReset(resetForm);
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
    </div>
  );
}

export default FormSumberKeluhan;
