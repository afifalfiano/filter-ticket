/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import FormUpdateProfile from './FormUpdateProfile';
import { selectCurrentUser } from '../../store/features/auth/authSlice';

import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { useAllTeamMutation } from '../../store/features/team/teamApiSlice';
import { selectAllPOP, setPOP } from '../../store/features/pop/popSlice';
import { selectAllTeam, setTeam } from '../../store/features/team/teamSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useGetProfileMutation } from '../../store/features/auth/authApiSlice';

function Profile() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [profile, setProfile] = useState(null);

  const [currentRole, setCurrentRole] = useState(null);
  const [currentPop, setCurrentPop] = useState(null);

  const { data: user } = useSelector(selectCurrentUser);
  const role = useSelector(selectAllTeam);
  const pop = useSelector(selectAllPOP);
  const [allPOP] = useAllPOPMutation();
  const [allTeam] = useAllTeamMutation();
  const [getProfile] = useGetProfileMutation();

  const doGetProfile = async () => {
    try {
      const data = await getProfile().unwrap();
      console.log(data, 'profile');
      if (data.status === 'success') {
        setProfile(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      console.log(data, 'ceksaja');
      if (data.status === 'success') {
        dispatch(setPOP({ ...data }));
        console.log(pop, 'ppp');
        const index = pop.data.find((item) => item.id_pop === user.pop_id);
        setCurrentPop(index);
        console.log(index, 'match');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllTeam = async () => {
    try {
      const data = await allTeam().unwrap();
      console.log(data, 'zxc');
      if (data.status === 'success') {
        dispatch(setTeam({ ...data }));
        console.log(role, 'tm');
        const index = role.data.find((item) => +item.id_role === +user.role_id);
        setCurrentRole(index);
        console.log(index, 'match');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/profile', title: 'Profil' }]));
    getAllPOP();
    getAllTeam();
    doGetProfile();
  }, [form]);

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
        <FormUpdateProfile handleForm={handleForm} profile={profile} />
      ) : (
        <div className="flex items-start justify-center">
          <div className="text-center">
            <div className="avatar placeholder">
              <div className="bg-neutral-focus text-neutral-content rounded-full w-24">
                <span className="text-3xl">
                  <img src={profile?.avatar} alt={profile?.username} />
                </span>
              </div>
            </div>
            <h1 className="font-semibold text-xl mt-5">{profile?.username}</h1>
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
                        <td>{profile?.email}</td>
                      </tr>
                      <tr className="text-left">
                        <td>Role</td>
                        <td>:</td>
                        <td>{profile?.role?.role}</td>
                      </tr>
                      <tr className="text-left">
                        <td>POP</td>
                        <td>:</td>
                        <td>{profile?.pop?.pop}</td>
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
