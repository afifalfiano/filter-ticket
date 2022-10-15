/* eslint-disable no-console */
import { useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { useSelector } from 'react-redux';
import FormUpdateProfile from '../../components/profile/FormUpdateProfile';
import { selectCurrentUser } from '../../store/features/auth/authSlice';

function Profile() {
  const [form, setForm] = useState(false);
  const { data: user } = useSelector(selectCurrentUser);

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
        <FormUpdateProfile handleForm={handleForm} user={user} />
      ) : (
        <div className="flex items-start justify-center">
          <div className="text-center">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                <span className="text-3xl">{user?.username[0]}</span>
              </div>
            </div>
            <h1 className="font-semibold text-xl mt-5">{user?.username}</h1>
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
                        <td>{user?.email}</td>
                      </tr>
                      <tr className="text-left">
                        <td>Role</td>
                        <td>:</td>
                        <td>{user?.role_id}</td>
                      </tr>
                      <tr className="text-left">
                        <td>POP</td>
                        <td>:</td>
                        <td>{user?.pop_id}</td>
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
