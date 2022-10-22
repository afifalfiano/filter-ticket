/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable operator-linebreak */
/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { useRegisterMutation } from '../../store/features/auth/authApiSlice';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { useAllTeamMutation } from '../../store/features/team/teamApiSlice';

const SignUpSchema = Yup.object().shape({
  name: Yup.string().required('Wajb diisi'),
  email: Yup.string()
    .email('Email tidak valid.')
    .required('Wajib diisi.')
    .matches(/@citra/, 'Email tidak sesuai.'),
  password: Yup.string()
    .required('Wajib diisi.')
    .min(6, 'Password minimal 6 karakter.'),
  pop_id: Yup.string()
    .required('Wajib diisi.'),
  role_id: Yup.string()
    .required('Wajib diisi.'),
  password_confirmation: Yup.string()
    .required('Wajib diisi.')
    .oneOf([Yup.ref('password'), null], 'Password tidak cocok')
});

function SignUp() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [allPOP] = useAllPOPMutation();
  const [allTeam] = useAllTeamMutation();

  const [optionTeam,] = useState([
    { label: 'Pilih Role', value: '' },
    { label: 'HELPDESK', value: 1 },
    { label: 'NOC', value: 2 },
  ])
  const [optionPOP,] = useState([
    { label: 'Pilih POP', value: '' },
    { label: 'Yogyakarta', value: 1 },
    { label: 'Solo', value: 2 },
    { label: 'Surakarta', value: 3 },
  ])

  const initialValues = {
    name: '',
    pop_id: '',
    role_id: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  // const getAllPOP = async () => {
  //   try {
  //     const data = await allPOP().unwrap();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const getAllTeam = async () => {
  //   try {
  //     const data = await allTeam().unwrap();
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //   getAllPOP();
  //   getAllTeam();
  // }, [])

  const onSubmitData = async (payload, resetForm) => {
    try {
      // create
      const body = {
        name: payload.name,
        pop_id: payload.pop_id,
        role_id: payload.role_id,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      };
      const registerRes = await register(body);
      console.log(registerRes, 'res');
      console.log(body, 'body');
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
        resetForm();

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
          validationSchema={SignUpSchema}
          onSubmit={(values, { resetForm }) => {
            onSubmitData(values, resetForm);
          }}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            handleBlur,
            handleChange,
          }) => (
            <Form className="flex-row px-16">
              <div className="pt-3">
                <h4 className="text-2xl text-center font-semibold">
                  Silahkan Mendaftar
                </h4>
              </div>
              <div className="form-control">
                <label htmlFor="name" className="label">
                  <span className="label-text"> Nama Lengkap:</span>
                </label>
                <Field
                  id="name"
                  name="name"
                  placeholder="Nama Lengkap"
                  value={values.name}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.name && touched.name ? (
                  <div className="label text-red-500 pb-0 text-xs">{errors.name}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="email" className="label">
                  <span className="label-text"> Email:</span>
                </label>

                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="email@citra.net"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.email && touched.email ? (
                  <div className="label text-red-500 pb-0 text-xs">{errors.email}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="role_id" className="label">
                  <span className="label-text"> Tim:</span>
                </label>
                <Field
                  component="select"
                  id="role_id"
                  name="role_id"
                  value={values.role_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="select w-full max-w-full input-bordered"
                >
                  {optionTeam.map((item) => (
                    <option value={item.value} label={item.label}>{item.label}</option>
                  ))}
                </Field>
                {errors.role_id && touched.role_id ? (
                  <div className="label text-red-500 pb-0 text-xs">{errors.role_id}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="pop_id" className="label">
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
                  {optionPOP.map((item) => (
                    <option value={item.value} label={item.label}>{item.label}</option>
                  ))}
                </Field>
                {errors.pop_id && touched.pop_id ? (
                  <div className="label text-red-500 pb-0 text-xs ">{errors.pop_id}</div>
                ) : null}
              </div>

              <div className="form-control ">
                <label htmlFor="password" className="label">
                  <span className="label-text"> Password:</span>
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="***************"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  className="input input-md input-bordered  max-w-full"
                />
                {errors.password && touched.password ? (
                  <div className="label text-red-500 pb-0 text-xs">{errors.password}</div>
                ) : null}
              </div>

              <div className="form-control ">
                <label htmlFor="confirmPassword" className="label">
                  <span className="label-text"> Konfirmsi Password:</span>
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
                {errors.password_confirmation && touched.password_confirmation ? (
                  <div className="label text-red-500 pb-0 text-xs">
                    {errors.password_confirmation}
                    {' '}
                  </div>
                ) : null}
              </div>

              <div className="form-control mt-5">
                <button
                  type="submit"
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-block"
                  disabled={!isValid}
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
