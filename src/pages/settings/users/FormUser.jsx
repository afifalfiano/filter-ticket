import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { FormUserSchema } from '../../../utils/schema_validation_form';
import { useUpdateUsersMutation } from '../../../store/features/users/usersApiSlice';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { useAllTeamMutation } from '../../../store/features/team/teamApiSlice';
import { selectAllPOP, setPOP } from '../../../store/features/pop/popSlice';
import { selectAllTeam, setTeam } from '../../../store/features/team/teamSlice';
import { setModal } from '../../../store/features/modal/modalSlice';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';
import { ButtonIconExit } from '../../../components';

function FormUser({ stateModal, getInfo, detail, titleAction }) {
  const [updateUsers] = useUpdateUsersMutation()
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    name: detail?.name || '',
    email: detail?.email || '',
    pop_id: detail?.pop_id || '',
    role_id: detail?.role_id || '',
  };

  const [, setCurrentRole] = useState(null);
  const [, setCurrentPop] = useState(null);

  const role = useSelector(selectAllTeam);
  const pop = useSelector(selectAllPOP);
  const dispatch = useDispatch();
  const [allPOP] = useAllPOPMutation();
  const [allTeam] = useAllTeamMutation();
  const onBtnClose = () => {
    const newState = {
      ...stateModal,
      user: { ...stateModal.user, showUpdateModalUser: false, showActivateModalUser: false, showDeactivateModalUser: false },
    };
    dispatch(setModal(newState));
  };
  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setPOP({ ...data }));
        const index = pop?.data?.find((item) => item.id_pop === user.pop_id);
        setCurrentPop(index);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const getAllTeam = async () => {
    try {
      const data = await allTeam().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setTeam({ ...data }));
        const index = role?.data?.find((item) => +item.id_role === +user?.role_id);
        setCurrentRole(index);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  useEffect(() => {
    getAllPOP();
    getAllTeam();
  }, [])

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      name: payload.name,
      email: payload.email,
      role_id: payload?.role_id,
      pop_id: payload.pop_id,
    };
    try {
      const update = await updateUsers({
        id: detail.id_user,
        body: { ...body, id_user: detail.id_user },
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
    } catch (error) {
      catchError(error, true);
    }
  };

  const onHandleReset = (reset) => {
    reset();
    onBtnClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box h-fit max-h-fit max-w-lg">
<ButtonIconExit onClick={onBtnClose} />
        <h3 className="text-lg font-bold">
          {detail === null && titleAction === 'create' ? 'Tambah User' : titleAction === 'update' && 'Ubah User'}
          {titleAction === 'read' && 'Detail User'}
        </h3>
        <hr className="my-2" />
        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={FormUserSchema}
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
                <label htmlFor="name" className="label">
                  <span className="label-text"> Nama:</span>
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.name && touched.name ? (
                  <div className="label label-text text-red-500">{errors.name}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text"> email:</span>
                </label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  component="input"
                  placeholder="Email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.email && touched.email ? (
                  <div className="label label-text text-red-500">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="team" className="label">
                  <span className="label-text"> Tim:</span>
                </label>

                <Field
                  component="select"
                  id="role_id"
                  name="role_id"
                  value={values?.role_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="select w-full max-w-full input-bordered"
                >
                  {role?.data?.map((item, index) => (
                    <option
                      key={index}
                      id={item.id_role}
                      value={item.id_role}
                      label={item.role}
                    >
                      {item.role}
                    </option>
                  ))}
                </Field>
              </div>

              <div className="form-control">
                <label htmlFor="location" className="label">
                  <span className="label-text"> POP (Area Operasional):</span>
                </label>

                <Field
                  component="select"
                  id="pop_id"
                  name="pop_id"
                  value={values.pop_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="select w-full max-w-full input-bordered"
                >
                  {pop?.data?.map((item, index) => (
                    <option value={item.id_pop} label={item.pop} key={index}>
                      {item.pop}
                    </option>
                  ))}
                </Field>
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
                  className="btn btn-md   w-32 btn-success text-white"
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

export default FormUser;
