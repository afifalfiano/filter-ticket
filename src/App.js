/* eslint-disable import/order */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Toaster } from 'react-hot-toast';
import loadable from '@loadable/component'

// auth
import SignIn from './pages/auth/sign_in/SignIn';
import SignUp from './pages/auth/sign_up/SignUp';
import VerificationEmail from './pages/auth/verification_email/VerificationEmail';
import VerificationSuccess from './pages/auth/verification_success/VerificationSuccess';
import ForgetPassword from './pages/auth/forget_password/ForgetPassword';
import Layout from './components/Common/Layout';
import RequireAuth from './components/Common/RequireAuth';
import NotFound from './pages/not_found/NotFound';


import 'react-loading-skeleton/dist/skeleton.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
// end auth

import Dashboard from './pages/dashboard/Dashboard';
import DashboardDetail from './pages/dashboard/detail/DashboardDetail';
import ReasonOfOutage from './pages/reason_of_outage/ReasonOfOutage';
import Report from './pages/report/Report';
import Profile from './pages/profile/Profile';
import BaseTransceiverStation from './pages/settings/base_transceiver_station/BaseTransceiverStation';
import HistoryDashboard from './pages/history_dashboard/HistoryDashboard';
import RFODetailMass from './pages/reason_for_outage_trouble/detail_masal/RFODetailMass';
import RFODetailSingle from './pages/reason_of_outage/detail_mandiri/RFODetailSingle';
import DashboardRFOSingle from './pages/dashboard/rfo_single/DashboardRFOSingle';
import Statistics from './pages/statistics/Statistics';
import Users from './pages/settings/users/Users';
import Pop from './pages/settings/pop/Pop';
import SourceComplain from './pages/settings/source_complain/SourceComplain';
import Role from './pages/settings/role/Role';
import ReportCreate from './pages/report/create/ReportCreate';
import ReportDetail from './pages/report/detail/ReportDetail';
import Shift from './pages/settings/shift/Shift';
import ReasonForOutageTrouble from './pages/reason_for_outage_trouble/ReasonForOutageTrouble';

// lazy load component
// const Dashboard = React.lazy(() => import ('./pages/dashboard/Dashboard'));
// const ReasonOfOutage = React.lazy(() => import('./pages/reason_of_outage/ReasonOfOutage'));
// const Report = React.lazy(() => import('./pages/report/Report'));
// const Profile = React.lazy(() => import('./pages/profile/Profile'));
// const BaseTransceiverStation = React.lazy(() => import('./pages/settings/base_transceiver_station/BaseTransceiverStation'));
// const HistoryDashboard = React.lazy(() => import('./pages/history_dashboard/HistoryDashboard'));
// const DashboardDetail = React.lazy(() => import('./pages/dashboard/detail/DashboardDetail'));
// const RFODetailMass = React.lazy(() => import('./pages/reason_for_outage_trouble/detail_masal/RFODetailMass'));
// const RFODetailSingle = React.lazy(() => import('./pages/reason_of_outage/detail_mandiri/RFODetailSingle'));
// const DashboardRFOSingle = React.lazy(() => import('./pages/dashboard/rfo_single/DashboardRFOSingle'));
// const Statistics = React.lazy(() => import('./pages/statistics/Statistics'));
// const Users = React.lazy(() => import('./pages/settings/users/Users'));
// const Pop = React.lazy(() => import('./pages/settings/pop/Pop'));
// const SourceComplain = React.lazy(() => import('./pages/settings/source_complain/SourceComplain'));
// const Role = React.lazy(() => import('./pages/settings/role/Role'));
// const ReportCreate = React.lazy(() => import('./pages/report/create/ReportCreate'));
// const ReportDetail = React.lazy(() => import('./pages/report/detail/ReportDetail'));
// const Shift = React.lazy(() => import('./pages/settings/shift/Shift'));
// const ReasonForOutageTrouble = React.lazy(() => import('./pages/reason_for_outage_trouble/ReasonForOutageTrouble'));

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
        <Route path="*" element={render && <NotFound />} />
        {/* protected routes */}
        <Route element={<RequireAuth />}>
          <Route index element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/detail/:id" element={<DashboardDetail />} />
          <Route
            path="dashboard/rfo_single/:id"
            element={<DashboardRFOSingle />}
          />
          <Route path="/reason_of_outage" element={<ReasonOfOutage />} />
          <Route path="/reason_of_outage_gangguan" element={<ReasonForOutageTrouble />} />
          <Route
            path="/reason_of_outage/detail_masal/:id"
            element={<RFODetailMass />}
          />
          <Route
            path="/reason_of_outage/detail_single/:id"
            element={<RFODetailSingle />}
          />
          <Route path="/report" element={<Report />} />
          <Route path="/report/create" element={<ReportCreate />} />
          <Route path="/report/detail/:id" element={<ReportDetail />} />
          <Route path="/history_dashboard" element={<HistoryDashboard />} />
          <Route
            path="/history_dashboard/detail/:id"
            element={<DashboardDetail />}
          />
          <Route
            path="/history_dashboard/rfo_single/:id"
            element={<DashboardRFOSingle />}
          />
          <Route
            path="/history_dashboard/rfo_masal/:id"
            element={<RFODetailMass />}
          />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/base_transceiver_station"
            element={<BaseTransceiverStation />}
          />
          <Route path="/statistics" element={<Statistics />} />

          {/* for admin */}
          <Route path="/users" element={<Users />} />
          <Route path="/pop" element={<Pop />} />
          <Route path="/source_complain" element={<SourceComplain />} />
          <Route path="/role" element={<Role />} />
          <Route path="/shift" element={<Shift />} />
          {/* end admin */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
