import { Link } from 'react-router-dom';
import ModalNotification from './ModalNotification';
import DropdownMenu from './DropdownMenu';
/* eslint-disable */
const  Navbar = () => {
  return (
    <div className="navbar bg-neutral text-neutral-content ">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-base" to="/">
          Filtering Ticket
        </Link>
        <Link className="btn btn-ghost normal-case text-base" to="dashboard">
          Dasbor
        </Link>
        <Link className="btn btn-ghost normal-case text-base" to="reason_of_outage">
          Reason of Outage
        </Link>
        <Link className="btn btn-ghost normal-case text-base" to="report">
          Laporan
        </Link>
        <Link className="btn btn-ghost normal-case text-base" to="history_dashboard">
          Riwayat Dasbor
        </Link>
        <Link className="btn btn-ghost normal-case text-base" to="base_transceiver_station">
          BTS
        </Link>
      </div>

      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="indicator-item badge badge-sm badge-secondary">8</span>
            </div>
          </label>

        <ModalNotification />
        </div>
        <DropdownMenu />
      </div>
    </div>
  );
}
export default Navbar;
