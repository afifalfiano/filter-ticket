/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
/* eslint-disable no-prototype-builtins */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useLoginMutation } from '../../../store/features/auth/authApiSlice';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { SignInSchema } from '../../../utils/schema_validation_form';

function SignIn() {
  const dispatch = useDispatch();
  const [login, { isSuccess }] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmitLogin = async (payload) => {
    try {
      const userData = await login({
        email: payload.email,
        password: payload.password,
      }).unwrap();
      if (userData.hasOwnProperty('bearer_token')) {
        dispatch(setCredentials({ ...userData }));
        const local = JSON.stringify(userData);
        localStorage.setItem('user', local);
        setTimeout(() => {
          navigate('/dashboard', { replace: true });
        }, 0);
      } else {
        toast.error(userData?.data?.message || 'Terjadi Kesalahan Sistem', {
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
    } catch (err) {
      toast.error(err?.data?.message || 'Terjadi Kesalahan Sistem', {
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
    <div className="grid grid-flow-col gap-3 h-screen min-h-screen">
      <div className="col-span-6 bg-gray-200">
        <p className="flex justify-center align-middle items-center min-h-screen">
          Image
        </p>
      </div>
      <div className="col-span-1 h-screen bg-white">
        <Formik
          enableReinitialize
          validationSchema={SignInSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              resetForm();
            }, 500);
            onSubmitLogin(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            handleBlur,
            handleChange
          }) => (
            <Form className="flex-row pt-10 pb-10 pl-16 pr-16 min-h-screen">
              <div className="pt-20">
                <h4 className="text-2xl text-center font-semibold">
                  Selamat Datang!
                </h4>
                <h4 className="text-2xl text-center font-semibold">
                  Silahkan Masuk
                </h4>
              </div>
              <div className="form-control pt-4">
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
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.email && touched.email ? (
                  <div className="label label-text text-red-500">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-control pt-4 ">
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
                  <div className="label label-text text-red-500">{errors.password}</div>
                ) : null}
              </div>

              <div className="label justify-end pt-4 font-semibold link-primary">
                <Link to="/forget_password">&nbsp; Lupa Password?</Link>
              </div>

              <div className="form-control mt-5">
                <button
                  type="submit"
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-block"
                  disabled={!isValid}
                >
                  Masuk
                </button>
              </div>

              <div className="label justify-center pt-4">
                <span>Belum punya akun?</span>
                <span className="font-bold link-primary">
                  <Link to="/sign_up">&nbsp; Daftar</Link>
                </span>
              </div>

              <div className="label justify-center align-bottom pt-36">
                Copyright@
                {new Date().getFullYear()}
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
export default SignIn;
