/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useGetProfileMutation, useLogoutMutation } from '../../store/features/auth/authApiSlice';
import { setLogOut, subscribeChangeProfile } from '../../store/features/auth/authSlice';
import { clearBTS } from '../../store/features/bts/btsSlice';
import { clearComplain } from '../../store/features/complain/complainSlice';
import { useEffect, useState } from 'react';
import catchError from '../../services/catchError';

const DropdownMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [getProfile] = useGetProfileMutation();

  const infoProfile = useSelector(subscribeChangeProfile);

  const doGetProfile = async () => {
    try {
      const data = await getProfile().unwrap();
      if (data.status === 'success' || data.status === 'Success') {
        setProfile(data.data);
      } else {
        catchError(data);
      }
    } catch (error) {
      catchError(error);
    }
  };

  useEffect(() => {
    doGetProfile();
  }, [infoProfile])
  

  const [logout] = useLogoutMutation();

  const onLogout = async (e) => {
    try {
      const userLogout = await logout().unwrap();
      if (userLogout?.status === 'success' || userLogout?.status === 'Success') {
        dispatch((action) => {
          action(setLogOut());
          action(clearBTS());
          action(clearComplain());
        });
        localStorage.clear();
        navigate('/sign_in', {replace: true});
      } else {
        catchError(userLogout);
      }

    } catch (err) {
      catchError(error);
    }

  }
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
              <span className="text-2xl">
              <img src={profile?.avatar} alt={profile?.name} />
              </span>
            </div>
        </label>
        <div
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52"
        >
        <Link className="btn justify-start  btn-ghost normal-case text-sm" to="profile">
          Profile
        </Link>
        <div className="btn justify-start btn-ghost normal-case text-sm" onClick={onLogout}>
        Keluar
        </div>
        </div>

      </div>
    </>
  )
}


export default DropdownMenu;