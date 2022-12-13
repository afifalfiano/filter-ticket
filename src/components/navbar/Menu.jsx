/* eslint-disable operator-linebreak */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { decryptLocalStorage } from '../../utils/helper';
// import { selectCurrentUser } from '../../store/features/auth/authSlice';

// eslint-disable-next-line react/prop-types
function Menu() {
  // const { data: user } = useSelector(selectCurrentUser);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = decryptLocalStorage('user_encrypt');
    setUser(data);
  }, []);
  return (
    <div className="flex-1">
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/dashboard"
        activeclassname="btn-active"
      >
        CCO
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          window.location.pathname === '/dashboard' && 'btn-active'
        }`}
        to="/dashboard"
        activeclassname="btn-active"
      >
        Dasbor
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          window.location.pathname === '/reason_of_outage' && 'btn-active'
        }`}
        to="/reason_of_outage"
        activeclassname="btn-active"
      >
        Reason of Outage
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          window.location.pathname === '/report' && 'btn-active'
        }`}
        to="/report"
        activeclassname="btn-active"
      >
        Laporan
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          window.location.pathname === '/history_dashboard' && 'btn-active'
        }`}
        to="/history_dashboard"
        activeclassname="btn-active"
      >
        Riwayat Dasbor
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          window.location.pathname === '/statistics' && 'btn-active'
        }`}
        to="/statistics"
        activeclassname="btn-active"
      >
        Statistik
      </Link>

      {/* if admin */}
      {user?.role_id === 0 && (
        <div className="dropdown">
          <label
            tabIndex={0}
            className={`btn m-1 capitalize ${
              (window.location.pathname === '/base_transceiver_station' &&
                'btn-active') ||
              (window.location.pathname === '/users' && 'btn-active') ||
              (window.location.pathname === '/pop' && 'btn-active') ||
              (window.location.pathname === '/source_complain' &&
                'btn-active') ||
              (window.location.pathname === '/role' && 'btn-active') ||
              (window.location.pathname === '/shift' && 'btn-active')
            }
            `}
          >
            Pengaturan
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 "
          >
            <li>
              <Link
                className="btn btn-ghost normal-case text-sm justify-start"
                to="/base_transceiver_station"
                activeclassname="btn-active"
              >
                BTS
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-ghost normal-case text-sm justify-start"
                to="/users"
                activeclassname="btn-active"
              >
                Pengguna
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-ghost normal-case text-sm justify-start"
                to="/pop"
                activeclassname="btn-active"
              >
                POP
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-ghost normal-case text-sm justify-start"
                to="/source_complain"
                activeclassname="btn-active"
              >
                Sumber Keluhan
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-ghost normal-case text-sm justify-start"
                to="/role"
                activeclassname="btn-active"
              >
                Otoritas
              </Link>
            </li>
            <li>
              <Link
                className="btn btn-ghost normal-case text-sm justify-start"
                to="/shift"
                activeclassname="btn-active"
              >
                Shift
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Menu;
