import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  FileText,
  BarChart2,
  LogOut,
  LayoutDashboard,
  UserCheck,
  Home,
} from 'lucide-react';

interface User {
  id: number;
  email: string;
  role: string;
}

interface SidebarProps {
  onMenuClick?: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const [terbuka, setTerbuka] = useState(false);
  const [emailAdmin, setEmailAdmin] = useState<string>('');
  const [namaAdmin, setNamaAdmin] = useState<string>('Admin');
  const [tampilPesan, setTampilPesan] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Cek token dulu
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Coba ambil info user dari beberapa tempat yang mungkin
    const userDataString = localStorage.getItem('userData');
    const userInfoString = localStorage.getItem('userInfo');

    if (userDataString) {
      // Prioritas 1: Cek userData (seperti di komponen Pelayanan)
      try {
        const userData = JSON.parse(userDataString);
        setEmailAdmin(userData.email || '');

        // Ambil nama dari email (bagian sebelum @)
        if (userData.email && userData.email.includes('@')) {
          const bagianNama = userData.email.split('@')[0];
          // Huruf pertama kapital
          const namaKapital =
            bagianNama.charAt(0).toUpperCase() + bagianNama.slice(1);
          setNamaAdmin(namaKapital);
        } else if (userData.name) {
          // Kalau ada field nama langsung
          setNamaAdmin(userData.name);
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else if (userInfoString) {
      // Prioritas 2: Cek userInfo
      try {
        const user: User = JSON.parse(userInfoString);
        setEmailAdmin(user.email || '');

        // Ambil nama dari email (bagian sebelum @)
        if (user.email && user.email.includes('@')) {
          const bagianNama = user.email.split('@')[0];
          // Huruf pertama kapital
          const namaKapital =
            bagianNama.charAt(0).toUpperCase() + bagianNama.slice(1);
          setNamaAdmin(namaKapital);
        }
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    } else {
      // Prioritas 3: Coba email di localStorage
      const email = localStorage.getItem('email');
      if (email) {
        setEmailAdmin(email);
        if (email.includes('@')) {
          const bagianNama = email.split('@')[0];
          const namaKapital =
            bagianNama.charAt(0).toUpperCase() + bagianNama.slice(1);
          setNamaAdmin(namaKapital);
        }
      }
    }
  }, [navigate]);

  // Buka/tutup sidebar di mobile
  const bukaToggleSidebar = () => {
    setTerbuka(!terbuka);
  };

  // Fungsi ketika menu diklik
  const klikMenu = (path: string, nonaktif: boolean = false) => {
    if (nonaktif) {
      // Tampilkan pesan notifikasi alih-alih navigasi
      setTampilPesan(true);

      // Otomatis tutup pesan setelah 3 detik
      setTimeout(() => {
        setTampilPesan(false);
      }, 3000);

      return;
    }

    navigate(path);

    // Panggil onMenuClick kalau ada
    if (onMenuClick) {
      const menu = path.substring(1) || 'dashboard';
      onMenuClick(menu);
    }

    // Tutup sidebar di mobile setelah memilih menu
    if (window.innerWidth < 768) {
      setTerbuka(false);
    }
  };

  // Fungsi keluar/logout
  const keluarAplikasi = () => {
    // Bersihkan data autentikasi dari localStorage
    localStorage.clear();
    // Arahkan ke halaman login
    navigate('/login');
  };

  // Daftar menu sidebar
  const menuSidebar = [
    {
      icon: <Home className="mr-3" size={20} />,
      label: 'Beranda',
      path: '/',
      disabled: false,
    },
    {
      icon: <LayoutDashboard className="mr-3" size={20} />,
      label: 'Dashboard',
      path: '/dashboard',
      disabled: false,
    },
    {
      icon: <FileText className="mr-3" size={20} />,
      label: 'Laporan Korban',
      path: '/laporan-korban',
      disabled: false,
    },
    {
      icon: <BarChart2 className="mr-3" size={20} />,
      label: 'Laporan Tingkat Kekerasan',
      path: '/tingkat-kekerasan',
      disabled: true, // Fitur masih coming soon
    },
    {
      icon: <UserCheck className="mr-3" size={20} />,
      label: 'Manajemen Akun User',
      path: '/manajemen-user',
      disabled: false,
    },
  ];

  return (
    <>
      {/* Tombol Hamburger utk Mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 p-2 rounded-lg"
        onClick={bukaToggleSidebar}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>

      {/* Popup Notifikasi Fitur */}
      {tampilPesan && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black opacity-50"
            onClick={() => setTampilPesan(false)}
          ></div>
          <div className="bg-white rounded-lg p-6 shadow-xl z-10 max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Fitur Dalam Pengembangan
            </h3>
            <p className="text-gray-600 mb-6">
              Fitur "Laporan Tingkat Kekerasan" akan dikembangkan di masa depan.
              Silakan cek kembali nanti.
            </p>
            <button
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 w-full"
              onClick={() => setTampilPesan(false)}
            >
              Tutup
            </button>
          </div>
        </div>
      )}

      {/* Sidebar utama */}
      <div
        className={`
                fixed md:static inset-y-0 left-0 transform 
                ${terbuka ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                w-64 bg-purple-800 text-white 
                transition-transform duration-300 ease-in-out
                z-40 h-screen md:h-auto overflow-y-auto bg-gradient-moving bg-400 animate-gradient-move
            `}
      >
        <div className="p-6">
          {/* Profil admin */}
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} className="text-purple-300" />
          </div>
          <h2 className="text-lg font-semibold text-center">{namaAdmin}</h2>
          <p className="text-purple-200 text-sm text-center truncate">
            {emailAdmin}
          </p>

          {/* Menu navigasi */}
          <nav className="mt-8 space-y-2">
            {menuSidebar.map((item) => (
              <button
                key={item.path}
                className={`
                  w-full flex items-center px-4 py-2 rounded 
                  ${
                    location.pathname === item.path ||
                    (item.path === '/' && location.pathname === '/dashboard') ||
                    (item.path === '/dashboard' && location.pathname === '/')
                      ? 'bg-purple-600'
                      : 'hover:bg-purple-700'
                  }
                  ${item.disabled ? 'opacity-70 cursor-help' : ''}
                `}
                onClick={() => klikMenu(item.path, item.disabled)}
              >
                {item.icon}
                {item.label}
                {item.disabled && (
                  <span className="ml-2 text-xs bg-yellow-500 text-black px-1 rounded">
                    Segera
                  </span>
                )}
              </button>
            ))}

            {/* Tombol logout */}
            <div className="border-t border-purple-700 mt-4 pt-4">
              <button
                className="w-full flex items-center px-4 py-2 rounded hover:bg-red-600 text-red-300 hover:text-white"
                onClick={keluarAplikasi}
              >
                <LogOut className="mr-3" size={20} />
                Keluar
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay untuk mobile */}
      {terbuka && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={bukaToggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
