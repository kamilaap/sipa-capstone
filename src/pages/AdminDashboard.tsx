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

// Tipe data untuk laporan
interface ReportData {
  id: number;
  tanggal: string;
  status_pengaduan: {
    status: string;
  };
}

// Statistik bulanan untuk grafik
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
  const [activeMenu, setActiveMenu] = useState<string>('dashboard');
  // State untuk tampilan notifikasi fitur dalam pengembangan
  const [tampilNotifikasi, setTampilNotifikasi] = useState<boolean>(false);

  // Update menu aktif saat klik sidebar
  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  // Olah data laporan untuk dikelompokkan per bulan
  const olahDataLaporan = (reports: ReportData[]): MonthlyReportStats[] => {
    // Map untuk menyimpan jumlah laporan per bulan
    const laporanBulanan = new Map<string, number>();

    // Proses setiap laporan
    reports.forEach((laporan) => {
      // Konversi tanggal ke objek Date
      const tanggalLaporan = new Date(laporan.tanggal);

      // Format bulan sebagai "MMM YYYY" (misal "Mar 2025")
      const kunciBulan = tanggalLaporan.toLocaleString('default', {
        month: 'short',
        year: 'numeric',
      });

      // Tambahkan hitungan untuk bulan ini
      laporanBulanan.set(kunciBulan, (laporanBulanan.get(kunciBulan) || 0) + 1);
    });

    // Ubah map ke array untuk ditampilkan di grafik
    return Array.from(laporanBulanan, ([bulan, jumlah]) => ({
      bulan,
      jumlah,
    })).sort((a, b) => {
      // Urutkan kronologis
      const dateA = new Date(a.bulan);
      const dateB = new Date(b.bulan);
      return dateA.getTime() - dateB.getTime();
    });
  };

  useEffect(() => {
    // Cek autentikasi dulu
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // Ambil info user dari beberapa sumber yang mungkin
    const userDataString = localStorage.getItem('userData');
    const userInfoString = localStorage.getItem('userInfo');

    // Coba ambil nama user dengan prioritas seperti di Sidebar
    if (userDataString) {
      // Prioritas 1: userData (seperti di komponen Pelayanan)
      try {
        const userData = JSON.parse(userDataString);

        // Ambil nama dari email atau field nama langsung
        if (userData.name) {
          setAdminName(userData.name);
        } else if (userData.email && userData.email.includes('@')) {
          const namePart = userData.email.split('@')[0];
          // Kapitalisasi huruf pertama
          const capitalizedName =
            namePart.charAt(0).toUpperCase() + namePart.slice(1);
          setAdminName(capitalizedName);
        }

        console.log('Pakai userData untuk nama admin:', adminName);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    } else if (userInfoString) {
      // Prioritas 2: userInfo
      try {
        const user: User = JSON.parse(userInfoString);

        // Ambil nama dari email
        if (user.email && user.email.includes('@')) {
          const namaPengguna = user.email.split('@')[0];
          // Kapitalisasi huruf pertama
          const namaKapital =
            namaPengguna.charAt(0).toUpperCase() + namaPengguna.slice(1);
          setAdminName(namaKapital);
        }

        console.log('Pakai userInfo untuk nama admin:', adminName);
      } catch (error) {
        console.error('Error parsing user info:', error);
      }
    } else {
      // Prioritas 3: Coba ambil email langsung dari localStorage
      const email = localStorage.getItem('email');
      if (email && email.includes('@')) {
        const namaPengguna = email.split('@')[0];
        const namaKapital =
          namaPengguna.charAt(0).toUpperCase() + namaPengguna.slice(1);
        setAdminName(namaKapital);
        console.log('Pakai email langsung untuk nama admin:', namaKapital);
      }
    }

    // Ambil statistik laporan dari API
    const ambilDataLaporan = async () => {
      try {
        const response = await axios.get<ReportData[]>(
          'https://api-sipa-capstone-production.up.railway.app/data-pengaduan',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Olah dan set statistik laporan
        const dataOlahan = olahDataLaporan(response.data);
        setReportStats(dataOlahan);
      } catch (error) {
        console.error('Gagal mengambil statistik laporan:', error);
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          localStorage.clear();
          navigate('/login');
        }
      }
    };

    ambilDataLaporan();
  }, [navigate]);

  // Buka/tutup popup info pengembangan
  const toggleInfoPengembangan = () => {
    setTampilNotifikasi(!tampilNotifikasi);
  };

  // Konten utama dashboard
  const tampilkanDashboard = () => {
    return (
      <>
        {/* Grafik statistik laporan */}
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

        {/* Menu akses cepat */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Menu Laporan Korban */}
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

          {/* Menu Tingkat Kekerasan (dalam pengembangan) */}
          <div
            className="bg-white rounded-xl shadow-lg p-6 hover:bg-gray-50 transition flex flex-col items-center cursor-help opacity-80"
            onClick={toggleInfoPengembangan} // Klik untuk munculkan notifikasi
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Tingkat Kekerasan
              <span className="ml-2 text-xs bg-yellow-500 text-black px-1 rounded">
                Segera
              </span>
            </h3>
            <p className="text-gray-600 text-center">
              Analisis dan dokumentasi tingkat kekerasan
            </p>
          </div>

          {/* Menu Manajemen User */}
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

        {/* Popup notifikasi pengembangan */}
        {tampilNotifikasi && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                Info Pengembangan
              </h3>
              <p className="text-gray-600 mb-4">
                Fitur ini masih dalam tahap pengembangan dan akan tersedia pada
                update mendatang.
              </p>
              <div className="flex justify-end">
                <button
                  onClick={toggleInfoPengembangan}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar onMenuClick={handleMenuClick} />

      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto">
        {/* Header dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Selamat Datang, {adminName}
          </h1>
          <p className="text-gray-600 mt-2">
            Dashboard Pusat Informasi Perlindungan Anak
          </p>
        </div>

        {/* Tampilkan konten sesuai menu aktif */}
        {(activeMenu === 'dashboard' || activeMenu === '') &&
          tampilkanDashboard()}

        {/* Tampilan menu lainnya */}
        {activeMenu === 'tingkat-kekerasan' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Fitur Dalam Pengembangan
            </h2>
            <p className="text-gray-600">
              Fitur "Laporan Tingkat Kekerasan" akan dikembangkan di masa depan.
              Silakan cek kembali nanti.
            </p>
          </div>
        )}

        {activeMenu === 'laporan-korban' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Laporan Korban
            </h2>
            <p className="text-gray-600">
              Detail laporan korban akan ditampilkan di sini.
            </p>
          </div>
        )}

        {activeMenu === 'manajemen-user' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Manajemen Akun User
            </h2>
            <p className="text-gray-600">
              Detail manajemen user akan ditampilkan di sini.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
