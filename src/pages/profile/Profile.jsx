/* eslint-disable no-console */
import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import FormUpdateProfile from '../../components/profile/FormUpdateProfile';

function Profile() {
  const [form, setForm] = useState(false);

  const handleUpdateProfile = (event) => {
    console.log(event, 'ev');
    setForm(true);
  };

  const handleForm = (event) => {
    console.log(event, 'form');
    setForm(event);
  };

  return (
    <div>
      {form ? (
        <FormUpdateProfile handleForm={handleForm} />
      ) : (
        <div className="flex items-start justify-center">
          <div className="text-center">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                <span className="text-3xl">A</span>
              </div>
            </div>
            <h1 className="font-semibold text-xl mt-5">Afif Alfiano</h1>
            <div className="my-5 flex justify-center">
              <div className="border-gray-200 rounded-md border-2 w-80 h-48 items-center flex-row justify-center">
                <div className="flex pt-1 px-1 justify-end">
                  <HiPencilAlt
                    size={30}
                    className="link"
                    onClick={handleUpdateProfile}
                  />
                </div>
                <div className="px-5 py-5">
                  <table className="border-none items-center w-full font-semibold">
                    <tbody>
                      <tr className="text-left">
                        <td>Email</td>
                        <td>:</td>
                        <td>afif@gmail.com</td>
                      </tr>
                      <tr className="text-left">
                        <td>Role</td>
                        <td>:</td>
                        <td>HELPDESK</td>
                      </tr>
                      <tr className="text-left">
                        <td>POP</td>
                        <td>:</td>
                        <td>Yogyakarta</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Profile;
