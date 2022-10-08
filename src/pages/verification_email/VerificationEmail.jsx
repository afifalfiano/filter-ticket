import { Link } from 'react-router-dom';

function VerificationEmail() {
  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-20 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-lg">Verifikasi Email</h1>
        <div className="my-5 flex justify-center">
          <div className="bg-red-100 w-52 h-52 items-center flex justify-center">
            image
          </div>
        </div>
        <p className="label w-56">
          Silahkan cek inbox email anda untuk melakukan verifikasi email.
        </p>
        <div className="form-control mt-5 items-center mx-2">
          <Link className="btn btn-md btn-block" to="/sign_in">
            Masuk
          </Link>
        </div>
      </div>
    </div>
  );
}

export default VerificationEmail;