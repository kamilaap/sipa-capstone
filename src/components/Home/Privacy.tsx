import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../Ui/Button';

// Ganti nama komponen jadi lebih personal
const Privasi: React.FC = () => {
  const navigate = useNavigate();
  // Tambah variabel personal
  const tanggalUpdate = '13 Maret 2025';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Tombol kembali ke halaman sebelumnya */}
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate(-1)}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          }
        >
          Kembali
        </Button>
      </div>

      {/* Partikel latar belakang buat tampilan lebih hidup */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#C084FC] rounded-full animate-pulse"></div>
        {/* Partikel ukuran berbeda-beda biar gak monoton */}
        <div className="absolute top-1/3 right-1/4 w-7 h-7 bg-[#A78BFA] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-[#FF8C00] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-6 h-6 bg-[#DDD6FE] rounded-full animate-pulse opacity-60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 relative z-10 my-12"
      >
        <div className="relative">
          {/* Background glow effect */}
          <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-lg"></div>
          <div className="bg-white p-8 rounded-xl shadow-xl relative">
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#8B5CF6]/10 mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#8B5CF6]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900">
                Kebijakan Privasi
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Terakhir diperbarui: {tanggalUpdate}
              </p>
            </div>

            {/* Isi kebijakan privasi */}
            <div className="prose max-w-none">
              <p className="text-gray-700">
                Privasi Anda sangat penting bagi kami. Kebijakan ini menjelaskan
                gimana cara kami mengumpulkan, menggunakan, dan melindungi data
                pribadi Anda.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-gray-700">
                Kami mengumpulkan beberapa jenis data dari pengguna, termasuk:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Data identitas (nama, email, nomor HP)</li>
                <li>Informasi profil (foto, biodata, preferensi)</li>
                <li>Info teknis (alamat IP, browser, info gadget)</li>
                <li>Data penggunaan (waktu akses, fitur yang dipakai)</li>
                <li>Info lokasi (kalau diizinkan sama gadget kamu)</li>
              </ul>

              {/* Sisanya tetap sama dengan beberapa perubahan bahasa */}

              {/* Bagian kontak sedikit dirubah */}
              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                10. Kontak Kami
              </h2>
              <p className="text-gray-700">
                Punya pertanyaan tentang kebijakan ini? Langsung aja hubungi
                kita:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mt-2">
                <p className="text-gray-800">Email: sipa@gmail.com</p>
                <p className="text-gray-800">Telepon: +62 21 123456</p>
                <p className="text-gray-800">
                  Alamat: Jl. Kebebasan No. 123, Jakarta Pusat
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <Button variant="primary" onClick={() => navigate(-1)}>
                Saya Mengerti
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// Rename komponen saat export
export default Privasi;
