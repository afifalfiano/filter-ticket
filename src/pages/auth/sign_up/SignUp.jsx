/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useRegisterMutation } from '../../../store/features/auth/authApiSlice';
import { useAllPOPMutation } from '../../../store/features/pop/popApiSlice';
import { useAllTeamPublicMutation } from '../../../store/features/team/teamApiSlice';
import { SignUpSchema } from '../../../utils/schema_validation_form';
import catchError from '../../../services/catchError';
import handleResponse from '../../../services/handleResponse';

function SignUp() {
  const navigate = useNavigate();
  const [register] = useRegisterMutation();
  const [allPOP] = useAllPOPMutation();
  const [allTeamPublic] = useAllTeamPublicMutation();

  const [optionTeam, setOptionTeam] = useState([])
  const [optionPOP, setOptionPOP] = useState([])

  const initialValues = {
    name: '',
    pop_id: '',
    role_id: '',
    email: '',
    password: '',
    password_confirmation: '',
    agreement: false,
  };

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      if (data.status === 'Success' || data.status === 'success') {
        const mapPOP = data.data.map((item) => ({
          label: item.pop,
          value: item.id_pop
        }))
        mapPOP.unshift({ label: 'Pilih POP', value: '' });
        setOptionPOP(mapPOP);
      } else {
        setOptionPOP([{ label: 'Pilih POP', value: '' }]);
        catchError(data, true);
      }
    } catch (error) {
      setOptionPOP([{ label: 'Pilih POP', value: '' }]);
      catchError(error, true);
    }
  }

  const getAllTeam = async () => {
    try {
      const data = await allTeamPublic().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        const mapTeam = data.data.map((item) => ({
          label: item.role,
          value: item.id_role
        }))
        mapTeam.unshift({ label: 'Pilih Role', value: '' })
        setOptionTeam(mapTeam);
      } else {
        setOptionTeam([{ label: 'Pilih Team', value: '' }]);
        catchError(data, true);
      }
    } catch (error) {
      setOptionTeam([{ label: 'Pilih Team', value: '' }]);
      catchError(error, true);
    }
  }

  useEffect(() => {
    getAllPOP();
    getAllTeam();
  }, []);

  const onSubmitData = async (payload, resetForm) => {
    try {
      const body = {
        name: payload.name.toUpperCase(),
        pop_id: payload.pop_id,
        role_id: payload?.role_id,
        email: payload.email,
        password: payload.password,
        password_confirmation: payload.password_confirmation,
      };
      const registerRes = await register(body);
      if (registerRes.data.message === 'Successfully created!') {
        handleResponse(registerRes);
        setTimeout(() => {
          resetForm();
          navigate('/verification_email', { replace: true });
        }, 2000)
      } else {
        catchError(registerRes);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  return (
    <div className="flex gap-0 lg:flex lg:gap-3 h-screen min-h-screen ">
      <div className="bg-gray-200 hidden lg:w-8/12 lg:flex">
        <img src="/wrapper.jpg" alt="https://www.pexels.com/photo/gray-wooden-computer-cubicles-inside-room-267507/" className="object-cover flex justify-center align-middle items-center min-h-screen image-full bg-cover bg-no-repeat" />
      </div>
      <div className="h-screen bg-white w-full lg:w-4/12 relative">
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
            <Form className="flex-row py-6 px-6 lg:py-3 lg:px-3 xl:py-10 xl:px-16 min-h-screen">
              <div className="pt-0">
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
                  placeholder="Masukkan email"
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
                  value={values?.role_id}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  className="select w-full max-w-full input-bordered"
                >
                  {optionTeam.map((item ,index) => (
                    <option key={index} value={item.value} label={item.label}>{item.label}</option>
                  ))}
                </Field>
                {errors?.role_id && touched?.role_id ? (
                  <div className="label text-red-500 pb-0 text-xs">{errors?.role_id}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label htmlFor="pop_id" className="label">
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
                  {optionPOP.map((item, index) => (
                    <option key={index} value={item.value} label={item.label}>{item.label}</option>
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

              <div className="form-control">
                <label htmlFor="agreement" className="label flex justify-start items-center align-middle gap-2">
                <Field
                  type="checkbox"
                  id="agreement"
                  name="agreement"
                />
                <span className="label-text w-full">Saya setuju untuk membuat akun.</span>
                </label>
                {errors.agreement && touched.agreement ? (
                  <div className="label text-red-500 pb-0 text-xs">
                    {errors.agreement}
                    {' '}
                  </div>
                ) : null}
              </div>

              <div className="form-control mt-5">
                <button
                  type="submit"
                  className="btn btn-md btn-block"
                  disabled={!isValid || values.agreement === false}
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
