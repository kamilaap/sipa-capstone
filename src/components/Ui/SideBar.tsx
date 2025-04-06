import React, { useState, useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, BarChart2, LogOut, LayoutDashboard } from 'lucide-react';

interface User {
  id: number;
  email: string;
  role: string;
}

interface SidebarProps {
  onMenuClick?: (menu: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>('admin@gmail.com');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve user information from localStorage
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      try {
        const user: User = JSON.parse(userInfoString);
        setAdminEmail(user.email);
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);

    // Trigger onMenuClick if provided
    if (onMenuClick) {
      const menu = path.substring(1); // Remove leading slash
      onMenuClick(menu);
    }

    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  const handleLogout = () => {
    // Clear authentication-related items from localStorage
    localStorage.clear();
    // Redirect to login page
    navigate('/');
  };

  const menuItems = [
    {
      icon: <LayoutDashboard className="mr-3" size={20} />,
      label: 'Dashboard',
      path: '/dashboard',
    },
    {
      icon: <FileText className="mr-3" size={20} />,
      label: 'Laporan Korban',
      path: '/laporan-korban',
    },
    {
      icon: <BarChart2 className="mr-3" size={20} />,
      label: 'Laporan Tingkat Kekerasan',
      path: '/tingkat-kekerasan',
    },
  ];

  return (
    <>
      {/* Mobile Hamburger Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-purple-600 p-2 rounded-lg"
        onClick={toggleSidebar}
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

      <div
        className={`
                fixed md:static inset-y-0 left-0 transform 
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                md:translate-x-0
                w-64 bg-purple-800 text-white 
                transition-transform duration-300 ease-in-out
                z-40 h-screen md:h-auto overflow-y-auto
            `}
      >
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} className="text-purple-300" />
          </div>
          <h2 className="text-lg font-semibold text-center">Admin</h2>
          <p className="text-purple-200 text-sm text-center truncate">
            {adminEmail}
          </p>

          <nav className="mt-8 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.path}
                className={`
                                    w-full flex items-center px-4 py-2 rounded 
                                    ${location.pathname === item.path ? 'bg-purple-600' : 'hover:bg-purple-700'}
                                `}
                onClick={() => handleMenuClick(item.path)}
              >
                {item.icon}
                {item.label}
              </button>
            ))}

            <div className="border-t border-purple-700 mt-4 pt-4">
              <button
                className="w-full flex items-center px-4 py-2 rounded hover:bg-red-600 text-red-300 hover:text-white"
                onClick={handleLogout}
              >
                <LogOut className="mr-3" size={20} />
                Keluar
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
