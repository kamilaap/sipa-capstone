import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useNavigate } from 'react-router-dom';

// Warna tema yang aku pakai di seluruh aplikasi
const warnaPurple = '#8844d4';
const warnaPink = '#ec4899';
const warnaBlue = '#3b82f6';
const warnaGray = '#d1d5db';

// Interface untuk data yang diambil dari API
interface ViolenceData {
  id: number;
  tahun: number;
  korban_laki: number;
  korban_perempuan: number;
  korban_total: number;
}

// Format data untuk chart
interface ChartData {
  name: string;
  'Korban Laki-laki': number;
  'Korban Perempuan': number;
  'Total Korban': number;
}

// Props untuk komponen AnimatedCounter
interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  duration?: number;
}

const StatisticsSection: React.FC = () => {
  const navigate = useNavigate();
  const [dataKekerasan, setDataKekerasan] = useState<ViolenceData[]>([]);
  const [sedangMuat, setSedangMuat] = useState<boolean>(true);
  const [tabAktif, setTabAktif] = useState<number>(0);
  const namaTab = ['Semua Data', 'Berdasarkan Gender', 'Tren Tahunan'];

  // FIXME: Nanti ganti ke endpoint production pas deploy
  const API_URL =
    'https://api-sipa-capstone-production.up.railway.app/data-kekerasan';

  // Fungsi untuk navigasi ke halaman pengaduan
  const keLamanPengaduan = () => {
    navigate('/pengaduan');
  };

  // Ambil data dari API
  useEffect(() => {
    const ambilData = async () => {
      try {
        // Pake timeout biar loading keliatan dikit, soalnya kadang API-nya kecepetan
        // setTimeout(() => {}, 1000); // TODO: Nanti dihapus kalau udah production

        const response = await axios.get<ViolenceData[]>(API_URL);
        setDataKekerasan(response.data);
        setSedangMuat(false);
      } catch (error) {
        console.error('Error saat mengambil data:', error);
        setSedangMuat(false);
        // TODO: Tambah state untuk pesan error
      }
    };

    ambilData();
  }, []);

  // Hitung total korban dari semua tahun
  const totalKorban = dataKekerasan.reduce(
    (acc, curr) => acc + curr.korban_total,
    0
  );
  const totalKorbanLaki = dataKekerasan.reduce(
    (acc, curr) => acc + curr.korban_laki,
    0
  );
  const totalKorbanPerempuan = dataKekerasan.reduce(
    (acc, curr) => acc + curr.korban_perempuan,
    0
  );

  // Fungsi untuk menghitung persentase kenaikan dari 2020-2024
  // Ini penting untuk highlight di dashboard utama
  const hitungPertumbuhan = (): number => {
    if (dataKekerasan.length < 5) return 0;

    const dataRentangTahun = dataKekerasan.filter(
      (item) => item.tahun >= 2020 && item.tahun <= 2024
    );
    if (dataRentangTahun.length < 2) return 0;

    const tahunAwal = dataRentangTahun.find((item) => item.tahun === 2020);
    const tahunAkhir = dataRentangTahun.find((item) => item.tahun === 2024);

    if (!tahunAwal || !tahunAkhir) return 0;

    return parseFloat(
      (
        ((tahunAkhir.korban_total - tahunAwal.korban_total) /
          tahunAwal.korban_total) *
        100
      ).toFixed(1)
    );
  };

  // Format data untuk grafik
  const formatDataChart = (): ChartData[] => {
    return dataKekerasan.map((item) => ({
      name: item.tahun.toString(),
      'Korban Laki-laki': item.korban_laki,
      'Korban Perempuan': item.korban_perempuan,
      'Total Korban': item.korban_total,
    }));
  };

  // Komponen untuk animasi angka (bikin sendiri)
  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    suffix = '',
    duration = 2,
  }) => {
    const [count, setCount] = useState<number>(0);

    useEffect(() => {
      let startTime: number | null = null;
      const nilaiTarget = typeof value === 'string' ? parseFloat(value) : value;
      let animationFrameId: number;

      // Animasi counter dengan requestAnimationFrame biar smooth
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min(
          (timestamp - startTime) / (duration * 1000),
          1
        );
        const currentCount = Math.floor(progress * nilaiTarget);

        setCount(currentCount);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(nilaiTarget);
        }
      };

      animationFrameId = requestAnimationFrame(updateCount);

      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [value, duration]);

    return (
      <span className="text-3xl font-bold text-purple-600 tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </span>
    );
  };

  // Render loading spinner kalau data belum ada
  if (sedangMuat) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-6 md:px-24 py-20 overflow-hidden">
      {/* Background blob effects - ini efek yang aku suka banget */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.7,
          }} /* Sedikit lebih lambat biar kesan lebih natural */
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            <span className="inline-block relative">
              Data Kekerasan di Indonesia
              <span className="text-purple-700"> 2020-2025</span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                }} /* Ubah delay animation */
                viewport={{ once: true }}
              ></motion.div>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Visualisasi data statistik kasus kekerasan di Indonesia, menampilkan
            tren dan pola dari tahun 2020 hingga 2025.
          </p>

          {/* Kartu statistik utama */}
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }} /* Ubah timing */
              className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <AnimatedCounter value={totalKorban} duration={2.3} />
              <span className="text-sm text-gray-500">Total Korban</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <AnimatedCounter
                value={hitungPertumbuhan()}
                suffix="%"
                duration={2.7}
              />
              <span className="text-sm text-gray-500">
                Peningkatan 2020-2024
              </span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-4">
                <div>
                  <span className="text-3xl font-bold text-pink-500 tracking-tight">
                    {totalKorban > 0
                      ? ((totalKorbanPerempuan / totalKorban) * 100).toFixed(1)
                      : '0'}
                    %
                  </span>
                  <span className="block text-sm text-gray-500">Perempuan</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-blue-500 tracking-tight">
                    {totalKorban > 0
                      ? ((totalKorbanLaki / totalKorban) * 100).toFixed(1)
                      : '0'}
                    %
                  </span>
                  <span className="block text-sm text-gray-500">Laki-laki</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs navigasi untuk view berbeda */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-purple-100 rounded-lg">
            {namaTab.map((tab, index) => (
              <button
                key={index}
                onClick={() => setTabAktif(index)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  tabAktif === index
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-600 hover:bg-purple-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Bagian Chart/Grafik */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-lg mb-10"
        >
          {tabAktif === 0 && (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={formatDataChart()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      borderColor: warnaGray,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="Total Korban"
                    stroke={warnaPurple}
                    strokeWidth={3}
                    dot={{ r: 6 }}
                    activeDot={{
                      r: 8,
                      stroke: warnaPurple,
                      strokeWidth: 2,
                      fill: '#fff',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Korban Perempuan"
                    stroke={warnaPink}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="Korban Laki-laki"
                    stroke={warnaBlue}
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {tabAktif === 1 && (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatDataChart()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      borderColor: warnaGray,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Korban Perempuan"
                    fill={warnaPink}
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    dataKey="Korban Laki-laki"
                    fill={warnaBlue}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {tabAktif === 2 && (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={formatDataChart()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      borderColor: warnaGray,
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Legend />
                  <Bar
                    dataKey="Total Korban"
                    fill={warnaPurple}
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Call to Action - Laporan Kasus */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Kasus kekerasan terus meningkat setiap tahun. Mari berperan aktif
            dalam mencegah dan melaporkan kasus kekerasan.
          </p>
          <button
            onClick={keLamanPengaduan}
            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Laporkan Kasus Kekerasan
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsSection;
