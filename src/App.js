/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';

// auth
import SignIn from './pages/auth/sign_in/SignIn';
import SignUp from './pages/auth/sign_up/SignUp';
import VerificationEmail from './pages/auth/verification_email/VerificationEmail';
import VerificationSuccess from './pages/auth/verification_success/VerificationSuccess';
import ForgetPassword from './pages/auth/forget_password/ForgetPassword';
import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import NotFound from './pages/not_found/NotFound';


import 'react-loading-skeleton/dist/skeleton.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
// end auth

const Dashboard = lazy(() => import ('./pages/dashboard/Dashboard'));
const ReasonOfOutage = lazy(() => import('./pages/reason_of_outage/ReasonOfOutage'));
const Report = lazy(() => import('./pages/report/Report'));
const Profile = lazy(() => import('./pages/profile/Profile'));
const BaseTransceiverStation = lazy(() => import('./pages/settings/base_transceiver_station/BaseTransceiverStation'));
const HistoryDashboard = lazy(() => import('./pages/history_dashboard/HistoryDashboard'));
const DashboardDetail = lazy(() => import('./pages/dashboard/detail/DashboardDetail'));
const RFODetailMass = lazy(() => import('./pages/reason_of_outage/detail_masal/RFODetailMass'));
const RFODetailSingle = lazy(() => import('./pages/reason_of_outage/detail_mandiri/RFODetailSingle'));
const DashboardRFOSingle = lazy(() => import('./pages/dashboard/rfo_single/DashboardRFOSingle'));
const Statistics = lazy(() => import('./pages/statistics/Statistics'));
const Users = lazy(() => import('./pages/settings/users/Users'));
const Pop = lazy(() => import('./pages/settings/pop/Pop'));
const SourceComplain = lazy(() => import('./pages/settings/source_complain/SourceComplain'));
const Role = lazy(() => import('./pages/settings/role/Role'));
const ReportCreate = lazy(() => import('./pages/report/create/ReportCreate'));
const ReportDetail = lazy(() => import('./pages/report/detail/ReportDetail'));
const Shift = lazy(() => import('./pages/settings/shift/Shift'));

function App() {
  const [render, setRender] = useState(true);

  const getConditionRender = (event) => {
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
          <Route
            path="history_dashboard/rfo_masal/:id"
            element={<RFODetailMass />}
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
