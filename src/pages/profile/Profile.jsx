import { useState, useEffect } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { useDispatch, useSelector } from 'react-redux';
import FormUpdateProfile from './FormUpdateProfile';
import { selectCurrentUser } from '../../store/features/auth/authSlice';
import catchError from '../../services/catchError';
import { useAllPOPMutation } from '../../store/features/pop/popApiSlice';
import { useAllTeamMutation } from '../../store/features/team/teamApiSlice';
import { selectAllPOP, setPOP } from '../../store/features/pop/popSlice';
import { selectAllTeam, setTeam } from '../../store/features/team/teamSlice';
import { updateBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import { useGetProfileMutation } from '../../store/features/auth/authApiSlice';
import PreviewProfile from './PreviewProfile';

function Profile() {
  const dispatch = useDispatch();
  const [form, setForm] = useState(false);
  const [profile, setProfile] = useState(null);

  const [,setCurrentRole] = useState(null);
  const [,setCurrentPop] = useState(null);

  const { data: user } = useSelector(selectCurrentUser);
  const role = useSelector(selectAllTeam);
  const pop = useSelector(selectAllPOP);
  const [allPOP] = useAllPOPMutation();
  const [allTeam] = useAllTeamMutation();
  const [getProfile] = useGetProfileMutation();

  const doGetProfile = async () => {
    try {
      const data = await getProfile().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        setProfile(data.data);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const getAllPOP = async () => {
    try {
      const data = await allPOP().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setPOP({ ...data }));
        const index = pop?.data?.find((item) => item.id_pop === user.pop_id);
        setCurrentPop(index);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  const getAllTeam = async () => {
    try {
      const data = await allTeam().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        dispatch(setTeam({ ...data }));
        const index = role?.data?.find((item) => +item.id_role === +user?.role_id);
        setCurrentRole(index);
      } else {
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
    }
  };

  useEffect(() => {
    dispatch(updateBreadcrumb([{ path: '/profile', title: 'Profil' }]));
    getAllPOP();
    getAllTeam();
    doGetProfile();
  }, [form]);

  const handleUpdateProfile = (event) => {
    setForm(true);
  };

  const handleForm = (event) => {
    setForm(event);
  };

  return (
    <div>
      {form ? (
        <FormUpdateProfile handleForm={handleForm} profile={profile} />
      ) : (
        <PreviewProfile profile={profile} handleUpdateProfile={() => handleUpdateProfile()} />
      )}
    </div>
  );
}
export default Profile;
