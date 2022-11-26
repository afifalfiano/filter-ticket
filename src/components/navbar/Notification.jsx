import { useEffect } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import Pusher from 'pusher-js';
import { useDispatch, useSelector } from 'react-redux';
import ModalNotification from './ModalNotification';
import {
  selectAllNotification,
  // eslint-disable-next-line no-unused-vars
  setNotification,
} from '../../store/features/notification/notificationSlice';

/* eslint-disable */
function Notification() {

  const getNotif = useSelector(selectAllNotification)
  const dispatch = useDispatch();

  console.log(getNotif.data, 'notif');
  useEffect(() => {
    const pusher = new Pusher('2ed546b20ddc434a9b6a', {
      cluster: 'ap1',
      encrypted: true,
    });
    Pusher.logToConsole = true;
    const dataLocal = [];
    const channel = pusher.subscribe('my-channel');
    channel.bind('KeluhanEvent', (data) => {
      console.log(data, 'websocket');
      dataLocal.push(data.message);
      console.log(dataLocal, 'data local');
      dispatch(setNotification({data: dataLocal}));
    });
  }, []);
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <HiOutlineBell size="24" />
          {getNotif.data.length > 0 && <span className="indicator-item badge badge-sm badge-accent">
            {getNotif.data.length}
          </span>
          }
        </div>
      </label>
      <ModalNotification data={getNotif.data}/>
    </div>
  );
}

export default Notification;
