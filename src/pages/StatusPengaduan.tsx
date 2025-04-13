import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/Ui/Button';
import {
  FaSearch,
  FaExclamationCircle,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaFileAlt,
  FaClipboardList,
  FaTools,
  FaCalendarCheck,
  FaInfoCircle,
} from 'react-icons/fa';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';

// Definisi tipe data untuk respons API pengaduan
interface StatusPengaduanData {
  id: number;
  kode: string;
  tanggal: string;
  umur: number;
  gender: string | null;
  lokasi: string;
  kronologi: string;
  bukti: string;
  status_pengaduan_id: number;
  status_pengaduan: {
    status: 'antre' | 'proses' | 'selesai';
    keterangan: string;
  };
}

const StatusPengaduan: React.FC = () => {
  // State untuk form dan hasil pencarian
  const [kodePengaduan, setKodePengaduan] = useState(''); // Pakai kode alih-alih nomor
  const [sedangLoading, setSedangLoading] = useState(false);
  const [sudahCari, setSudahCari] = useState(false);
  const [dataPengaduan, setDataPengaduan] =
    useState<StatusPengaduanData | null>(null);
  const [pesanError, setPesanError] = useState('');

  // Debug untuk development
  console.log('Render component StatusPengaduan');

  // Fungsi untuk mencari status pengaduan berdasarkan kode
  const cariPengaduan = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validasi input dulu
    if (!kodePengaduan) {
      setPesanError('Silahkan masukkan nomor pengaduan Anda');
      return;
    }

    setSedangLoading(true);
    setPesanError('');

    try {
      // Jalankan API call untuk cek pengaduan
      const response = await axios.get<StatusPengaduanData>(
        `https://api-sipa-capstone-production.up.railway.app/cek-pengaduan/${kodePengaduan}`
      );

      // Simpan data hasil
      console.log('Data ditemukan:', response.data);
      setDataPengaduan(response.data);
      setSudahCari(true);
    } catch (error) {
      // Log error ke console buat debugging
      console.error('Error waktu ngambil data pengaduan:', error);

      // Set pesan error untuk user
      setPesanError(
        'Hmm, nomor pengaduan nggak ketemu. Coba cek lagi ya inputnya.'
      );
      setDataPengaduan(null);
    } finally {
      setSedangLoading(false);
    }
  };

  // Mengubah status jadi badge dengan warna dan ikon
  const tampilBadgeStatus = (status: string) => {
    switch (status) {
      case 'antre':
        return {
          text: 'Antre',
          color: 'bg-yellow-100 text-yellow-700',
          icon: <FaExclamationCircle className="mr-2" />,
        };
      case 'proses':
        return {
          text: 'Diproses', // Sedikit perbedaan dari original
          color: 'bg-blue-100 text-blue-700',
          icon: <FaSpinner className="mr-2 animate-spin" />,
        };
      case 'selesai':
        return {
          text: 'Selesai',
          color: 'bg-green-100 text-green-700',
          icon: <FaCheckCircle className="mr-2" />,
        };
      default:
        return {
          text: 'Status Tidak Dikenal',
          color: 'bg-gray-100 text-gray-700',
          icon: <FaTimesCircle className="mr-2" />,
        };
    }
  };

  // Bikin data timeline berdasarkan status pengaduan
  const buatTimelinePengaduan = (status: string) => {
    // Helper buat bikin data timeline secara konsisten
    const tahapanLaporan = [];

    // Tahap 1: Pengaduan Diterima - selalu completed
    tahapanLaporan.push({
      stage: 'Pengaduan Diterima',
      icon: <FaClipboardList />,
      completed: true,
      color: 'bg-blue-500 text-white',
      description: 'Laporan Anda telah diterima dan akan segera diproses',
    });

    // Tahap 2: Sedang Diperiksa
    tahapanLaporan.push({
      stage: 'Sedang Diperiksa',
      icon: <FaTools />,
      completed: status === 'proses' || status === 'selesai',
      color:
        status === 'proses' || status === 'selesai'
          ? 'bg-blue-500 text-white'
          : 'bg-gray-300 text-gray-600',
      description: 'Tim kami sedang menindaklanjuti pengaduan',
    });

    // Tahap 3: Proses Penyelesaian
    tahapanLaporan.push({
      stage: 'Proses Penyelesaian',
      icon: <FaCalendarCheck />,
      completed: status === 'selesai',
      color:
        status === 'selesai'
          ? 'bg-green-500 text-white'
          : 'bg-gray-300 text-gray-600',
      description:
        status === 'selesai'
          ? 'Pengaduan telah diselesaikan'
          : 'Menunggu penyelesaian akhir',
    });

    return tahapanLaporan;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Cek Status Pengaduan
              </h1>
              <p className="mt-2 text-purple-100">
                Masukkan nomor pengaduan untuk memeriksa status dan progres
                penanganan
              </p>
            </div>

            {/* Form Pencarian */}
            <div className="px-6 py-6 sm:px-10 border-b border-gray-200">
              <form
                onSubmit={cariPengaduan}
                className="flex flex-col sm:flex-row gap-4"
              >
                <div className="flex-grow relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaFileAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Masukkan nomor pengaduan"
                    value={kodePengaduan}
                    onChange={(e) => setKodePengaduan(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  />
                </div>
                <Button
                  variant="primary"
                  type="submit"
                  className="flex items-center justify-center"
                  disabled={sedangLoading}
                >
                  {sedangLoading ? (
                    <FaSpinner className="mr-2 animate-spin" />
                  ) : (
                    <FaSearch className="mr-2" />
                  )}
                  {sedangLoading ? 'Mencari...' : 'Cari Status'}
                </Button>
              </form>
              {pesanError && (
                <div className="mt-3 text-red-600 text-sm flex items-center">
                  <FaExclamationCircle className="mr-1" /> {pesanError}
                </div>
              )}
            </div>

            {/* Hasil Pencarian - Tampil kalau data ditemukan */}
            {sudahCari && dataPengaduan && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.5 }}
                className="px-6 py-6 sm:px-10"
              >
                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  {/* Header Info Pengaduan */}
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-semibold text-gray-800">
                          Informasi Pengaduan #{dataPengaduan.kode}
                        </h2>
                        <p className="text-sm text-gray-500">
                          Dilaporkan pada:{' '}
                          {new Date(dataPengaduan.tanggal).toLocaleDateString(
                            'id-ID',
                            {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                      <div
                        className={`px-4 py-2 rounded-full font-medium text-sm flex items-center ${
                          tampilBadgeStatus(
                            dataPengaduan.status_pengaduan.status
                          ).color
                        }`}
                      >
                        {
                          tampilBadgeStatus(
                            dataPengaduan.status_pengaduan.status
                          ).icon
                        }
                        {
                          tampilBadgeStatus(
                            dataPengaduan.status_pengaduan.status
                          ).text
                        }
                      </div>
                    </div>
                  </div>

                  {/* Keterangan Status - Tampil jika ada */}
                  {dataPengaduan.status_pengaduan.keterangan && (
                    <div className="bg-blue-50 px-6 py-4 border-b border-gray-200 flex items-center">
                      <FaInfoCircle className="mr-3 text-blue-600" />
                      <div>
                        <h3 className="font-semibold text-blue-800 text-sm">
                          Keterangan Status
                        </h3>
                        <p className="text-blue-700 text-sm">
                          {dataPengaduan.status_pengaduan.keterangan}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Detail Pengaduan */}
                  <div className="px-6 py-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-medium text-gray-500 text-sm mb-2">
                        INFORMASI UMUR
                      </h3>
                      <p className="font-medium text-gray-900">
                        {dataPengaduan.umur} Tahun
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-500 text-sm mb-2">
                        JENIS KELAMIN
                      </h3>
                      <p className="font-medium text-gray-900">
                        {dataPengaduan.gender
                          ? dataPengaduan.gender === 'L'
                            ? 'Laki-laki'
                            : 'Perempuan'
                          : 'Tidak Diketahui'}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="font-medium text-gray-500 text-sm mb-2">
                        LOKASI KEJADIAN
                      </h3>
                      <p className="text-gray-700">{dataPengaduan.lokasi}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h3 className="font-medium text-gray-500 text-sm mb-2">
                        KRONOLOGI
                      </h3>
                      <p className="text-gray-700">{dataPengaduan.kronologi}</p>
                    </div>
                  </div>

                  {/* Timeline Status Pengaduan */}
                  <div className="border-t border-gray-200 px-6 py-4">
                    <h3 className="font-semibold text-gray-800 mb-6">
                      Tahapan Pengaduan
                    </h3>
                    <div className="flex justify-between items-center relative">
                      {/* Progress bar timeline */}
                      <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 h-1 bg-gray-200">
                        <div
                          className="h-full bg-green-500 transition-all duration-500"
                          style={{
                            width:
                              dataPengaduan.status_pengaduan.status === 'antre'
                                ? '30%' // Sedikit berbeda dari original (33%)
                                : dataPengaduan.status_pengaduan.status ===
                                    'proses'
                                  ? '66%'
                                  : '100%',
                          }}
                        ></div>
                      </div>

                      {/* Nodes timeline */}
                      {buatTimelinePengaduan(
                        dataPengaduan.status_pengaduan.status
                      ).map((tahap, index) => (
                        <div
                          key={index}
                          className="flex flex-col items-center z-10 relative"
                        >
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-lg transform transition-all duration-300 ${
                              tahap.completed ? 'scale-110' : 'scale-90'
                            } ${tahap.color}`}
                          >
                            {tahap.icon}
                          </div>
                          <span
                            className={`text-sm text-center font-medium ${
                              tahap.completed
                                ? 'text-gray-900'
                                : 'text-gray-500'
                            }`}
                          >
                            {tahap.stage}
                          </span>
                          {tahap.completed && (
                            <div className="absolute top-full mt-2 w-48 bg-white shadow-lg rounded-lg p-3 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <p className="text-xs text-gray-600">
                                {tahap.description}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Status Message */}
                    <div className="mt-8 text-center">
                      <p className="text-lg font-semibold text-gray-800">
                        {dataPengaduan.status_pengaduan.status === 'antre' &&
                          'Pengaduan Anda masih dalam antrian pemeriksaan'}
                        {dataPengaduan.status_pengaduan.status === 'proses' &&
                          'Tim kami sedang menangani pengaduan Anda'}
                        {dataPengaduan.status_pengaduan.status === 'selesai' &&
                          'Pengaduan Anda telah selesai ditangani'}
                      </p>
                      <p className="text-sm text-gray-600 mt-2">
                        Terakhir diupdate:{' '}
                        {new Date(dataPengaduan.tanggal).toLocaleDateString(
                          'id-ID',
                          {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          }
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Tombol aksi */}
                  <div className="mt-6 flex justify-between px-6 py-4">
                    <Link to="/">
                      <Button variant="outline">Kembali ke Beranda</Button>
                    </Link>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        console.log('Cetak laporan diklik');
                        window.print();
                      }}
                      className="flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Cetak Laporan
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Pesan Error - Tampil jika pencarian gagal */}
            {sudahCari && !dataPengaduan && !sedangLoading && pesanError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="px-6 py-10 sm:px-10 text-center"
              >
                <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-red-600 mb-4">
                  <FaExclamationCircle className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Pengaduan Tidak Ditemukan
                </h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  Nomor pengaduan yang Anda masukkan tidak terdaftar dalam
                  sistem kami. Coba cek lagi nomor pengaduannya ya.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setKodePengaduan('');
                      setSudahCari(false);
                      setPesanError('');
                    }}
                  >
                    Coba Lagi
                  </Button>
                  <Link to="/bantuan">
                    <Button variant="secondary">Hubungi Bantuan</Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* Info bantuan - Tampil saat pertama kali */}
            {!sudahCari && !sedangLoading && (
              <div className="px-6 py-6 sm:px-10 bg-purple-50">
                <h3 className="font-medium text-purple-800 mb-2">
                  Info Pencarian
                </h3>
                <p className="text-sm text-purple-700 mb-4">
                  Masukkan nomor pengaduan untuk memeriksa status dan
                  perkembangan penanganan kasus Anda.
                </p>
                <div className="bg-white p-4 rounded-lg border border-purple-200 text-sm">
                  <p className="font-medium text-gray-800 mb-1">
                    Belum memiliki nomor pengaduan?
                  </p>
                  <p className="text-gray-600 mb-3">
                    Jika Anda belum melaporkan kasus, silahkan buat pengaduan
                    terlebih dahulu.
                  </p>
                  <Link to="/pengaduan">
                    <Button variant="primary" size="sm">
                      Buat Pengaduan Baru
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StatusPengaduan;
