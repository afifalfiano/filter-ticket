import { HiOutlineBell } from 'react-icons/hi';
import ModalNotification from './ModalNotification';

/* eslint-disable */
function Notification() {
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        <div className="indicator">
          <HiOutlineBell size="20" />
          <span className="indicator-item badge badge-sm badge-secondary">
            3
          </span>
        </div>
      </label>
      <ModalNotification />
    </div>
  );
}

export default Notification;
