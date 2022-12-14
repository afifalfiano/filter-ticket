/* eslint-disable jsx-a11y/img-redundant-alt */
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useLoginMutation } from '../../../store/features/auth/authApiSlice';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { SignInSchema } from '../../../utils/schema_validation_form';
import { encryptLocalStorage } from '../../../utils/helper';
import catchError from '../../../services/catchError';

function SignIn() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const navigate = useNavigate();

  const onSubmitLogin = async (payload, resetForm) => {
    try {
      const body = {
        email: payload.email,
        password: payload.password,
      }
      const userData = await login({...body}).unwrap();
      if (userData.hasOwnProperty('bearer_token')) {
        dispatch(setCredentials({ ...userData }));
        encryptLocalStorage('user_encrypt', userData);
        resetForm();
        navigate('/dashboard', { replace: true });
      } else {
        catchError(userData, true);
      }
    } catch (err) {
      catchError(err, true);
    }
  };

  return (
    <div className="flex gap-3 h-screen min-h-screen">
      <div className="bg-gray-200 w-8/12">
        <img src="/wrapper.jpg" alt="https://www.pexels.com/photo/gray-wooden-computer-cubicles-inside-room-267507/" className="object-cover flex justify-center align-middle items-center min-h-screen image-full bg-cover bg-no-repeat" />
          {/* <img src="/wrapper.jpg" alt="https://www.pexels.com/photo/gray-wooden-computer-cubicles-inside-room-267507/" className="w-full h-full"/> */}
      </div>
      <div className="w-4/12 h-screen bg-white">
        <Formik
          enableReinitialize
          validationSchema={SignInSchema}
          initialValues={{ email: '', password: '' }}
          onSubmit={(values, { resetForm }) => {
            onSubmitLogin(values, resetForm);
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
                  placeholder="Masukkan email"
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
