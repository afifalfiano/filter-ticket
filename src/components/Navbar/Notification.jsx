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
import catchError from '../../services/catchError';
import { startBeamClient } from '../../utils/push_notification';

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
    Pusher.logToConsole = false;
    const channel = pusher.subscribe('my-channel');
    channel.bind('KeluhanEvent', (data) => {
      playAudio();
    });
    startBeamClient()
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
