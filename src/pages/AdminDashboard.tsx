import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Sidebar from '../components/Ui/SideBar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';

// Define interfaces
interface ReportData {
  id: number;
  tanggal: string;
  status_pengaduan: {
    status: string;
  };
}

interface MonthlyReportStats {
  bulan: string;
  jumlah: number;
}

interface User {
  id: number;
  email: string;
  role: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState<string>('Admin');
  const [reportStats, setReportStats] = useState<MonthlyReportStats[]>([]);
  const [activeMenu, setActiveMenu] = useState<string>('laporan');

  // Function to handle menu click from Sidebar
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
    // Additional logic if needed when menu changes
  };

  // Function to process reports and group by month
  const processReportStats = (reports: ReportData[]): MonthlyReportStats[] => {
    // Create a map to store monthly report counts
    const monthReports = new Map<string, number>();

    // Process each report
    reports.forEach((report) => {
      // Convert the date to a Date object
      const reportDate = new Date(report.tanggal);

      // Format month as "MMM YYYY" (e.g., "Mar 2025")
      const monthKey = reportDate.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });

      // Increment the count for this month
      monthReports.set(monthKey, (monthReports.get(monthKey) || 0) + 1);
    });

    // Convert map to array of MonthlyReportStats
    return Array.from(monthReports, ([bulan, jumlah]) => ({
      bulan,
      jumlah,
    })).sort((a, b) => {
      // Sort chronologically
      const dateA = new Date(a.bulan);
      const dateB = new Date(b.bulan);
      return dateA.getTime() - dateB.getTime();
    });
  };

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Retrieve user information from localStorage
    const userInfoString = localStorage.getItem('userInfo');
    if (userInfoString) {
      try {
        const user: User = JSON.parse(userInfoString);
        // Use the part before @ as the name, or full email if no @ found
        const displayName = user.email.includes('@')
          ? user.email.split('@')[0]
          : user.email;
        setAdminName(displayName);
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    }

    // Fetch report statistics
    const fetchReportStats = async () => {
      try {
        const response = await axios.get<ReportData[]>(
          'https://api-sipa-capstone-production.up.railway.app/data-pengaduan',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Process and set report statistics
        const processedStats = processReportStats(response.data);
        setReportStats(processedStats);
      } catch (error) {
        console.error('Error fetching report statistics:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
      }
    };

    fetchReportStats();
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onMenuClick={handleMenuClick} />

      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Selamat Datang, {adminName}
          </h1>
          <p className="text-gray-600 mt-2">
            Dashboard Pusat Informasi Perlindungan Anak
          </p>
        </div>

        {/* Conditionally render content based on activeMenu */}
        {activeMenu === 'laporan' && (
          <>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Statistik Laporan Masuk
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={reportStats}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="bulan" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="jumlah" fill="#8884d8" name="Jumlah Laporan" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/laporan-korban"
                className="bg-white rounded-xl shadow-lg p-6 hover:bg-gray-50 transition flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Laporan Korban
                </h3>
                <p className="text-gray-600 text-center">
                  Lihat dan kelola laporan yang masuk
                </p>
              </Link>

              <Link
                to="/tingkat-kekerasan"
                className="bg-white rounded-xl shadow-lg p-6 hover:bg-gray-50 transition flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Tingkat Kekerasan
                </h3>
                <p className="text-gray-600 text-center">
                  Analisis dan dokumentasi tingkat kekerasan
                </p>
              </Link>

              <Link
                to="/manajemen-user"
                className="bg-white rounded-xl shadow-lg p-6 hover:bg-gray-50 transition flex flex-col items-center"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Manajemen User
                </h3>
                <p className="text-gray-600 text-center">
                  Kelola pengguna dan hak akses
                </p>
              </Link>
            </div>
          </>
        )}

        {/* Add conditional rendering for other menu items */}
        {activeMenu === 'tingkat' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Laporan Tingkat Kekerasan
            </h2>
            <p className="text-gray-600">
              Detail laporan tingkat kekerasan akan ditampilkan di sini.
            </p>
            {/* Add more details or components as needed */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
