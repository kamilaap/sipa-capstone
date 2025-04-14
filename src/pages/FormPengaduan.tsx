import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaFileAlt,
  FaCheck,
  FaCopy,
  FaHome,
  FaSearch,
  FaUser,
} from 'react-icons/fa';
import axios from 'axios';
import Button from '../components/Ui/Button';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';

// Tipe data untuk response API
interface ResponseData {
  pengaduan?: {
    kode?: string;
  };
  kode?: string;
}

// Array bulan dalam bahasa Indonesia buat fallback
const namaBulan = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const FormPengaduan: React.FC = () => {
  const [tahapForm, setTahapForm] = useState(1);
  const [sedangSubmit, setSedangSubmit] = useState(false);
  const [berhasil, setBerhasil] = useState(false);
  const [kodeTersalin, setKodeTersalin] = useState(false);
  const [dataResponse, setDataResponse] = useState<ResponseData | null>(null);
  const [pesanError, setPesanError] = useState<string>('');

  // Fungsi buat format tanggal ala Indonesia (DD Bulan YYYY)
  // TODO: Benerin bug di Firefox yang kadang ngga support locale
  const ambilTanggalHariIni = () => {
    const skrg = new Date();
    try {
      return skrg.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      // Fallback kalau browser ngga support locale id-ID
      // Using underscore (_) instead of 'e' as unused parameter
      return `${skrg.getDate()} ${namaBulan[skrg.getMonth()]} ${skrg.getFullYear()}`;
    }
  };

  const [dataLaporan, setDataLaporan] = useState({
    lokasi: '',
    kronologi: '',
    tanggalLaporan: ambilTanggalHariIni(),
    umur: '',
    gender: '',
  });

  // Update tanggal tiap kali komponen dimuat ulang
  useEffect(() => {
    setDataLaporan((data) => ({
      ...data,
      tanggalLaporan: ambilTanggalHariIni(),
    }));
  }, []);

  // Handler untuk perubahan input
  const updateFormInput = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setDataLaporan((data) => ({ ...data, [name]: value }));
  };

  // Cek kelengkapan data tiap tahap
  const cekDataLengkap = () => {
    if (tahapForm === 1) {
      // Validasi data pribadi
      return dataLaporan.umur && dataLaporan.gender && dataLaporan.lokasi;
    } else if (tahapForm === 2) {
      // Validasi kronologi (minimal 20 karakter)
      return dataLaporan.kronologi && dataLaporan.kronologi.length >= 20;
    }
    return true;
  };

  // Handler submit form
  const kirimLaporan = async (e: React.FormEvent) => {
    e.preventDefault();

    if (tahapForm < 3) {
      if (!cekDataLengkap()) {
        // Tampilkan pesan kesalahan
        setPesanError('Data belum lengkap, mohon dilengkapi dulu ya!');
        return;
      }
      setTahapForm((prev) => prev + 1);
      return;
    }

    setSedangSubmit(true);
    setPesanError('');

    try {
      // Bikin format tanggal yyyy-mm-dd buat API
      const tanggalHariIni = new Date().toISOString().split('T')[0];

      // Kirim ke API
      const response = await axios.post<{ pengaduan: ResponseData }>(
        'https://api-sipa-capstone-production.up.railway.app/pengaduan',
        {
          lokasi: dataLaporan.lokasi,
          kronologi: dataLaporan.kronologi,
          tanggalLaporan: tanggalHariIni,
          tanggal: tanggalHariIni,
          bukti: '', // Kosong dulu, nanti bisa diupdate
          umur: parseInt(dataLaporan.umur), // Ubah jadi angka umurnya
          gender: dataLaporan.gender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Simpan data response untuk ditampilkan
      if (response.data && response.data.pengaduan) {
        setDataResponse(response.data.pengaduan);
        setBerhasil(true);
      } else {
        throw new Error('Format response dari server ngga valid');
      }
    } catch (error) {
      // Default message
      let message = 'Gagal mengirim laporan. Coba lagi ya!';

      // Pesan error custom
      const tipeError = {
        network: 'Koneksi internet lagi gangguan nih, coba lagi nanti ya!',
        server: 'Server lagi sibuk, tunggu bentar ya...',
        validasi: 'Ada data yang kurang tepat, cek lagi ya!',
        lainnya: 'Hmm ada yang aneh. Coba refresh dulu deh!',
      };

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error data:', error.response.data);

          if (error.response.status === 400) {
            message = tipeError.validasi;
          } else if (error.response.status === 500) {
            message = tipeError.server;
          }
        } else if (error.request) {
          message = tipeError.network;
        }
      } else if (error instanceof Error) {
        message = `Error: ${error.message}`;
      }

      setPesanError(message);
    } finally {
      setSedangSubmit(false);
    }
  };

  // Kembali ke tahap sebelumnya
  const kembaliTahapSebelum = () => {
    setTahapForm((prev) => Math.max(1, prev - 1));
  };

  // Salin kode pengaduan
  const salinKeClipboard = () => {
    const kodePengaduan = dataResponse?.kode || '';
    navigator.clipboard.writeText(kodePengaduan);
    setKodeTersalin(true);
    setTimeout(() => setKodeTersalin(false), 2000);
  };

  // Indikator progres form
  const tampilkanProgres = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  tahapForm >= num
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num}
              </div>
              <span className="text-xs mt-2 text-gray-500">
                {num === 1
                  ? 'Identifikasi'
                  : num === 2
                    ? 'Detail'
                    : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-200 rounded"></div>
          <div
            className="absolute top-0 left-[10%] h-1 bg-purple-600 rounded transition-all duration-300"
            style={{ width: `${(tahapForm - 1) * 40}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Pesan sukses setelah pengiriman form
  const pesanBerhasil = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-green-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Laporan Berhasil Dibuat!
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Laporan kamu sudah kami terima dan akan segera ditindaklanjuti. Simpan
          kode di bawah ini untuk cek status kasus kamu nanti ya.
        </p>

        <div className="mb-8">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-between max-w-xs mx-auto">
            <span className="text-2xl font-mono font-bold text-purple-700 tracking-wider">
              {dataResponse?.kode || ''}
            </span>
            <button
              onClick={salinKeClipboard}
              className="p-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              aria-label="Copy code"
            >
              {kodeTersalin ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          {kodeTersalin && (
            <p className="text-sm text-green-600 mt-2">
              Kode berhasil disalin!
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <FaHome className="mr-2" /> Kembali ke Beranda
            </Button>
          </Link>
          <Link to="/status-pengaduan">
            <Button variant="primary" className="flex items-center">
              <FaSearch className="mr-2" /> Lihat Status Laporan
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  };

  // Tahap 1: Info awal pelapor
  const tahapIdentifikasi = () => {
    return (
      <>
        <div className="mb-6">
          <label
            htmlFor="tanggalLaporan"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Tanggal Laporan
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="tanggalLaporan"
              name="tanggalLaporan"
              type="text"
              value={dataLaporan.tanggalLaporan}
              readOnly
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Tanggal otomatis menggunakan hari ini
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="umur"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Umur <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              id="umur"
              name="umur"
              type="number"
              placeholder="Berapa umur kamu?"
              value={dataLaporan.umur}
              onChange={updateFormInput}
              required
              min="0"
              max="120"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={dataLaporan.gender}
            onChange={updateFormInput}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="lokasi"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Lokasi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              id="lokasi"
              name="lokasi"
              type="text"
              placeholder="Dimana kejadiannya? (alamat lengkap)"
              value={dataLaporan.lokasi}
              onChange={updateFormInput}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </>
    );
  };

  // Tahap 2: Detail Kejadian
  const tahapDetailKejadian = () => {
    return (
      <>
        <div className="mb-6">
          <label
            htmlFor="kronologi"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Kronologi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <FaFileAlt className="text-gray-400" />
            </div>
            <textarea
              id="kronologi"
              name="kronologi"
              rows={6}
              placeholder="Ceritakan kejadiannya secara detail"
              value={dataLaporan.kronologi}
              onChange={updateFormInput}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Jelaskan apa yang terjadi, kapan, dan siapa aja yang terlibat
          </p>
        </div>
      </>
    );
  };

  // Tahap 3: Review Info
  const tahapKonfirmasi = () => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">Cek Laporan Kamu</h3>
          <p className="text-sm text-gray-500">
            Pastikan semua data udah bener sebelum dikirim ya
          </p>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              TANGGAL LAPORAN
            </h4>
            <p className="font-medium text-gray-800">
              {dataLaporan.tanggalLaporan}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">UMUR</h4>
            <p className="font-medium text-gray-800">
              {dataLaporan.umur} tahun
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">JENIS KELAMIN</h4>
            <p className="font-medium text-gray-800">{dataLaporan.gender}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">
              LOKASI KEJADIAN
            </h4>
            <p className="font-medium text-gray-800">{dataLaporan.lokasi}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">KRONOLOGI</h4>
            <p className="text-gray-800 whitespace-pre-line">
              {dataLaporan.kronologi}
            </p>
          </div>
        </div>

        <div className="bg-purple-50 px-6 py-4 border-t border-purple-100">
          <p className="text-sm text-purple-700">
            Dengan kirim laporan ini, kamu menyatakan bahwa info yang diberikan
            benar dan bisa dipertanggungjawabkan.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Form Laporan
              </h1>
              <p className="mt-2 text-purple-100">
                Laporkan kekerasan terhadap ibu dan anak untuk penanganan cepat
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-8 sm:px-10">
              {berhasil ? (
                pesanBerhasil()
              ) : (
                <form onSubmit={kirimLaporan}>
                  {tampilkanProgres()}

                  {pesanError && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
                      <p className="text-red-600 text-sm">{pesanError}</p>
                    </div>
                  )}

                  {tahapForm === 1 && tahapIdentifikasi()}
                  {tahapForm === 2 && tahapDetailKejadian()}
                  {tahapForm === 3 && tahapKonfirmasi()}

                  <div className="flex justify-between mt-8">
                    {tahapForm > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={kembaliTahapSebelum}
                      >
                        Kembali
                      </Button>
                    ) : (
                      <Link to="/">
                        <Button variant="outline">Batal</Button>
                      </Link>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={sedangSubmit}
                      className="relative"
                    >
                      {sedangSubmit && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      )}
                      <span className={sedangSubmit ? 'opacity-0' : ''}>
                        {tahapForm < 3 ? 'Lanjutkan' : 'Kirim Laporan'}
                      </span>
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Help Info */}
            {!berhasil && (
              <div className="px-6 py-6 sm:px-10 bg-blue-50 border-t border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-blue-700">
                      Laporan kamu akan ditangani secara rahasia dan prioritas.
                      Simpan kode laporan buat cek status penanganan nanti.
                    </p>
                    <p className="mt-2 text-sm text-blue-700">
                      <span className="font-medium">Butuh bantuan cepat?</span>{' '}
                      Telepon hotline kami di{' '}
                      <span className="font-medium">0800-123-88888</span> (24
                      jam)
                    </p>
                  </div>
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

export default FormPengaduan;
