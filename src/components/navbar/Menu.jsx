import { Link } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
function Menu({ handleBreadcrumb }) {
  return (
    <div className="flex-1">
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/dashboard"
        activeClassName="btn-active"
        onClick={handleBreadcrumb}
      >
        Filtering Ticket
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/dashboard"
        activeClassName="btn-active"
        onClick={handleBreadcrumb}
      >
        Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/reason_of_outage"
        activeClassName="btn-active"
        onClick={handleBreadcrumb}
      >
        Reason of Outage
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/report"
        activeClassName="btn-active"
        onClick={handleBreadcrumb}
      >
        Laporan
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/history_dashboard"
        activeClassName="btn-active"
        onClick={handleBreadcrumb}
      >
        Riwayat Dasbor
      </Link>
      <Link
        className="btn btn-ghost normal-case text-sm"
        to="/base_transceiver_station"
        activeClassName="btn-active"
        onClick={handleBreadcrumb}
      >
        BTS
      </Link>
    </div>
  );
}

export default Menu;
