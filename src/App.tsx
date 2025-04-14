import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Home';
import LearnMore from './pages/PelajariLebihLanjut';
import Login from './pages/Login';
import LupaPassword from './components/Ui/LupaPassword';
import Register from './pages/Registrasi';
import StatusPengaduan from './pages/StatusPengaduan';
import TimCapstone from './pages/TimCapstone';
import FormPengaduan from './pages/FormPengaduan';
import Terms from './components/Home/Terms';
import Privasi from './components/Home/Privasi';
import AnimatedCursor from './components/Ui/Animated';
import Profile from './components/Home/Profile';
import ArticleListPage from './components/Home/ArticlesListPage';
import PelayananPage from './pages/Pelayanan';
import Bantuan from './pages/Bantuan';
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
          <Route path="/forgot-password" element={<LupaPassword />} />
          <Route path="/pengaduan" element={<FormPengaduan />} />
          <Route path="/register" element={<Register />} />
          <Route path="/status-pengaduan" element={<StatusPengaduan />} />
          <Route path="/team" element={<TimCapstone />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privasi />} />
          <Route path="/artikel" element={<ArticleListPage />} />
          <Route path="/pelayanan" element={<PelayananPage />} />
          <Route path="/bantuan" element={<Bantuan />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/laporan-korban" element={<LaporanKorban />} />
          <Route path="/tingkat-kekerasan" element={<TingkatKekerasan />} />
          <Route path="/manajemen-user" element={<UserManajemen />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
