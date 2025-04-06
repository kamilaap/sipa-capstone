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
} from 'react-icons/fa';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';
import Button from '../components/Ui/Button';

const FAQItem: React.FC<{
  question: string;
  answer: string;
}> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left"
      >
        <span className="font-medium text-gray-800 flex items-center">
          <FaQuestionCircle className="mr-3 text-purple-600" />
          {question}
        </span>
        <FaChevronDown
          className={`transform transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          } text-purple-600`}
        />
      </button>
      {isOpen && (
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

const HalamanBantuan: React.FC = () => {
  const faqData = [
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
      question: 'Apa saja dokumen yang perlu dilampirkan?',
      answer:
        'Sebaiknya sertakan bukti-bukti pendukung seperti foto, dokumen resmi, atau keterangan tambahan yang relevan dengan pengaduan Anda. Semakin lengkap informasi yang diberikan, semakin membantu kami dalam menindaklanjuti kasus.',
    },
    {
      question: 'Apakah data saya akan dirahasiakan?',
      answer:
        'Ya, kami menjamin kerahasiaan data dan identitas pelapor. Informasi pribadi Anda hanya akan digunakan untuk keperluan penanganan pengaduan dan tidak akan disebarluaskan tanpa izin Anda.',
    },
  ];

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
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Pusat Bantuan
              </h1>
              <p className="mt-2 text-purple-100">
                Temukan jawaban untuk pertanyaan umum dan informasi penting
                seputar sistem pengaduan
              </p>
            </div>

            {/* Contact Information */}
            <div className="px-6 py-8 sm:px-10 bg-gray-50 border-b border-gray-200">
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

            {/* FAQ Section */}
            <div className="px-6 py-8 sm:px-10">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <FaInfoCircle className="mr-3 text-purple-600" />
                Pertanyaan yang Sering Diajukan
              </h2>
              {faqData.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>

            {/* Quick Action */}
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
