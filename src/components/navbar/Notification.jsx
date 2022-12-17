import { useEffect, useRef } from 'react';
import { HiOutlineBell } from 'react-icons/hi';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux';
import * as PusherPushNotifications from '@pusher/push-notifications-web';
import ModalNotification from './ModalNotification';
import {
  selectAllNotification,
  selectTotalCountNotification,
} from '../../store/features/notification/notificationSlice';
import NotificationSound from "../../notification-sound.mp3";

function Notification() {
  const getNotif = useSelector(selectAllNotification)
  const totalNotif = useSelector(selectTotalCountNotification);
  const audioPlayer = useRef(null);

  const playAudio = () => {
    audioPlayer.current.play();
  }


  useEffect(() => {
    const pusher = new Pusher(process.env?.REACT_APP_PUSHER_APP_KEY, {
      cluster: process.env?.REACT_APP_PUSHER_APP_CLUSTER,
      encrypted: true,
    });
    Pusher.logToConsole = true;
    const channel = pusher.subscribe('my-channel');
    channel.bind('KeluhanEvent', (data) => {
      console.log(data, 'broadcast');
      playAudio();
    });

    const beamsClient = new PusherPushNotifications.Client({
    instanceId: process.env?.REACT_APP_PUSHER_APP_INSTANCEID_BEAM,
    });

    beamsClient.start()
    .then((beamsClient) => beamsClient.getDeviceId())
    .then((deviceId) =>
      console.log("Successfully registered with Beams. Device ID:", deviceId)
    )
    .then(() => beamsClient.addDeviceInterest("update"))
    .then(() => beamsClient.getDeviceInterests())
    .then((interests) => console.log(interests, 'interest'))
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
      <audio ref={audioPlayer} src={NotificationSound} />
    </div>
  );
}

export default Notification;
