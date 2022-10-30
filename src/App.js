/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/sign_in/SignIn';
import SignUp from './pages/sign_up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import ReasonOfOutage from './pages/reason_of_outage/ReasonOfOutage';
import Report from './pages/report/Report';
import HistoryDashboard from './pages/history_dashboard/HistoryDashboard';
import Profile from './pages/profile/Profile';
import BaseTransceiverStation from './pages/base_transceiver_station/BaseTransceiverStation';
import VerificationEmail from './pages/verification_email/VerificationEmail';
import DashboardDetail from './pages/dashboard/detail/DashboardDetail';
import RFODetailMass from './pages/reason_of_outage/detail_masal/RFODetailMass';
import RFODetailSingle from './pages/reason_of_outage/detail_mandiri/RFODetailSingle';
import DashboardRFOSingle from './pages/dashboard/rfo_single/DashboardRFOSingle';
import Statistics from './pages/statistics/Statistics';
import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import 'react-loading-skeleton/dist/skeleton.css';
import NotFound from './pages/not_found/NotFound';

function App() {
  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route element={<Layout />}>
          {/* public routes */}
          <Route index element={<SignIn />} />
          <Route path="sign_in" element={<SignIn />} />
          <Route path="sign_up" element={<SignUp />} />
          <Route path="verification_email" element={<VerificationEmail />} />
        </Route>
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="dashboard/detail/:id" element={<DashboardDetail />} />
          <Route
            path="dashboard/rfo_single/:id"
            element={<DashboardRFOSingle />}
          />
          <Route path="reason_of_outage" element={<ReasonOfOutage />} />
          <Route
            path="reason_of_outage/detail_masal/:id"
            element={<RFODetailMass />}
          />
          <Route
            path="reason_of_outage/detail_single/:id"
            element={<RFODetailSingle />}
          />
          <Route path="report" element={<Report />} />
          <Route path="history_dashboard" element={<HistoryDashboard />} />
          <Route
            path="history_dashboard/detail/:id"
            element={<DashboardDetail />}
          />
          <Route
            path="history_dashboard/rfo_single/:id"
            element={<DashboardRFOSingle />}
          />
          <Route path="profile" element={<Profile />} />
          <Route
            path="base_transceiver_station"
            element={<BaseTransceiverStation />}
          />
          <Route path="statistics" element={<Statistics />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
