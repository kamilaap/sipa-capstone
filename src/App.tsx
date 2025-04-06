import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home';
import LearnMore from './pages/About';
import Login from './pages/Login';
import ForgotPassword from './pages/LupaPassword';
import Register from './pages/Registrasi';
import StatusPengaduan from './pages/StatusPengaduan';
import TeamPage from './pages/TimCapstone';
import FormPengaduan from './pages/FormPengaduan';
import Terms from './components/Home/Terms';
import Privacy from './components/Home/Privacy';
import AnimatedCursor from './components/Ui/Animated';
import ArticleListPage from './components/Home/ArticlesListPage';
import PelayananPage from './pages/Pelayanan';
import HalamanBantuan from './pages/Bantuan';
import Dashboard from './pages/AdminDashboard';
import LaporanKorban from './components/Ui/LaporanKorban';
import TingkatKekerasan from './components/Ui/TingkatKekerasan';
import UserManajemen from './components/Ui/UserManajemen';

const App: React.FC = () => {
  return (
    <Router>
      <AnimatedCursor />
      <div className="cursor-none">
        {' '}
        {/* This will hide the default cursor */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/pengaduan" element={<FormPengaduan />} />
          <Route path="/register" element={<Register />} />
          <Route path="/status-pengaduan" element={<StatusPengaduan />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />

          <Route path="/artikel" element={<ArticleListPage />} />
          <Route path="/pelayanan" element={<PelayananPage />} />
          <Route path="/bantuan" element={<HalamanBantuan />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan-korban" element={<LaporanKorban />} />
          <Route path="/tingkat-kekerasan" element={<TingkatKekerasan />} />
          <Route path="/manajemen-user" element={<UserManajemen />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
