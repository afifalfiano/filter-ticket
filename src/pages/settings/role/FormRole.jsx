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
import { selectCurrentUser } from '../../../store/features/auth/authSlice';
import { useAddTeamMutation, useUpdateTeamMutation } from '../../../store/features/team/teamApiSlice';
import { FormRoleSchema } from '../../../utils/schema_validation_form';

function FormRole({ getInfo, detail, titleAction }) {
  console.log(detail, 'cek render');
  const [addTeam] = useAddTeamMutation();
  const [updateTeam] = useUpdateTeamMutation();
  const { data: user } = useSelector(selectCurrentUser);
  const initialValues = {
    role: detail?.role || '',
  };

  const onSubmitData = async (payload, resetForm) => {
    const body = {
      id_role: Math.floor(Math.random() * 90 + 10),
      role: payload.role,
      user_id: user.id_user,
    };
    try {
      // create
      console.log(detail, 'dt');
      if (detail === null) {
        const add = await addTeam({ ...body });
        if (add.data.status === 'success') {
          toast.success('Berhasil tambah data Role.', {
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
            resetForm();
            document.getElementById('my-modal-3').click();
            getInfo({ status: 'success' });
          }, 2000);
        } else {
          toast.error(add.data.message, {
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
      } else {
        // update
        const update = await updateTeam({
          id: detail.id_role,
          body: { ...body, id_role: detail.id_role },
        });
        console.log(body, 'body');
        if (update.data.status === 'success') {
          toast.success('Berhasil ubah data role.', {
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
            document.getElementById('my-modal-3').click();
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
    document.getElementById('my-modal-3').click();
  };

  return (
    <div className="modal">
      <div className="modal-box max-w-2xl">
        <label
          htmlFor="my-modal-3"
          className="btn btn-sm btn-circle absolute right-2 top-2"
        >
          ✕
        </label>
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
                {errors.role && touched.role ? (
                  <div className="label label-text text-red-500">{errors.role}</div>
                ) : null}
              </div>

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

export default FormRole;
