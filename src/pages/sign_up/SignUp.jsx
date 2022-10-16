/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import { useRegisterMutation } from '../../store/features/auth/authApiSlice';

function SignUp() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [team, setTeam] = useState('');
  const [location, setLocation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const initialValues = {
    name: '',
    pop_id: '',
    role_id: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const onSubmitData = async (payload) => {
    try {
      // create
      const body = {
        name: payload.name,
        pop_id: payload.pop_id || 1,
        role_id: payload.role_id || 1,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      };
      const registerRes = await register(body);
      console.log(registerRes, 'res');
      if (registerRes.data.message === 'Successfully created!') {
        toast.success('Berhasil membuat akun baru.', {
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
          navigate('/verification_email', { replace: true });
        }, 2000)
      } else {
        toast.error(`${registerRes.data.message}`, {
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

  return (
    <div className="grid grid-flow-col gap-3 h-screen min-h-screen">
      <div className="col-span-6 bg-gray-200 ">
        <p className="flex justify-center align-middle items-center  min-h-screen">
          Image
        </p>
      </div>
      <div className="col-span-1 h-full bg-white">
        <Formik
          enableReinitialize
          initialValues={initialValues}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              resetForm();
            }, 500)
            onSubmitData(values);
          }}
        >
          {({
            values,
            errors,
            isSubmitting,
            isValid,
            setFieldValue,
            handleChange,
            resetForm,
          }) => (
            <Form className="flex-row px-16">
              <div className="pt-3">
                <h4 className="text-2xl text-center font-semibold">
                  Silahkan Mendaftar
                </h4>
              </div>
              <div className="form-control pt-4">
                <label htmlFor="name" className="label">
                  <span className="label-text"> Nama Lengkap:</span>
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Nama Lengkap"
                  value={values.name}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              <div className="form-control pt-4">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Email:</span>
                </label>

                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email@citra.net"
                  value={values.email}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              <div className="form-control pt-4">
                <label htmlFor="role_id" className="label">
                  <span className="label-text"> Tim:</span>
                </label>
                <Field
                  component="select"
                  id="role_id"
                  name="role_id"
                  value={values.role_id}
                  className="select w-full max-w-full input-bordered"
                >
                  <option value="1">HELPDESK</option>
                  <option value="2">NOC</option>
                </Field>
              </div>

              <div className="form-control pt-4">
                <label htmlFor="pop_id" className="label">
                  <span className="label-text"> POP(Lokasi):</span>
                </label>

                <Field
                  component="select"
                  id="pop_id"
                  name="pop_id"
                  value={values.pop_id}
                  className="select w-full max-w-full input-bordered"
                >
                  <option value="1">Yogyakarta</option>
                  <option value="2">Solo</option>
                  <option value="3">Surakarta</option>
                </Field>
              </div>

              <div className="form-control pt-4 ">
                <label htmlFor="password" className="label">
                  <span className="label-text"> Password:</span>
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="***************"
                  value={values.password}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              <div className="form-control pt-4 ">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text"> Konfirmsi Password:</span>
                </label>
                <Field
                  type="password"
                  id="password_confirmation"
                  name="password_confirmation"
                  placeholder="***************"
                  value={values.password_confirmation}
                  className="input input-md input-bordered  max-w-full"
                />
              </div>

              <div className="form-control mt-5">
                <button
                  type="submit"
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-block"
                >
                  Daftar
                </button>
              </div>
              <div className="label justify-center pt-4">
                <span>Sudah punya akun?</span>
                <span className="font-bold link-primary">
                  <Link to="/sign_in">&nbsp; Masuk</Link>
                </span>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default SignUp;
