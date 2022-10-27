/* eslint-disable no-unused-vars */
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCurrentUser } from '../../store/features/auth/authSlice';

// eslint-disable-next-line react/prop-types
function Menu() {
  const { data: user } = useSelector(selectCurrentUser);
  return (
    <div className="flex-1">
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/dashboard"
        activeclassname="btn-active"
      >
        Filtering Ticket
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/dashboard"
        activeclassname="btn-active"
      >
        Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/reason_of_outage"
        activeclassname="btn-active"
      >
        Reason of Outage
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/report"
        activeclassname="btn-active"
      >
        Laporan
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/history_dashboard"
        activeclassname="btn-active"
      >
        Riwayat Dasbor
      </Link>
      {user.role_id === 1 && (
        <>
          <Link
            className="btn btn-ghost normal-case text-sm"
            to="/base_transceiver_station"
            activeclassname="btn-active"
          >
            BTS
          </Link>
          <Link
            className="btn btn-ghost normal-case text-sm"
            to="/statistics"
            activeclassname="btn-active"
          >
            Statistik
          </Link>
        </>
      )}
    </div>
  );
}

export default Menu;
