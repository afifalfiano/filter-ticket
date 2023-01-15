import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { decryptLocalStorage } from '../../utils/helper';

function Menu() {
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
          (window.location.pathname === '/dashboard' || window.location.pathname.includes('/dashboard/detail') ||  window.location.pathname.includes('/dashboard/rfo_single')) && 'btn-active'
        }`}
        to="/dashboard"
        activeclassname="btn-active"
      >
        Dasbor
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          (window.location.pathname === '/reason_of_outage' || window.location.pathname.includes('/reason_of_outage/detail_single') || window.location.pathname.includes('/reason_of_outage/detail_masal')) && 'btn-active'
        }`}
        to="/reason_of_outage"
        activeclassname="btn-active"
      >
        Reason For Outage
      </Link>
        {/* <div className="dropdown">
          <label
            tabIndex={0}
            className={`btn m-1 capitalize ${
              (window.location.pathname === '/reason_of_outage' && 'btn-active') ||
              (window.location.pathname.includes('/reason_of_outage_keluhan') && 'btn-active') || 
              (window.location.pathname.includes('/reason_of_outage_gangguan') && 'btn-active') || 
              (window.location.pathname.includes('/reason_of_outage/detail_single') && 'btn-active') || 
              (window.location.pathname.includes('/reason_of_outage/detail_masal') && 'btn-active')
            }
            `}
          >
              Reason For Outage
          </label>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-neutral rounded-box w-52 "
          >
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/reason_of_outage/detail_single' &&'btn-active')}`}
                to="/reason_of_outage_keluhan"
                activeclassname="btn-active"
              >
                RFO Keluhan
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/reason_of_outage/detail_masal' &&'btn-active')}`}
                to="/reason_of_outage_gangguan"
                activeclassname="btn-active"
              >
                RFO Gangguan
              </Link>
            </li>
          </ul>
        </div> */}
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          (window.location.pathname === '/report' || window.location.pathname.includes('/report/create')) && 'btn-active'
        }`}
        to="/report"
        activeclassname="btn-active"
      >
        Laporan
      </Link>
      <Link
        className={`btn btn-ghost normal-case text-sm ${
          (window.location.pathname === '/history_dashboard' || window.location.pathname.includes('/history_dashboard/detail') || window.location.pathname.includes('/history_dashboard/rfo_single') || window.location.pathname.includes('/history_dashboard/rfo_masal')) && 'btn-active'
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
      {user?.role_id !== 0 && 
      (<Link
        className={`btn btn-ghost normal-case text-sm ${
          window.location.pathname === '/base_transceiver_station' && 'btn-active'
        }`}
        to="/base_transceiver_station"
        activeclassname="btn-active"
      >
        Base Transceiver Station
      </Link>)
      }
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
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/base_transceiver_station' &&'btn-active')}`}
                to="/base_transceiver_station"
                activeclassname="btn-active"
              >
                Base Transceiver Station
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/users' &&'btn-active')}`}
                to="/users"
                activeclassname="btn-active"
              >
                Pengguna
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/pop' &&'btn-active')}`}
                to="/pop"
                activeclassname="btn-active"
              >
                POP (Area Operasional)
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/source_complain' &&'btn-active')}`}
                to="/source_complain"
                activeclassname="btn-active"
              >
                Sumber Keluhan
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/role' &&'btn-active')}`}
                to="/role"
                activeclassname="btn-active"
              >
                Otoritas
              </Link>
            </li>
            <li>
              <Link
                className={`btn btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/shift' &&'btn-active')}`}
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
