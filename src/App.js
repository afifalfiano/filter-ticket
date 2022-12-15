/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import SignIn from './pages/auth/sign_in/SignIn';
import SignUp from './pages/auth/sign_up/SignUp';
import Dashboard from './pages/dashboard/Dashboard';
import ReasonOfOutage from './pages/reason_of_outage/ReasonOfOutage';
import Report from './pages/report/Report';
import HistoryDashboard from './pages/history_dashboard/HistoryDashboard';
import Profile from './pages/profile/Profile';
import BaseTransceiverStation from './pages/settings/base_transceiver_station/BaseTransceiverStation';
import VerificationEmail from './pages/auth/verification_email/VerificationEmail';
import VerificationSuccess from './pages/auth/verification_success/VerificationSuccess';
import DashboardDetail from './pages/dashboard/detail/DashboardDetail';
import RFODetailMass from './pages/reason_of_outage/detail_masal/RFODetailMass';
import RFODetailSingle from './pages/reason_of_outage/detail_mandiri/RFODetailSingle';
import DashboardRFOSingle from './pages/dashboard/rfo_single/DashboardRFOSingle';
import Statistics from './pages/statistics/Statistics';
import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import 'react-loading-skeleton/dist/skeleton.css';
import NotFound from './pages/not_found/NotFound';
import Users from './pages/settings/users/Users';
import Pop from './pages/settings/pop/Pop';
import SourceComplain from './pages/settings/source_complain/SourceComplain';
import Role from './pages/settings/role/Role';
import ReportCreate from './pages/report/create/ReportCreate';
import ReportDetail from './pages/report/detail/ReportDetail';
import Shift from './pages/settings/shift/Shift';
import ForgetPassword from './pages/auth/forget_password/ForgetPassword';
import { useState } from 'react';

function App() {
  const [render, setRender] = useState(true);

  const getConditionRender = (event) => {
    console.log(event, 'loggg');
    setRender(event);
  };

  return (
    <div className="App">
      <Toaster />
      <Routes>
        <Route element={<Layout render={getConditionRender} />}>
          {/* public routes */}
          <Route index element={<SignIn />} />
          <Route path="sign_in" element={render && <SignIn />} />
          <Route path="sign_up" element={render && <SignUp />} />
          <Route
            path="verification_email"
            element={render && <VerificationEmail />}
          />
          <Route
            path="verification"
            element={render && <VerificationSuccess />}
          />
          <Route
            path="forget_password"
            element={render && <ForgetPassword />}
          />
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
          <Route path="report/create" element={<ReportCreate />} />
          <Route path="report/detail/:id" element={<ReportDetail />} />
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

          {/* for admin */}
          <Route path="users" element={<Users />} />
          <Route path="pop" element={<Pop />} />
          <Route path="source_complain" element={<SourceComplain />} />
          <Route path="role" element={<Role />} />
          <Route path="shift" element={<Shift />} />
          {/* end admin */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
