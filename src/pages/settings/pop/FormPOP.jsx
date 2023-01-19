import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useAddPOPMutation, useUpdatePOPMutation } from '../../../store/features/pop/popApiSlice';
import { FormPOPSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { Button, ButtonIconExit, Required } from '../../../components';

function FormPOP({ stateModal, getInfo, detail, titleAction }) {
  const [addPOP] = useAddPOPMutation();
  const [updatePOP] = useUpdatePOPMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    pop: detail?.pop || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      pop: { ...stateModal.pop, showAddModalPop: false, showUpdateModalPop: false },
    };
    dispatch(setModal(newState));
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      id_pop: Math.floor(Math.random() * 90 + 10),
      pop: payload.pop,
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
    const update = await updatePOP({
      id: detail.id_pop,
      body: { ...body, id_pop: detail.id_pop },
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
    const add = await addPOP({ ...body });
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

  const onHandleReset = (reset) => {
    reset();
    onBtnClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box mt-5  h-fit max-h-fit  max-w-lg">
      <ButtonIconExit onClick={onBtnClose} />

        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah POP' : titleAction === 'update' && 'Ubah POP'}
          {titleAction === 'read' && 'Detail POP'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormPOPSchema}
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
                <label htmlFor="pop" className="label">
                  <span className="label-text"> Nama POP:</span>
                </label>
                <Field
                  id="pop"
                  name="pop"
                  placeholder="Nama POP"
                  value={values.pop}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.pop && touched.pop && <Required errors={errors.pop}  />}
              </div>

              <hr className="my-2 mt-10" />
              {titleAction !== 'read' && (
              <div className="modal-action justify-center">
                <Button type="button" onClick={() => onHandleReset(resetForm)} >Batal</Button>
                <Button type="submit" className="btn-success" disabled={!isValid} >Simpan</Button>
              </div>
              )}
              {titleAction === 'read' && (
              <div className="modal-action justify-center">
                <Button type="button" onClick={() => onHandleReset(resetForm)} >Kembali</Button>
              </div>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default FormPOP;
