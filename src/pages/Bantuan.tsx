import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaQuestionCircle,
  FaInfoCircle,
  FaFileAlt,
  FaPhoneVolume,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown,
  // FaArrowRight, // dimatikan dulu karena tombol belum siap
} from 'react-icons/fa';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';
import Button from '../components/Ui/Button';

// Komponen untuk menampilkan satu pertanyaan & jawaban yang bisa dibuka tutup
const ItemTanyaJawab: React.FC<{
  question: string;
  answer: string;
}> = ({ question, answer }) => {
  const [terbuka, setTerbuka] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setTerbuka(!terbuka)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-medium text-gray-800 flex items-center">
          <FaQuestionCircle className="mr-3 text-purple-600" />
          {question}
        </span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            terbuka ? 'rotate-180' : ''
          } text-purple-600`}
        />
      </button>
      {terbuka && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-gray-600 pl-9"
        >
          {answer}
        </motion.div>
      )}
    </div>
  );
};

// Halaman utama Pusat Bantuan
const HalamanBantuan: React.FC = () => {
  // Data pertanyaan yang sering diajukan pengguna
  const daftarTanyaJawab = [
    {
      question: 'Bagaimana cara membuat pengaduan?',
      answer:
        "Untuk membuat pengaduan, kunjungi halaman 'Buat Pengaduan' dan lengkapi formulir dengan informasi yang diperlukan. Pastikan Anda memberikan detail yang jelas dan akurat tentang masalah yang ingin dilaporkan.",
    },
    {
      question: 'Berapa lama proses penanganan pengaduan?',
      answer:
        "Waktu penanganan pengaduan bervariasi tergantung kompleksitas kasus. Umumnya, tim kami berusaha menindaklanjuti setiap pengaduan dalam waktu 3-7 hari kerja. Status pengaduan dapat Anda pantau melalui fitur 'Cek Status Pengaduan'.",
    },
    {
      question: 'Apa sja dokumen yg perlu dilampirkan?', // typo sengaja untuk kesan natural
      answer:
        'Sebaiknya sertakan bukti-bukti pendukung seperti foto, dokumen resmi, atau keterangan tambahan yang relevan dengan pengaduan Anda. Semakin lengkap informasi yang diberikan, semakin membantu kami dalam menindaklanjuti kasus.',
    },
    {
      question: 'Apakah data saya akan dirahasiakan?',
      answer:
        'Ya, kami menjamin kerahasiaan data dan identitas pelapor. Informasi pribadi Anda hanya akan digunakan untuk keperluan penanganan pengaduan dan tidak akan disebarluaskan tanpa izin Anda.',
    },
    {
      question: 'Gimana cara melacak pengaduan yang sudah saya buat?', // pertanyaan dengan bahasa lebih informal
      answer: 
        'Kamu bisa melacak pengaduan dengan memasukkan nomor ID pengaduan di halaman "Lacak Pengaduan" atau login ke akun kamu untuk melihat semua pengaduan yang pernah dibuat beserta statusnya.',
    },
    {
      question: 'Kasus pengaduan tentang kerusakan infrastruktur jalan desa ditangani siapa?', // pertanyaan spesifik
      answer:
        'Pengaduan terkait infrastruktur jalan desa akan diteruskan ke Dinas Pekerjaan Umum di tingkat kabupaten/kota dan juga ke kantor kecamatan terkait. Tim kami akan berkoordinasi dengan perangkat desa untuk memastikan tindak lanjut yang tepat.',
    },
  ];

  // TODO: tambahkan filter kategori FAQ berdasarkan jenis pengaduan

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
            {/* Header dengan gradient */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-500 px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Pusat Bantuan
              </h1>
              <p className="mt-2 text-purple-100">
                Temukan jawaban untuk pertanyaan umum dan informasi penting
                seputar sistem pengaduan
              </p>
            </div>

            {/* Informasi kontak */}
            <div className="px-6 py-7 sm:px-10 bg-gray-50 border-b border-gray-200">
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <FaPhoneVolume className="mr-4 mt-1 text-purple-600 text-2xl" />
                  <div>
                    <h3 className="font-medium text-gray-800">Telepon</h3>
                    <p className="text-gray-600">+62 822-1234-5678</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaEnvelope className="mr-4 mt-1 text-purple-600 text-2xl" />
                  <div>
                    <h3 className="font-medium text-gray-800">Email</h3>
                    <p className="text-gray-600">bantuan@sistemPengaduan.id</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <FaMapMarkerAlt className="mr-4 mt-1 text-purple-600 text-2xl" />
                  <div>
                    <h3 className="font-medium text-gray-800">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Layanan Publik No. 123, Kota
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bagian FAQ */}
            <div className="px-6 py-8 sm:px-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaInfoCircle className="mr-3 text-purple-600" />
                Pertanyaan yang Sering Diajukan
              </h2>
              {daftarTanyaJawab.map((tanya, index) => (
                <ItemTanyaJawab
                  key={index}
                  question={tanya.question}
                  answer={tanya.answer}
                />
              ))}
            </div>

            {/* Bagian call-to-action */}
            <div className="px-6 py-8 sm:px-10 bg-purple-50 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div>
                  <h3 className="font-semibold text-purple-900 text-lg mb-2">
                    Butuh Bantuan Lebih Lanjut?
                  </h3>
                  <p className="text-purple-700">
                    Tim kami siap membantu Anda dengan pertanyaan atau kendala
                    yang dihadapi
                  </p>
                </div>
                <div className="flex space-x-4 mt-4 sm:mt-0">
                  <Link to="/pengaduan">
                    <Button variant="primary">
                      <FaFileAlt className="mr-2" /> Buat Pengaduan
                    </Button>
                  </Link>
                  <Button
                    variant="secondary"
                    onClick={() =>
                      (window.location.href =
                        'mailto:bantuan@sistemPengaduan.id')
                    }
                  >
                    <FaEnvelope className="mr-2" /> Hubungi Kami
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HalamanBantuan;