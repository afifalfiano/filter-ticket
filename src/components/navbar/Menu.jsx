import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="flex-1">
      <Link className="btn btn-ghost normal-case text-sm" to="/dashboard">
        Filtering Ticket
      </Link>
      <Link className="btn btn-ghost normal-case text-sm" to="/dashboard">
        Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/reason_of_outage"
      >
        Reason of Outage
      </Link>
      <Link className="btn btn-ghost normal-case text-sm" to="/report">
        Laporan
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/history_dashboard"
      >
        Riwayat Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/base_transceiver_station"
      >
        BTS
      </Link>
    </div>
  );
}

export default Menu;
