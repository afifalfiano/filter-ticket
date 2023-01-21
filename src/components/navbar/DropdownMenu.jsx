import { useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import { useGetProfileMutation, useLogoutMutation } from '../../store/features/auth/authApiSlice';
import { setLogOut, subscribeChangeProfile } from '../../store/features/auth/authSlice';
import { clearBTS } from '../../store/features/bts/btsSlice';
import { clearComplain } from '../../store/features/complain/complainSlice';
import { useEffect, useState } from 'react';
import catchError from '../../services/catchError';
import { clearComplainHistory } from '../../store/features/complain_history/complainHistorySlice';
import { clearModal } from '../../store/features/modal/modalSlice';
import { clearNotification } from '../../store/features/notification/notificationSlice';
import { clearPOP } from '../../store/features/pop/popSlice';
import { clearReport } from '../../store/features/report/reportSlice';
import { clearRFO } from '../../store/features/rfo/rfoSlice';
import { clearShift } from '../../store/features/shift/shiftSlice';
import { clearSumberKeluhan } from '../../store/features/sumber_keluhan/sumberKeluhanSlice';
import { clearTeam } from '../../store/features/team/teamSlice';
import { clearUsers } from '../../store/features/users/usersSlice';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import InfoUser from './InfoUser';
import { usubscribeBeamAndLogout } from '../../utils/push_notification';

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
        catchError(data, true);
      }
    } catch (error) {
      catchError(error, true);
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
          action(clearComplainHistory());
          action(clearModal());
          action(clearNotification());
          action(clearPOP());
          action(clearReport());
          action(clearRFO());
          action(clearShift());
          action(clearSumberKeluhan());
          action(clearTeam());
          action(clearUsers());
        });

        usubscribeBeamAndLogout()
        navigate('/sign_in', {replace: true});
      } else {
        catchError(userLogout, true);
      }

    } catch (error) {
      catchError(error, true);
    }

  }
  return (
    <>
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
              <span className="text-2xl">
              <img fetchpriority="high" src={profile?.avatar} alt={profile?.name} width={'100%'} height={'100%'} />
              </span>
            </div>
        </label>
        <div
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral rounded-box w-52"
        >
        <InfoUser mobile={true} />
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