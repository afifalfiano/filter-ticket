/* eslint-disable */
import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useGetProfileMutation, useLogoutMutation } from '../../store/features/auth/authApiSlice';
import { selectCurrentUser, setLogOut } from '../../store/features/auth/authSlice';
import { clearBTS } from '../../store/features/bts/btsSlice';
import { clearComplain } from '../../store/features/complain/complainSlice';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';

const DropdownMenu = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
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

  useEffect(() => {
    doGetProfile();
  }, [])
  

  let { data: user } = useSelector(selectCurrentUser);
  console.log(user, 'usr');
  // eslint-disable-next-line no-unused-vars
  const [logout] = useLogoutMutation();

  const onLogout = async (e) => {
    e.preventDefault();

    try {
      const userLogout = await logout().unwrap();
      console.log(userLogout, 'lg');
      if (userLogout?.status === 'success') {
        dispatch((action) => {
          action(setLogOut());
          action(clearBTS());
          action(clearComplain());
        });
        localStorage.clear();
        navigate('/sign_in', {replace: true});
      } else {
        toast.error(userData?.data?.message || 'Terjadi Kesalahan', {
          style: {
            padding: '16px',
            backgroundColor: '#ff492d',
            color: 'white',
          },
          duration: 2000,
          position: 'top-right',
          id: 'error',
          icon: false,
        });
      }

    } catch (err) {
      toast.error(userData?.data?.message || 'Terjadi Kesalahan', {
        style: {
          padding: '16px',
          backgroundColor: '#ff492d',
          color: 'white',
        },
        duration: 2000,
        position: 'top-right',
        id: 'error',
        icon: false,
      });
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