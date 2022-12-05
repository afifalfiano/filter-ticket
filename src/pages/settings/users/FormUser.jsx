/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable array-callback-return */
/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-alert */
import { Formik, Field, Form } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { FormShiftSchema, FormUserSchema } from '../../../utils/schema_validation_form';
import { useCreateShiftMutation, useUpdateShiftMutation } from '../../../store/features/shift/shiftApiSlice';
import { useUpdateUsersMutation } from '../../../store/features/users/usersApiSlice';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { useAllTeamMutation } from '../../../store/features/team/teamApiSlice';
import { selectAllPOP, setPOP } from '../../../store/features/pop/popSlice';
import { selectAllTeam, setTeam } from '../../../store/features/team/teamSlice';
import { setModal } from '../../../store/features/modal/modalSlice';

function FormUser({ stateModal, getInfo, detail, titleAction }) {
  const [updateUsers] = useUpdateUsersMutation()
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    name: detail?.name || '',
    email: detail?.email || '',
    pop_id: detail?.pop_id || '',
    role_id: detail?.role_id || '',
  };

  const [currentRole, setCurrentRole] = useState(null);
  const [currentPop, setCurrentPop] = useState(null);

  const role = useSelector(selectAllTeam);
  const pop = useSelector(selectAllPOP);
  const dispatch = useDispatch();
  const [allPOP] = useAllPOPMutation();
  const [allTeam] = useAllTeamMutation();
  const onBtnClose = (title) => {
    const newState = {
      ...stateModal,
      user: { ...stateModal.user, showUpdateModalUser: false },
    };
    dispatch(setModal(newState));
  };
  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        dispatch(setPOP({ ...data }));
        console.log(pop, 'ppp');
        const index = pop.data.find((item) => item.id_pop === user.pop_id);
        setCurrentPop(index);
        console.log(index, 'match');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTeam = async () => {
    try {
      const data = await allTeam().unwrap();
      console.log(data, 'zxc');
      if (data.status === 'success') {
        dispatch(setTeam({ ...data }));
        console.log(role, 'tm');
        const index = role.data.find((item) => +item.id_role === +user?.role_id);
        setCurrentRole(index);
        console.log(index, 'match');
      }
    } catch (error) {
      console.log(error);
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
      // create
      console.log(detail, 'dt');
      // update
      const update = await updateUsers({
        id: detail.id_user,
        body: { ...body, id_user: detail.id_user },
      });
      console.log(body, 'body');
      if (update.data.status === 'success') {
        toast.success('Berhasil ubah data user.', {
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
        setTimeout(() => {
          getInfo({ status: 'success' });
          // document.getElementById('my-modal-3').click();
          onBtnClose();
        }, 2000);
      } else {
        toast.error(update.data.message, {
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
      toast.error(error.data.message, {
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

  const onHandleReset = (reset) => {
    reset();
    // document.getElementById('my-modal-3').click();
    onBtnClose();
  };

  return (
    <div className="fixed w-screen h-screen bg-opacity-80 bg-gray-700 top-0 left-0 bottom-0 right-0 z-50 flex justify-center">
      <div className="modal-box h-fit max-h-fit max-w-lg">
        <button
          className="btn btn-sm btn-circle absolute right-2 top-2"
          onClick={onBtnClose}
        >
          ✕
        </button>
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
                  {role?.data.map((item) => (
                    <option
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
                  <span className="label-text"> POP(Lokasi):</span>
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
                  {pop?.data.map((item) => (
                    <option value={item.id_pop} label={item.pop}>
                      {item.pop}
                    </option>
                  ))}
                </Field>
              </div>

              {/* <div className="form-control">
                <label htmlFor="selesai" className="label">
                  <span className="label-text"> Selesai:</span>
                </label>
                <Field
                  id="selesai"
                  name="selesai"
                  placeholder="Nomor selesai"
                  value={values.selesai}
                  disabled={titleAction === 'read'}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.selesai && touched.selesai ? (
                  <div className="label label-text text-red-500">{errors.selesai}</div>
                ) : null}
              </div> */}

              <hr className="my-2 mt-10" />
              {titleAction !== 'read' && (
              <div className="modal-action justify-center">
                <button
                  type="button"
                  htmlFor="my-modal-3"
                  className="btn btn-md"
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
                  className="btn btn-md btn-success"
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
