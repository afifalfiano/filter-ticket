import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import HistoryDashboard from './pages/history_dashboard/HistoryDashboard';
import ReasonOfOutage from './pages/reason_of_outage/ReasonOfOutage';
import Report from './pages/report/Report';
import Profile from './pages/profile/Profile';
import BaseTransceiverStation from './pages/base_transceiver_station/BaseTransceiverStation';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reason_of_outage" element={<ReasonOfOutage />} />
        <Route path="/report" element={<Report />} />
        <Route path="/history_dashboard" element={<HistoryDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/base_transceiver_station"
          element={<BaseTransceiverStation />}
        />
      </Routes>
    </div>
  );
}

export default App;
