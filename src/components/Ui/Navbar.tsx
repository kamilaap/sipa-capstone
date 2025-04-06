import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from './Button'; // Assuming you have a custom Button component
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

// Define interface for emergency contacts
interface EmergencyContact {
  name: string;
  number: string;
  icon: React.ReactNode;
}

// Define props for MobileNavItem
interface MobileNavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

const Navbar: React.FC = () => {
  // State variables
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  // Refs for handling outside clicks
  const emergencyDropdownRef = useRef<HTMLDivElement>(null);
  const emergencyButtonRef = useRef<HTMLButtonElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const userButtonRef = useRef<HTMLButtonElement>(null);

  // Get current location
  const location = useLocation();

  // Emergency contacts
  const emergencyContacts: EmergencyContact[] = [
    {
      name: 'Polisi',
      number: '110',
      icon: <FaShieldAlt className="text-blue-600" />,
    },
    {
      name: 'Ambulans',
      number: '118',
      icon: <FaHospital className="text-red-600" />,
    },
    {
      name: 'Hotline Pengaduan Kekerasan',
      number: '0800-123-456',
      icon: <FaHandsHelping className="text-purple-600" />,
    },
    {
      name: 'Pusat Layanan Terpadu',
      number: '0800-987-654',
      icon: <FaPhoneAlt className="text-green-600" />,
    },
  ];

  // Check login status on component mount and when location changes
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const name = localStorage.getItem('userName');

    setIsLoggedIn(!!token);
    setUserRole(role);
    setUserName(name);
  }, [location]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside dropdown menus
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close emergency dropdown
      if (
        emergencyDropdownRef.current &&
        !emergencyDropdownRef.current.contains(event.target as Node) &&
        emergencyButtonRef.current &&
        !emergencyButtonRef.current.contains(event.target as Node)
      ) {
        setIsEmergencyOpen(false);
      }

      // Close user menu
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if current page is home page
  const isHomePage = (): boolean => {
    return location.pathname === '/';
  };

  // Handle articles section scrolling or navigation
  const handleArticlesClick = (): void => {
    if (isHomePage()) {
      const articlesSection = document.getElementById('articles-section');
      if (articlesSection) {
        articlesSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  // Logout handler
  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userName');

    setIsLoggedIn(false);
    setUserRole(null);
    setUserName(null);

    // Redirect to home or login page
    window.location.href = '/';
  };

  // Mobile Menu Navigation Item
  const MobileNavItem: React.FC<MobileNavItemProps> = ({
    to,
    icon,
    label,
    onClick,
  }) => {
    const handleClick = (): void => {
      setIsMobileMenuOpen(false);
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
      {/* Emergency Contact Floating Button */}
      <div
        className="fixed right-0 top-1/3 transform -translate-y-1/2 z-50"
        ref={emergencyDropdownRef}
      >
        <button
          ref={emergencyButtonRef}
          onClick={() => setIsEmergencyOpen(!isEmergencyOpen)}
          className="group flex items-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white font-medium transition-all duration-300 shadow-md rounded-l-md border-r-0"
          style={{
            minHeight: '45px',
            boxShadow: '0 3px 10px rgba(220, 38, 38, 0.3)',
            animation: 'subtle-pulse 3s infinite',
          }}
          aria-label="Emergency Contact"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="relative">
              <FaPhoneAlt className="text-lg" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full animate-ping"></span>
            </div>
            <span className="mt-1 text-xs font-bold">DARURAT</span>
          </div>
        </button>

        {/* Emergency Dropdown */}
        {isEmergencyOpen && (
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
              {emergencyContacts.map((contact, index) => (
                <a
                  key={index}
                  href={`tel:${contact.number.replace(/-/g, '')}`}
                  className="flex items-center px-3 py-2 hover:bg-red-50 transition-colors"
                >
                  <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full mr-2">
                    {contact.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-800 text-sm">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-600">
                      {contact.number}
                    </div>
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

      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${isScrolled ? 'py-3 bg-white/95 shadow-md backdrop-blur-md' : 'py-6 bg-transparent'}`}
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
          {/* Desktop Menu */}
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
            <Link
              to={isHomePage() ? '#articles-section' : '/artikel'}
              onClick={handleArticlesClick}
              className="text-gray-700 font-medium hover:text-[#8B5CF6] transition-colors relative group"
            >
              Artikel
            </Link>
          </div>

          {/* Desktop Login/Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/status-pengaduan">
              <Button variant="outline" size="sm">
                Status Pengaduan
              </Button>
            </Link>

            {isLoggedIn ? (
              <div className="relative">
                <button
                  ref={userButtonRef}
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 bg-[#8B5CF6]/10 rounded-full hover:bg-[#8B5CF6]/20 transition-colors"
                >
                  <FaUser className="text-[#8B5CF6] text-lg" />
                </button>

                {isUserMenuOpen && (
                  <div
                    ref={userMenuRef}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 text-sm text-gray-700">
                      {userRole === 'admin' ? 'Admin' : userName || 'Pengguna'}
                    </div>

                    {userRole === 'admin' && (
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}

                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      Profil Saya
                    </Link>

                    <button
                      onClick={handleLogout}
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

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              className="text-gray-700 focus:outline-none"
              onClick={(): void => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <FaBars className="w-6 h-6" />
            </button>
          </div>

          {/* Mobile Menu - Slide-in Drawer Design */}
          {isMobileMenuOpen && (
            <div className="fixed inset-0 bg-white z-50">
              {/* Mobile Menu Header */}
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
                      {isLoggedIn
                        ? `Selamat datang, ${userRole === 'admin' ? 'Admin' : userName || 'Pengguna'}`
                        : 'Sistem Informasi Perlindungan Anak'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(): void => setIsMobileMenuOpen(false)}
                  className="focus:outline-none"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Menu Navigation */}
              <div className="p-4 space-y-2">
                <MobileNavItem
                  to="/"
                  icon={<FaHome className="text-[#8B5CF6] w-5 h-5" />}
                  label="Beranda"
                />
                <MobileNavItem
                  to="/pelayanan"
                  icon={<FaClipboardList className="text-[#8B5CF6] w-5 h-5" />}
                  label="Pelayanan"
                />
                <MobileNavItem
                  to="/pengaduan"
                  icon={<FaNewspaper className="text-[#8B5CF6] w-5 h-5" />}
                  label="Pengaduan"
                />
                <MobileNavItem
                  to={isHomePage() ? '#articles-section' : '/artikel'}
                  icon={<FaNewspaper className="text-[#8B5CF6] w-5 h-5" />}
                  label="Artikel"
                  onClick={handleArticlesClick}
                />
                <MobileNavItem
                  to="/status-pengaduan"
                  icon={<FaCog className="text-[#8B5CF6] w-5 h-5" />}
                  label="Status Pengaduan"
                />
              </div>

              {/* Mobile User Action Buttons */}
              <div className="p-4 border-t border-gray-100">
                {isLoggedIn ? (
                  <div className="space-y-2">
                    {userRole === 'admin' && (
                      <MobileNavItem
                        to="/dashboard"
                        icon={<FaCog className="text-[#8B5CF6] w-5 h-5" />}
                        label="Dashboard"
                      />
                    )}
                    <MobileNavItem
                      to="/profile"
                      icon={<FaUser className="text-[#8B5CF6] w-5 h-5" />}
                      label="Profil Saya"
                    />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <FaTimes className="w-5 h-5" />
                      <span className="font-medium">Keluar</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <MobileNavItem
                      to="/register"
                      icon={<FaUserPlus className="text-[#8B5CF6] w-5 h-5" />}
                      label="Registrasi"
                    />
                    <MobileNavItem
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

      {/* Styling for Animations */}
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
