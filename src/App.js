/* eslint-disable no-unused-vars */
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignIn from './pages/sign_in/SignIn';
import SignUp from './pages/sign_up/SignUp';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ReasonOfOutage from './pages/reason_of_outage/ReasonOfOutage';
import Report from './pages/report/Report';
import HistoryDashboard from './pages/history_dashboard/HistoryDashboard';
import Profile from './pages/profile/Profile';
import BaseTransceiverStation from './pages/base_transceiver_station/BaseTransceiverStation';
import Container from './components/common/Container';
import VerificationEmail from './pages/verification_email/VerificationEmail';
import DashboardDetail from './pages/dashboard/detail/DashboardDetail';
import RFODetailMass from './pages/reason_of_outage/detail_masal/RFODetailMass';
import RFODetailSingle from './pages/reason_of_outage/detail_mandiri/RFODetailSingle';
import DashboardRFOSingle from './pages/dashboard/rfo_single/DashboardRFOSingle';
import {
  selectCurrentUser,
  setCredentials,
} from './store/features/auth/authSlice';
import Statistics from './pages/statistics/Statistics';
import Layout from './components/common/Layout';
import RequireAuth from './components/common/RequireAuth';
// eslint-disable-next-line import/no-unresolved
// import 'node_modules/leaflet-geosearch/dist/geosearch.css';

function App() {
  let { data } = useSelector(selectCurrentUser);
  console.log(data, 'dattt');
  const dispatch = useDispatch();

  const checkUserLocalStorage = () => {
    const local = localStorage.getItem('user');
    const user = JSON.parse(local);
    if (user) {
      dispatch(setCredentials({ ...user }));
      data = user;
    }
    console.log(data, 'dat');
  };

  useEffect(() => {
    checkUserLocalStorage();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
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
            path="/dashboard/rfo_single/:id"
            element={<DashboardRFOSingle />}
          />
          <Route path="/reason_of_outage" element={<ReasonOfOutage />} />
          <Route
            path="/reason_of_outage/detail_masal/:id"
            element={<RFODetailMass />}
          />
          <Route
            path="/reason_of_outage/detail_single/:id"
            element={<RFODetailSingle />}
          />
          <Route path="/report" element={<Report />} />
          <Route path="/history_dashboard" element={<HistoryDashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/base_transceiver_station"
            element={<BaseTransceiverStation />}
          />
          <Route path="/statistics" element={<Statistics />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
