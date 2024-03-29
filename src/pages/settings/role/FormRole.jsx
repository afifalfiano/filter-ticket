import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useAddTeamMutation, useUpdateTeamMutation } from '../../../store/features/team/teamApiSlice';
import { FormRoleSchema } from '../../../utils/schema_validation_form';
import { setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { Button, ButtonIconExit, Required } from '../../../components';

function FormRole({ stateModal, getInfo, detail, titleAction }) {
  const [addTeam] = useAddTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    role: detail?.role || '',
  };

  const dispatch = useDispatch();

  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      role: { ...stateModal.role, showAddModalRole: false, showUpdateModalRole: false },
    };
    dispatch(setModal(newState));
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      id_role: Math.floor(Math.random() * 90 + 10),
      role: payload.role,
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
    const update = await updateTeam({
      id: detail.id_role,
      body: { ...body, id_role: detail.id_role },
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
    const add = await addTeam({ ...body });
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
          {detail === null && titleAction === 'create' ? 'Tambah Role' : titleAction === 'update' && 'Ubah Role'}
          {titleAction === 'read' && 'Detail Role'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormRoleSchema}
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
                <label htmlFor="role" className="label">
                  <span className="label-text"> Nama role:</span>
                </label>
                <Field
                  id="role"
                  name="role"
                  placeholder="Nama Role"
                  value={values.role}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.role && touched.role && <Required errors={errors.role} />}
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

export default FormRole;
