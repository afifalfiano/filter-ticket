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
import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
import NotFound from './pages/not_found/NotFound';


import 'react-loading-skeleton/dist/skeleton.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useState } from 'react';
// end auth

const Dashboard = loadable(() => import ('./pages/dashboard/Dashboard'));
const ReasonOfOutage = loadable(() => import('./pages/reason_of_outage/ReasonOfOutage'));
const Report = loadable(() => import('./pages/report/Report'));
const Profile = loadable(() => import('./pages/profile/Profile'));
const BaseTransceiverStation = loadable(() => import('./pages/settings/base_transceiver_station/BaseTransceiverStation'));
const HistoryDashboard = loadable(() => import('./pages/history_dashboard/HistoryDashboard'));
const DashboardDetail = loadable(() => import('./pages/dashboard/detail/DashboardDetail'));
const RFODetailMass = loadable(() => import('./pages/reason_of_outage/detail_masal/RFODetailMass'));
const RFODetailSingle = loadable(() => import('./pages/reason_of_outage/detail_mandiri/RFODetailSingle'));
const DashboardRFOSingle = loadable(() => import('./pages/dashboard/rfo_single/DashboardRFOSingle'));
const Statistics = loadable(() => import('./pages/statistics/Statistics'));
const Users = loadable(() => import('./pages/settings/users/Users'));
const Pop = loadable(() => import('./pages/settings/pop/Pop'));
const SourceComplain = loadable(() => import('./pages/settings/source_complain/SourceComplain'));
const Role = loadable(() => import('./pages/settings/role/Role'));
const ReportCreate = loadable(() => import('./pages/report/create/ReportCreate'));
const ReportDetail = loadable(() => import('./pages/report/detail/ReportDetail'));
const Shift = loadable(() => import('./pages/settings/shift/Shift'));
const ReasonForOutageTrouble = loadable(() => import('./pages/reason_for_outage_trouble/ReasonForOutageTrouble'));

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
          <Route path="reason_of_outage_gangguan" element={<ReasonForOutageTrouble />} />
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
