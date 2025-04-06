import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../Ui/Button';

const Privacy: React.FC = () => {
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </motion.div>
              <h1 className="text-3xl font-bold text-gray-900">
                Kebijakan Privasi
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Terakhir diperbarui: 13 Maret 2025
              </p>
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700">
                Privasi Anda sangat penting bagi kami. Kebijakan Privasi ini
                menjelaskan bagaimana kami mengumpulkan, menggunakan,
                mengungkapkan, dan melindungi informasi pribadi Anda.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                1. Informasi yang Kami Kumpulkan
              </h2>
              <p className="text-gray-700">
                Kami mengumpulkan beberapa jenis informasi dari pengguna kami,
                termasuk:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Informasi identitas (nama, alamat email, nomor telepon)</li>
                <li>Informasi profil (foto profil, biodata, preferensi)</li>
                <li>
                  Informasi teknis (alamat IP, jenis browser, informasi
                  perangkat)
                </li>
                <li>
                  Informasi penggunaan (waktu akses, fitur yang digunakan)
                </li>
                <li>Informasi lokasi (jika diizinkan oleh perangkat Anda)</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                2. Cara Kami Menggunakan Informasi
              </h2>
              <p className="text-gray-700">
                Kami menggunakan informasi yang dikumpulkan untuk:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Menyediakan, memelihara, dan meningkatkan layanan kami</li>
                <li>Memproses transaksi dan mengirim pemberitahuan terkait</li>
                <li>
                  Mengirim informasi teknis, pembaruan, dan pesan administratif
                </li>
                <li>Menanggapi komentar dan pertanyaan Anda</li>
                <li>Melindungi hak atau properti kami dan pengguna lain</li>
                <li>
                  Mendeteksi, mencegah, dan mengatasi aktivitas penipuan atau
                  ilegal
                </li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                3. Pengungkapan Informasi
              </h2>
              <p className="text-gray-700">
                Kami dapat membagikan informasi Anda dengan:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>Penyedia layanan yang bekerja sama dengan kami</li>
                <li>Afiliasi dan mitra bisnis</li>
                <li>Pihak berwenang jika diwajibkan oleh hukum</li>
                <li>Pihak lain dengan persetujuan Anda</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                4. Keamanan Data
              </h2>
              <p className="text-gray-700">
                Kami mengimplementasikan langkah-langkah keamanan yang sesuai
                untuk melindungi informasi pribadi Anda dari akses tidak sah,
                perubahan, pengungkapan, atau penghancuran. Namun, perlu diingat
                bahwa tidak ada metode transmisi melalui internet atau metode
                penyimpanan elektronik yang 100% aman.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                5. Cookie dan Teknologi Pelacakan
              </h2>
              <p className="text-gray-700">
                Kami menggunakan cookie dan teknologi pelacakan serupa untuk
                mengumpulkan dan melacak informasi serta untuk meningkatkan dan
                menganalisis layanan kami. Anda dapat mengatur browser Anda
                untuk menolak semua cookie atau untuk menunjukkan kapan cookie
                dikirim.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                6. Hak Privasi Anda
              </h2>
              <p className="text-gray-700">
                Tergantung pada lokasi Anda, Anda mungkin memiliki hak tertentu
                terkait dengan informasi pribadi Anda, termasuk:
              </p>
              <ul className="list-disc pl-6 mt-2 text-gray-700">
                <li>
                  Hak untuk mengakses informasi yang kami miliki tentang Anda
                </li>
                <li>Hak untuk meminta koreksi informasi yang tidak akurat</li>
                <li>Hak untuk meminta penghapusan informasi Anda</li>
                <li>Hak untuk membatasi pemrosesan data Anda</li>
                <li>Hak untuk membawa data Anda ke layanan lain</li>
                <li>Hak untuk menolak pemrosesan informasi Anda</li>
              </ul>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                7. Retensi Data
              </h2>
              <p className="text-gray-700">
                Kami akan menyimpan informasi pribadi Anda selama diperlukan
                untuk memenuhi tujuan yang diuraikan dalam Kebijakan Privasi
                ini, kecuali jika periode penyimpanan yang lebih lama diwajibkan
                atau diizinkan oleh hukum.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                8. Anak-anak
              </h2>
              <p className="text-gray-700">
                Layanan kami tidak ditujukan untuk anak-anak di bawah 13 tahun,
                dan kami tidak secara sadar mengumpulkan informasi pribadi dari
                anak-anak di bawah 13 tahun. Jika Anda adalah orang tua atau
                wali dan mengetahui bahwa anak Anda telah memberikan informasi
                pribadi kepada kami, harap hubungi kami.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                9. Perubahan pada Kebijakan Privasi
              </h2>
              <p className="text-gray-700">
                Kami dapat memperbarui Kebijakan Privasi kami dari waktu ke
                waktu. Kami akan memberi tahu Anda tentang perubahan apa pun
                dengan memposting Kebijakan Privasi baru di halaman ini dan,
                jika perubahan signifikan, kami akan mengirimkan pemberitahuan
                kepada Anda.
              </p>

              <h2 className="text-xl font-semibold text-gray-800 mt-6">
                10. Kontak Kami
              </h2>
              <p className="text-gray-700">
                Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini,
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

export default Privacy;
