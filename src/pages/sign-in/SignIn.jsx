/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [valid, setValid] = useState(false);

  const navigate = useNavigate();

  // eslint-disable-next-line consistent-return
  const handleValidation = () => {
    if (email.trim().includes('@') && password.trim().length > 0) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onSubmitLogin = (e) => {
    e.preventDefault();
    const user = { email, password };
    const local = JSON.stringify(user);
    localStorage.setItem('user', local);
    navigate('/dashboard', { replace: true });
    window.location.reload();
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
    handleValidation();
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    handleValidation();
  };

  return (
    <div className="grid grid-flow-col gap-3 h-screen min-h-screen">
      <div className="col-span-6 bg-gray-200">
        <p className="flex justify-center align-middle items-center min-h-screen">
          Image
        </p>
      </div>
      <div className="col-span-1 h-screen bg-white">
        <form
          onSubmit={onSubmitLogin}
          className="flex-row pt-10 pb-10 pl-16 pr-16 min-h-screen"
        >
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

            <input
              type="email"
              value={email}
              id="email"
              onChange={handleEmail}
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="form-control pt-4 ">
            <label htmlFor="password" className="label">
              <span className="label-text"> Password:</span>
            </label>
            <input
              type="password"
              value={password}
              id="password"
              onChange={handlePassword}
              className="input input-md input-bordered  max-w-full"
            />
          </div>

          <div className="label justify-end pt-4 font-semibold link-primary">
            <Link to="/forget_password">&nbsp; Lupa Password?</Link>
          </div>

          <div className="form-control mt-5">
            <button
              type="submit"
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-md btn-block"
              disabled={!valid}
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
        </form>
      </div>
    </div>
  );
}
export default SignIn;
