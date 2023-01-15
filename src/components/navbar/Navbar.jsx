import { useState } from 'react';
import { useSelector } from 'react-redux';
import DropdownMenu from './DropdownMenu';
import Menu from './Menu';
import Notification from './Notification';
import Breadcrumb from '../breadcrumb/Breadcrumb';
import { selectBreadcrumb } from '../../store/features/breadcrumb/breadcrumbSlice';
import InfoUser from './InfoUser';
import { Link } from 'react-router-dom';
import { decryptLocalStorage } from '../../utils/helper';
import { useEffect } from 'react';

/* eslint-disable */
const Navbar = () => {

  const [breadcrumb, setBreadcrumb] = useState([{ path: '/dashboard', title: 'Dasbor' }]);

  const navigasi = useSelector(selectBreadcrumb)
  const [user, setUser] = useState(null);
  useEffect(() => {
    const data = decryptLocalStorage('user_encrypt');
    setUser(data);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div className="navbar bg-neutral text-neutral-content fixed z-50 hidden lg:flex">
        <Menu user={user} />
        <div className="flex-none">
          <Notification />
          <InfoUser />
          <DropdownMenu />
        </div>
      </div>

      {/* Mobile */}
      <div className="navbar bg-neutral text-neutral-content fixed z-50 flex lg:hidden w-full">
        <div className="navbar-start w-full">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-neutral text-neutral-content rounded-box w-40">
              <li>
                <Link
                  className={`btn justify-start btn-ghost normal-case font-normal text-sm ${(window.location.pathname === '/dashboard' || window.location.pathname.includes('/dashboard/detail') || window.location.pathname.includes('/dashboard/rfo_single')) && 'btn-active'
                    }`}
                  to="/dashboard"
                  activeclassname="btn-active"
                >
                  Dasbor
                </Link>
              </li>
              <li tabIndex={0}>
                <a className={`btn capitalize font-normal justify-between ${(window.location.pathname === '/reason_of_outage' && 'btn-active') ||
                  (window.location.pathname.includes('/reason_of_outage_gangguan') && 'btn-active') ||
                  (window.location.pathname.includes('/reason_of_outage/detail_single') && 'btn-active') ||
                  (window.location.pathname.includes('/reason_of_outage/detail_masal') && 'btn-active')
                  }`}>
                  RFO
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                </a>
                <ul className="p-2 bg-neutral text-neutral-content">
                  <li>
                    <Link
                      className={`btn btn-ghost normal-case text-sm font-normal justify-start ${(window.location.pathname === '/reason_of_outage' && 'btn-active') || (window.location.pathname === '/reason_of_outage/detail_single' && 'btn-active')}`}
                      to="/reason_of_outage"
                      activeclassname="btn-active"
                    >
                      RFO Keluhan
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`btn btn-ghost normal-case font-normal text-sm justify-start ${(window.location.pathname === '/reason_of_outage_gangguan' && 'btn-active') || (window.location.pathname === '/reason_of_outage/detail_masal' && 'btn-active')}`}
                      to="/reason_of_outage_gangguan"
                      activeclassname="btn-active"
                    >
                      RFO Gangguan
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link
                  className={`btn justify-start font-normal btn-ghost normal-case text-sm ${(window.location.pathname === '/report' || window.location.pathname.includes('/report/create')) && 'btn-active'
                    }`}
                  to="/report"
                  activeclassname="btn-active"
                >
                  Laporan
                </Link>
              </li>
              <li>
                <Link
                  className={`btn btn-ghost normal-case justify-start font-normal text-sm ${(window.location.pathname === '/history_dashboard' || window.location.pathname.includes('/history_dashboard/detail') || window.location.pathname.includes('/history_dashboard/rfo_single') || window.location.pathname.includes('/history_dashboard/rfo_masal')) && 'btn-active'
                    }`}
                  to="/history_dashboard"
                  activeclassname="btn-active"
                >
                  Riwayat Dasbor
                </Link>
              </li>
              <li>
                <Link
                  className={`btn justify-start font-normal btn-ghost normal-case text-sm ${window.location.pathname === '/statistics' && 'btn-active'
                    }`}
                  to="/statistics"
                  activeclassname="btn-active"
                >
                  Statistik
                </Link>
              </li>

              {user?.role_id !== 0 &&
                (
                  <li>
                    <Link
                      className={`btn justify-start font-normal btn-ghost normal-case text-sm ${window.location.pathname === '/base_transceiver_station' && 'btn-active'
                        }`}
                      to="/base_transceiver_station"
                      activeclassname="btn-active"
                    >
                      BTS
                    </Link>
                  </li>
                )}

              <li tabIndex={0}>
                <a className={`btn capitalize font-normal justify-between ${(window.location.pathname === '/reason_of_outage' && 'btn-active') ||
                  (window.location.pathname === '/base_transceiver_station' &&
                    'btn-active') ||
                  (window.location.pathname === '/users' && 'btn-active') ||
                  (window.location.pathname === '/pop' && 'btn-active') ||
                  (window.location.pathname === '/source_complain' &&
                    'btn-active') ||
                  (window.location.pathname === '/role' && 'btn-active') ||
                  (window.location.pathname === '/shift' && 'btn-active')
                  }                  }`}>
                  Pengaturan
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z" /></svg>
                </a>
                <ul className="p-2 bg-neutral text-neutral-content">
                  <li>
                    <Link
                      className={`btn font-normal btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/base_transceiver_station' && 'btn-active')}`}
                      to="/base_transceiver_station"
                      activeclassname="btn-active"
                    >
                      BTS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`btn font-normal btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/users' && 'btn-active')}`}
                      to="/users"
                      activeclassname="btn-active"
                    >
                      Pengguna
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`btn font-normal btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/pop' && 'btn-active')}`}
                      to="/pop"
                      activeclassname="btn-active"
                    >
                      POP
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`btn font-normal btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/source_complain' && 'btn-active')}`}
                      to="/source_complain"
                      activeclassname="btn-active"
                    >
                      Sumber Keluhan
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`btn font-normal btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/role' && 'btn-active')}`}
                      to="/role"
                      activeclassname="btn-active"
                    >
                      Otoritas
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`btn font-normal btn-ghost normal-case text-sm justify-start ${(window.location.pathname === '/shift' && 'btn-active')}`}
                      to="/shift"
                      activeclassname="btn-active"
                    >
                      Shift
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
          <div className="flex justify-between w-full">
            <div className="btn btn-ghost normal-case text-xl">CCO</div>
            <div className="flex">
            <Notification />
            <DropdownMenu />
            </div>
        </div>
        </div>
      </div>
      <Breadcrumb breadcrumb={breadcrumb} />

    </>
  );
}
export default Navbar;
