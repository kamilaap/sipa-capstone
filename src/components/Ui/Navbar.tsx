import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button'; 
import {
  FaPhoneAlt,
  FaHospital,
  FaShieldAlt,
  FaHandsHelping,
  FaUserPlus,
  FaExclamationTriangle,
  FaUser,
  FaBars,
  FaTimes,
  FaHome,
  FaClipboardList,
  FaNewspaper,
  FaCog,
} from 'react-icons/fa';

// Tipe data untuk kontak darurat
// TODO: tipe nya taro disini
interface KontakDarurat {
  nama: string;
  nomor: string;
  icon: React.ReactNode;
}

// Props untuk item navigasi mobile
interface ItemNavMobileProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  // State vars
  const [udahScroll, setUdahScroll] = useState(false);
  const [menuMobileKebuka, setMenuMobileKebuka] = useState(false);
  const [menuDaruratKebuka, setMenuDaruratKebuka] = useState(false);
  const [menuUserKebuka, setMenuUserKebuka] = useState(false);
  const [udahLogin, setUdahLogin] = useState(false);
  const [roleUser, setRoleUser] = useState<string | null>(null);
  const [namaUser, setNamaUser] = useState<string | null>(null);

  // Refs buat deteksi klik diluar dropdown
  // Harusnya bisa pake useClickOutside hook sih, tapi belum sempet bikin
  const refDropdownDarurat = useRef<HTMLDivElement>(null);
  const refButtonDarurat = useRef<HTMLButtonElement>(null);
  const refMenuUser = useRef<HTMLDivElement>(null);
  const refButtonUser = useRef<HTMLButtonElement>(null);

  // Get current location
  const lokasi = useLocation();

  // List kontak penting - data dummy dulu
  const kontakDarurat: KontakDarurat[] = [
    {
      nama: 'Polisi',
      nomor: '110',
      icon: <FaShieldAlt className="text-blue-600" />,
    },
    {
      nama: 'Ambulans',
      nomor: '118',
      icon: <FaHospital className="text-red-600" />,
    },
    {
      nama: 'Hotline Pengaduan Kekerasan KPAI', // tambah kontak KPAI nanti
      nomor: '0811-1002-7727',
      icon: <FaHandsHelping className="text-purple-600" />,
    },
    {
      nama: 'Pusat Layanan Terpadu',
      nomor: '0800-987-654',
      icon: <FaPhoneAlt className="text-green-600" />,
    },
  ];

  // Cek status login saat komponen mount & lokasi berubah
  useEffect(() => {
    // Ambil dari localStorage (sementara, nanti pake context)
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const nama = localStorage.getItem('userName');

    setUdahLogin(!!token);
    setRoleUser(role);
    setNamaUser(nama);
  }, [lokasi]);

  // Handle efek scroll
  useEffect(() => {
    // Fungsi ini ngedeteksi scroll buat styling navbar
    const handleScroll = () => {
      setUdahScroll(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup dropdown kalo klik diluar
  // Buatnya agak ribet, nanti coba pake custom hook aja
  useEffect(() => {
    const tutupDropdownKaloClickDiluar = (event: MouseEvent) => {
      // Tutup dropdown darurat
      if (
        refDropdownDarurat.current &&
        !refDropdownDarurat.current.contains(event.target as Node) &&
        refButtonDarurat.current &&
        !refButtonDarurat.current.contains(event.target as Node)
      ) {
        setMenuDaruratKebuka(false);
      }

      // Tutup menu user
      if (
        refMenuUser.current &&
        !refMenuUser.current.contains(event.target as Node) &&
        refButtonUser.current &&
        !refButtonUser.current.contains(event.target as Node)
      ) {
        setMenuUserKebuka(false);
      }
    };

    document.addEventListener('mousedown', tutupDropdownKaloClickDiluar);
    return () =>
      document.removeEventListener('mousedown', tutupDropdownKaloClickDiluar);
  }, []);

  // Cek apakah lagi di homepage
  const cekHomePage = (): boolean => {
    return lokasi.pathname === '/';
  };

  // Handle klik section artikel (scroll ke bawah kalo di homepage)
  const klikSectionArtikel = (): void => {
    if (cekHomePage()) {
      // Scroll otomatis kalo di home page - Updated to use "bagian-artikel" ID
      const sectionArtikel = document.getElementById('bagian-artikel');
      if (sectionArtikel) {
        sectionArtikel.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setMenuMobileKebuka(false);
  };

  // Fungsi logout - nanti ditambahin konfirmasi + toast
  const keluarAplikasi = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');

    // Reset state
    setUdahLogin(false);
    setRoleUser(null);
    setNamaUser(null);

    // Redirect ke home (nanti pake navigate dari useNavigate)
    window.location.href = '/';
  };

  // Komponen NavItem buat mobile - reusable biar gak repetitif
  const ItemNavMobile: React.FC<ItemNavMobileProps> = ({
    to,
    icon,
    label,
    onClick,
  }) => {
    const handleClick = (): void => {
      setMenuMobileKebuka(false);
      if (onClick) {
        onClick();
      }
    };

    return (
      <Link
        to={to}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#8B5CF6]/10 transition-colors"
        onClick={handleClick}
      >
        {icon}
        <span className="text-gray-800 font-medium">{label}</span>
      </Link>
    );
  };

  return (
    <>
      {/* Tombol Kontak Darurat */}
      <div
        className="fixed right-0 top-1/3 transform -translate-y-1/2 z-50"
        ref={refDropdownDarurat}
      >
        <button
          ref={refButtonDarurat}
          onClick={() => setMenuDaruratKebuka(!menuDaruratKebuka)}
          className="group flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 shadow-md rounded-l-md border-r-0"
          style={{
            minHeight: '45px',
            boxShadow: '0 3px 10px rgba(220, 38, 38, 0.3)',
            animation: 'subtle-pulse 3s infinite',
          }}
          aria-label="Kontak Darurat"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <FaPhoneAlt className="text-lg" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <span className="mt-1 text-xs font-bold">DARURAT</span>
          </div>
        </button>

        {/* Dropdown Darurat */}
        {menuDaruratKebuka && (
          <div
            className="absolute right-0 top-full w-64 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn overflow-hidden mt-2"
            style={{
              boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto',
            }}
          >
            <div className="px-3 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white">
              <div className="flex items-center">
                <FaExclamationTriangle className="text-yellow-300 mr-2 text-base" />
                <h3 className="font-bold text-sm">Kontak Darurat</h3>
              </div>
              <p className="text-xs text-red-100">
                Pilih nomor untuk menghubungi
              </p>
            </div>

            <div className="py-1">
              {kontakDarurat.map((kontak, index) => (
                <a
                  key={index}
                  href={`tel:${kontak.nomor.replace(/-/g, '')}`}
                  className="flex items-center px-3 py-2 hover:bg-red-50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                    {kontak.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {kontak.nama}
                    </div>
                    <div className="text-xs text-gray-600">{kontak.nomor}</div>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center bg-green-100 rounded-full hover:bg-green-200 transition-colors">
                    <FaPhoneAlt className="text-green-600 text-xs" />
                  </div>
                </a>
              ))}
            </div>

            <div className="px-3 py-1 bg-gray-50 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                Layanan darurat 24/7
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${udahScroll ? 'py-3 bg-white/95 shadow-md backdrop-blur-md' : 'py-6 bg-transparent'}`}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/logo.png"
              alt="SIPA Logo"
              className="w-12 h-12 mr-2"
            />
          </Link>
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/pelayanan"
              className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group"
            >
              Pelayanan
            </Link>
            <Link
              to="/pengaduan"
              className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group"
            >
              Pengaduan
            </Link>
            {/* ini buat diarahin ke artikel saat di home */}
            {cekHomePage() ? (
              <a
                href="#bagian-artikel"
                onClick={(e) => {
                  e.preventDefault();
                  klikSectionArtikel();
                }}
                className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group"
              >
                Artikel
              </a>
            ) : (
              <Link
                to="/artikel"
                className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group"
              >
                Artikel
              </Link>
            )}
          </div>

          {/* Tombol Login/Profile */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/status-pengaduan">
              <Button variant="outline" size="sm">
                Status Pengaduan
              </Button>
            </Link>

            {udahLogin ? (
              <div className="relative">
                <button
                  ref={refButtonUser}
                  onClick={() => setMenuUserKebuka(!menuUserKebuka)}
                  className="flex items-center justify-center w-10 h-10 bg-[#8B5CF6]/10 rounded-full hover:bg-[#8B5CF6]/20 transition-colors"
                >
                  <FaUser className="text-[#8B5CF6] text-lg" />
                </button>

                {menuUserKebuka && (
                  <div
                    ref={refMenuUser}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-700">
                      {roleUser === 'admin' ? 'Admin' : namaUser || 'Pengguna'}
                    </div>

                    {roleUser === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setMenuUserKebuka(false)}
                      >
                        Dashboard
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setMenuUserKebuka(false)}
                    >
                      Profil Saya
                    </Link>

                    <button
                      onClick={keluarAplikasi}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50"
                    >
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/register">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                  >
                    <FaUserPlus className="mr-2" />
                    Registrasi
                  </Button>
                </Link>
                <Link to="/login">
                  <Button variant="primary" size="sm">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Toggle Menu Mobile */}
          <div className="md:hidden">
            <button
              className="text-gray-700 focus:outline-none"
              onClick={(): void => setMenuMobileKebuka(!menuMobileKebuka)}
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>

          {/* Menu Mobile - Slide-in */}
          {menuMobileKebuka && (
            <div className="fixed inset-0 bg-white z-50">
              {/* Header Menu Mobile */}
              <div className="bg-[#8B5CF6] text-white p-6 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img
                    src="/assets/logo.png"
                    alt="SIPA Logo"
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h2 className="font-bold text-lg">SIPA</h2>
                    <p className="text-xs text-[#8B5CF6]-100">
                      {udahLogin
                        ? `Selamat datang, ${roleUser === 'admin' ? 'Admin' : namaUser || 'Pengguna'}`
                        : 'Sistem Informasi Perlindungan Anak'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(): void => setMenuMobileKebuka(false)}
                  className="focus:outline-none"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Navigasi Mobile */}
              <div className="p-4 space-y-2">
                <ItemNavMobile
                  to="/"
                  icon={<FaHome className="text-[#8B5CF6] w-5 h-5" />}
                  label="Beranda"
                />
                <ItemNavMobile
                  to="/pelayanan"
                  icon={<FaClipboardList className="text-[#8B5CF6] w-5 h-5" />}
                  label="Pelayanan"
                />
                <ItemNavMobile
                  to="/pengaduan"
                  icon={<FaNewspaper className="text-[#8B5CF6] w-5 h-5" />}
                  label="Pengaduan"
                />
                {/* Updated mobile nav for article section */}
                {cekHomePage() ? (
                  <div
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-[#8B5CF6]/10 transition-colors cursor-pointer"
                    onClick={() => {
                      klikSectionArtikel();
                    }}
                  >
                    <FaNewspaper className="text-[#8B5CF6] w-5 h-5" />
                    <span className="text-gray-800 font-medium">Artikel</span>
                  </div>
                ) : (
                  <ItemNavMobile
                    to="/artikel"
                    icon={<FaNewspaper className="text-[#8B5CF6] w-5 h-5" />}
                    label="Artikel"
                  />
                )}
                <ItemNavMobile
                  to="/status-pengaduan"
                  icon={<FaCog className="text-[#8B5CF6] w-5 h-5" />}
                  label="Status Pengaduan"
                />
              </div>

              {/* Tombol Aksi User Mobile */}
              <div className="p-4 border-t border-gray-100">
                {udahLogin ? (
                  <div className="space-y-2">
                    {roleUser === 'admin' && (
                      <ItemNavMobile
                        to="/dashboard"
                        icon={<FaCog className="text-[#8B5CF6] w-5 h-5" />}
                        label="Dashboard"
                      />
                    )}
                    <ItemNavMobile
                      to="/profile"
                      icon={<FaUser className="text-[#8B5CF6] w-5 h-5" />}
                      label="Profil Saya"
                    />
                    <button
                      onClick={keluarAplikasi}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                      <span className="font-medium">Keluar</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <ItemNavMobile
                      to="/register"
                      icon={<FaUserPlus className="text-[#8B5CF6] w-5 h-5" />}
                      label="Registrasi"
                    />
                    <ItemNavMobile
                      to="/login"
                      icon={<FaUser className="text-[#8B5CF6] w-5 h-5" />}
                      label="Login"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Styling untuk Animasi */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out forwards;
          }
          @keyframes subtle-pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.03); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
