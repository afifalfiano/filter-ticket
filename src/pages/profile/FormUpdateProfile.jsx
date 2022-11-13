/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable jsx-a11y/label-has-associated-control */
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { selectCurrentUser, setCredentials } from '../../store/features/auth/authSlice';
import { selectAllPOP } from '../../store/features/pop/popSlice';
import { selectAllTeam } from '../../store/features/team/teamSlice';
import { useUpdateProfileMutation } from '../../store/features/auth/authApiSlice';
import { selectBreadcrumb, updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { ProfileSchema } from '../../utils/schema_validation_form';

/* eslint-disable react/prop-types */
function FormUpdateProfile({ handleForm, profile }) {
  const { data: user } = useSelector(selectCurrentUser);
  const roleData = useSelector(selectAllTeam);
  const popData = useSelector(selectAllPOP);

  const [updateProfile,] = useUpdateProfileMutation();
  const dispatch = useDispatch()

  const navigasi = useSelector(selectBreadcrumb);

  useEffect(() => {
    const dataNavigation = [...navigasi.data, { path: '/profile', title: 'Ubah Profil' }]
    dispatch(updateBreadcrumb(dataNavigation));
  }, [])

  const onBtnBack = () => {
    handleForm(false);
  };

  const onSubmitData = async (payload) => {
    try {
      // create
      let body;
      if (payload.password.trim().length > 0 && payload.password_confirmation.trim().length > 0) {
        body = {
          name: payload.name,
          pop_id: payload.pop_id,
          role_id: payload.role_id,
          email: payload.email,
          password: payload.password,
          password_confirmation: payload.password_confirmation,
        };
      } else {
        body = {
          name: payload.name,
          pop_id: payload.pop_id,
          role_id: payload.role_id,
          email: payload.email,
        };
      }
      const data = await updateProfile(body).unwrap();
      console.log(data, 'res cek saja');
      console.log(body, 'body');
      if (data.status === 'success') {
        const newProfile = {
          ...user, bearer_token: data.bearer_token, role_id: data.data[0].role_id, pop_id: data.data[0].pop_id, username: data.data[0].name
        }
        dispatch(setCredentials({ ...newProfile }));
        console.log(newProfile, 'let');
        const local = JSON.stringify(newProfile);
        localStorage.setItem('user', local);
        toast.success('Berhasil memperbarui akun.', {
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
          handleForm(false);
        }, 2000)
      } else {
        toast.error(`${data.message}` || 'Gagal Perbarui Profile', {
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
      toast.error(error.message || 'Gagal Perbarui Profile', {
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
  return (
    <div>
      <Formik
        enableReinitialize
        validationSchema={ProfileSchema}
        initialValues={{
          name: user.username, email: user.email, pop_id: user.pop_id, role_id: user.role_id, old_password: '', password: '', password_confirmation: ''
        }}
        onSubmit={(values) => {
          onSubmitData(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          handleBlur,
          handleChange,
        }) => (
          <Form>
            <div className="flex items-start justify-center">
              <div className="text-center">
                <div className="avatar placeholder">
                  <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                    <span className="text-3xl">
                      <img src={profile?.avatar} alt={profile?.username} />
                    </span>
                  </div>
                </div>
                <h1 className="font-semibold text-xl mt-5">Ubah Profile</h1>
                <div className="my-5 flex justify-center gap-7">
                  <div className="border-gray-200 rounded-md border-2 w-80 h-auto items-center flex-1 flex-row justify-center">
                    <div className="px-5 py-5">
                      <div className="form-control">
                        <label htmlFor="fullName" className="label">
                          <span className="label-text"> Nama Lengkap:</span>
                        </label>

                        <Field
                          id="name"
                          name="name"
                          placeholder=""
                          value={values.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="input input-md input-bordered  max-w-full"
                        />
                      </div>

                      <div className="form-control">
                        <label htmlFor="email" className="label">
                          <span className="label-text"> Email:</span>
                        </label>

                        <Field
                          type="email"
                          component="input"
                          id="email"
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="email@citra.net"
                          value={values.email}
                          disabled={user.role_id !== 3}
                          className="input input-md input-bordered  max-w-full"
                        />
                      </div>

                      <div className="form-control">
                        <label htmlFor="team" className="label">
                          <span className="label-text"> Tim:</span>
                        </label>

                        <Field
                          component="select"
                          id="role_id"
                          name="role_id"
                          value={values.role_id}
                          onBlur={handleBlur}
                          disabled={user.role_id !== 3}
                          onChange={handleChange}
                          className="select w-full max-w-full input-bordered"
                        >
                          {roleData.data.map((item) => (
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
                          disabled={user.role_id !== 3}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          className="select w-full max-w-full input-bordered"
                        >
                          {popData.data.map((item) => (
                            <option value={item.id_pop} label={item.pop}>
                              {item.pop}
                            </option>
                          ))}
                        </Field>
                      </div>
                    </div>
                  </div>
                  <div className="border-gray-200 rounded-md border-2 w-80 h-auto items-center flex-1 flex-row justify-center">
                    <div className="px-5 py-5">
                      <div className="form-control ">
                        <label htmlFor="old_password" className="label">
                          <span className="label-text"> Password Lama:</span>
                        </label>
                        <Field
                          type="password"
                          component="input"
                          id="old_password"
                          name="old_password"
                          placeholder="***************"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.old_password}
                          className="input input-md input-bordered  max-w-full"
                        />
                        {errors.old_password && touched.old_password ? (
                          <div className="label label-text text-red-500">
                            {errors.old_password}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-control ">
                        <label htmlFor="password" className="label">
                          <span className="label-text"> Password:</span>
                        </label>
                        <Field
                          type="password"
                          component="input"
                          id="password"
                          name="password"
                          placeholder="***************"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password}
                          className="input input-md input-bordered  max-w-full"
                        />
                        {errors.password && touched.password ? (
                          <div className="label label-text text-red-500">
                            {errors.password}
                          </div>
                        ) : null}
                      </div>

                      <div className="form-control ">
                        <label htmlFor="password_confirmation" className="label">
                          <span className="label-text">
                            Konfirmsi Password:
                          </span>
                        </label>
                        <Field
                          type="password"
                          id="password_confirmation"
                          name="password_confirmation"
                          placeholder="***************"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.password_confirmation}
                          className="input input-md input-bordered  max-w-full"
                        />
                        {errors.password_confirmation
                        && touched.password_confirmation ? (
                          <div className="label label-text text-red-500">
                            {errors.password_confirmation}
                          </div>
                          ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-nowrap gap-5 justify-center">
                  <button
                    type="button"
                    onClick={onBtnBack}
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md bg-black text-white w-24"
                  >
                    Kembali
                  </button>
                  <button
                    type="submit"
                    className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md w-24 bg-success"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormUpdateProfile;
