import { useEffect } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import Pusher from 'pusher-js';
import { useDispatch, useSelector } from 'react-redux';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import ModalNotification from './ModalNotification';
import {
  selectAllNotification,
  selectTotalCountNotification,
  // eslint-disable-next-line no-unused-vars
  setNotification,
} from '../../store/features/notification/notificationSlice';

/* eslint-disable */
function Notification() {

  const getNotif = useSelector(selectAllNotification)
  const dispatch = useDispatch();
  const totalNotif = useSelector(selectTotalCountNotification);

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

    const beamsClient = new PusherPushNotifications.Client({
    instanceId: 'a81f4de8-8096-4cc9-a1d0-5c92138936f1',
    });

    beamsClient.start()
    .then((beamsClient) => beamsClient.getDeviceId())
    .then((deviceId) =>
      console.log("Successfully registered with Beams. Device ID:", deviceId)
    )
    .then(() => beamsClient.addDeviceInterest("update"))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log("Current interests:", interests))
  }, []);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <HiOutlineBell size="24" />
          <span className="indicator-item badge badge-sm badge-accent">
            {totalNotif}
          </span>
        </div>
      </label>
      <ModalNotification data={getNotif.data}/>
    </div>
  );
}

export default Notification;
