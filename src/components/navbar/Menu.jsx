import { Link } from 'react-router-dom';

function Menu() {
  return (
    <div className="flex-1">
      <Link className="btn btn-ghost normal-case text-base" to="/">
        Filtering Ticket
      </Link>
      <Link className="btn btn-ghost normal-case text-base" to="dashboard">
        Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-base"
        to="reason_of_outage"
      >
        Reason of Outage
      </Link>
      <Link className="btn btn-ghost normal-case text-base" to="report">
        Laporan
      </Link>
      <Link
        className="btn btn-ghost normal-case text-base"
        to="history_dashboard"
      >
        Riwayat Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-base"
        to="base_transceiver_station"
      >
        BTS
      </Link>
    </div>
  );
}

export default Menu;
