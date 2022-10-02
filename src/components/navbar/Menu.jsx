import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Menu({ handleBreadcrumb }) {
  return (
    <div className="flex-1">
      <Link
        className="btn btn-ghost normal-case text-sm active"
        to="/dashboard"
        onClick={handleBreadcrumb}
      >
        Filtering Ticket
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/dashboard"
        onClick={handleBreadcrumb}
      >
        Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/reason_of_outage"
        onClick={handleBreadcrumb}
      >
        Reason of Outage
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/report"
        onClick={handleBreadcrumb}
      >
        Laporan
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/history_dashboard"
        onClick={handleBreadcrumb}
      >
        Riwayat Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/base_transceiver_station"
        onClick={handleBreadcrumb}
      >
        BTS
      </Link>
    </div>
  );
}

export default Menu;
