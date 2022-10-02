import { Link } from 'react-router-dom';

function VerificationEmail() {
  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-20 justify-center">
      <div className="text-center">
        <h1>Verifikasi Email</h1>
        <div className="my-5 flex justify-center">
          <div className="bg-red-100 w-52 h-52 items-center flex justify-center">
            image
          </div>
        </div>
        <p className="label w-full">
          Silahkan cek inbox email anda untuk melakukan verifikasi email.
        </p>
        <div className="form-control mt-5 items-center">
          <Link className="btn btn-md w-32" to="/sign_in">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerificationEmail;
