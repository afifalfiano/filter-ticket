import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';
import SignIn from './pages/sign_in/SignIn';
import SignUp from './pages/sign_up/SignUp';
import NotFound from './pages/not_found/NotFound';
import Navbar from './components/navbar/Navbar';
import Dashboard from './pages/dashboard/Dashboard';
import ReasonOfOutage from './pages/reason_of_outage/ReasonOfOutage';
import Report from './pages/report/Report';
import HistoryDashboard from './pages/history_dashboard/HistoryDashboard';
import Profile from './pages/profile/Profile';
import BaseTransceiverStation from './pages/base_transceiver_station/BaseTransceiverStation';
import Container from './components/common/Container';
import VerificationEmail from './pages/verification_email/VerificationEmail';

function App() {
  const [login, isLogin] = useState(false);

  const navigate = useNavigate();

  const getAuth = () => {
    console.log('renderer');
    const user = localStorage.getItem('user');
    console.log(user, 'usr');
    if (user) {
      isLogin(true);
    } else {
      isLogin(false);
      navigate('/', { replace: true });
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <div className="App">
      {login && <Navbar />}
      <Routes>
        {login ? (
          <Container>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reason_of_outage" element={<ReasonOfOutage />} />
            <Route path="/report" element={<Report />} />
            <Route path="/history_dashboard" element={<HistoryDashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/base_transceiver_station"
              element={<BaseTransceiverStation />}
            />
            <Route path="*" element={<NotFound />} />
          </Container>
        ) : (
          <>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign_in" element={<SignIn />} />
            <Route path="/sign_up" element={<SignUp />} />
            <Route path="/verification_email" element={<VerificationEmail />} />
          </>
        )}
      </Routes>
    </div>
  );
}

export default App;
