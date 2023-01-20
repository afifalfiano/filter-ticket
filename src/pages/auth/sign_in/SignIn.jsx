import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Field, Form } from 'formik';
import { useLoginMutation } from '../../../store/features/auth/authApiSlice';
import { setCredentials } from '../../../store/features/auth/authSlice';
import { SignInSchema } from '../../../utils/schema_validation_form';
import { encryptLocalStorage } from '../../../utils/helper';
import catchError from '../../../services/catchError';
import { Button, Wrapper, Required } from '../../../components';

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
      const userData = await login({ ...body }).unwrap();
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
    <div className="flex gap-0 lg:flex lg:gap-3 h-screen min-h-screen ">
      <Wrapper />
      <div className="h-screen bg-white w-full lg:w-4/12 relative">
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
            <Form className="flex-row py-6 px-6 md:pt-10 md:pb-10 md:pl-16 md:pr-16 min-h-screen">
              <div className="pt-10 lg:pt-20">
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
                {errors.email && touched.email && <Required errors={errors.email} />}
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
                {errors.password && touched.password && <Required errors={errors.password} />}
              </div>

              <div className="label justify-end pt-4 font-semibold link-primary">
                <Link to="/forget_password">&nbsp; Lupa Password?</Link>
              </div>

              <div className="form-control mt-5">
                <Button type="submit" style={{ width: '100%' }} disabled={!isValid}>Masuk</Button>
              </div>

              <div className="label justify-center pt-4">
                <span>Belum punya akun?</span>
                <span className="font-bold link-primary">
                  <Link to="/sign_up">&nbsp; Daftar</Link>
                </span>
              </div>

              <div className="label justify-center align-bottom absolute bottom-10 right-0 left-0">
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
