import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../../components';

function VerificationEmail() {
  const navigate = useNavigate()
  return (
    <div className="flex h-screen min-h-screen w-screen min-w-screen items-start mt-10 justify-center">
      <div className="text-center">
        <h1 className="font-semibold text-2xl">Verifikasi Email</h1>
        <div className="my-5 flex justify-center">
          <img src="/check_email.svg" width={'100%'} height={'100%'} alt="https://storyset.com/business" className="w-72 items-center flex justify-center" />
        </div>
        <p className="label w-72">
          Silahkan cek inbox email anda untuk melakukan verifikasi email.
        </p>
        <div className="form-control mt-5 items-center mx-2">
          <Button type="submit" style={{width: '100%'}} onClick={() => navigate('/sign_in')} >Masuk</Button>
        </div>
      </div>
    </div>
  );
}

export default VerificationEmail;
