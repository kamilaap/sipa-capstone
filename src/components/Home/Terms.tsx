import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../Ui/Button';

const Terms: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Back button */}
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

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#C084FC] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-[#A78BFA] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-[#FF8C00] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-7 h-7 bg-[#DDD6FE] rounded-full animate-pulse opacity-60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full space-y-8 relative z-10 my-12"
      >
        <div className="relative">
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
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900">
                Syarat dan Ketentuan
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Terakhir diperbarui: 13 Maret 2025
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700">
                Selamat datang di layanan kami. Silakan baca syarat dan
                ketentuan ini dengan seksama sebelum menggunakan platform kami.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                1. Penerimaan Syarat
              </h2>
              <p className="text-gray-700">
                Dengan mengakses atau menggunakan layanan kami, Anda menyetujui
                untuk terikat dengan syarat dan ketentuan ini. Jika Anda tidak
                setuju dengan bagian apa pun dari syarat ini, Anda tidak
                diperbolehkan menggunakan layanan kami.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                2. Perubahan pada Syarat
              </h2>
              <p className="text-gray-700">
                Kami berhak untuk memodifikasi atau mengganti syarat ini kapan
                saja. Perubahan akan efektif segera setelah diposting pada
                layanan. Adalah tanggung jawab Anda untuk memeriksa syarat dan
                ketentuan secara berkala.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                3. Akses ke Layanan
              </h2>
              <p className="text-gray-700">
                Kami berhak untuk menarik atau mengubah layanan kami tanpa
                pemberitahuan. Kami tidak bertanggung jawab jika karena alasan
                apa pun layanan tidak tersedia pada waktu atau untuk periode
                tertentu.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                4. Akun Pengguna
              </h2>
              <p className="text-gray-700">
                Saat membuat akun di layanan kami, Anda harus memberikan
                informasi yang akurat, lengkap, dan terkini. Anda bertanggung
                jawab untuk menjaga kerahasiaan akun dan kata sandi Anda serta
                untuk membatasi akses ke perangkat Anda.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                5. Konten Pengguna
              </h2>
              <p className="text-gray-700">
                Layanan kami memungkinkan Anda untuk memposting, menautkan,
                menyimpan, berbagi dan menyediakan konten tertentu. Anda
                bertanggung jawab atas konten yang Anda posting dan aktivitas
                yang terjadi di bawah akun Anda.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                6. Hak Kekayaan Intelektual
              </h2>
              <p className="text-gray-700">
                Layanan dan kontennya, termasuk tetapi tidak terbatas pada teks,
                grafik, logo, ikon, gambar, klip audio, unduhan digital, dan
                kompilasi data, adalah milik kami atau pemberi lisensi kami dan
                dilindungi oleh undang-undang hak cipta Indonesia dan
                internasional.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                7. Tautan ke Situs Lain
              </h2>
              <p className="text-gray-700">
                Layanan kami dapat berisi tautan ke situs web pihak ketiga yang
                tidak dimiliki atau dikendalikan oleh kami. Kami tidak memiliki
                kendali atas, dan tidak bertanggung jawab atas konten, kebijakan
                privasi, atau praktik situs web atau layanan pihak ketiga mana
                pun.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                8. Penghentian
              </h2>
              <p className="text-gray-700">
                Kami dapat menghentikan atau menangguhkan akses Anda ke layanan
                kami segera, tanpa pemberitahuan sebelumnya atau
                pertanggungjawaban, karena alasan apa pun, termasuk tanpa
                batasan jika Anda melanggar Syarat.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                9. Batasan Tanggung Jawab
              </h2>
              <p className="text-gray-700">
                Dalam keadaan apa pun, kami tidak akan bertanggung jawab atas
                kerugian tidak langsung, insidental, khusus, konsekuensial atau
                hukuman, termasuk kehilangan keuntungan, data, penggunaan, niat
                baik, atau kerugian tidak berwujud lainnya.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                10. Hukum yang Berlaku
              </h2>
              <p className="text-gray-700">
                Syarat ini akan diatur dan ditafsirkan sesuai dengan hukum
                Indonesia, tanpa memperhatikan ketentuan konflik hukumnya.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                11. Kontak Kami
              </h2>
              <p className="text-gray-700">
                Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini,
                silakan hubungi kami di:
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mt-2">
                <p className="text-gray-800">Email: sipa@gmail.com</p>
                <p className="text-gray-800">Telepon: +62 21 123456</p>
                <p className="text-gray-800">
                  Alamat: Jl. Contoh No. 123, Jakarta Pusat, Indonesia
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

export default Terms;
