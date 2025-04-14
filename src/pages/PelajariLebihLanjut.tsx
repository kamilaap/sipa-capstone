import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';
import BackToTop from '../components/Ui/BackToTop';
import Button from '../components/Ui/Button';

const LearnMore: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Header Section */}
      <div className="bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] py-20 px-6 md:px-24">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-semibold text-center mb-6"
          >
            Pelajari Lebih Lanjut
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-center text-[#6B7280] max-w-3xl mx-auto"
          >
            Ketahui lebih banyak tentang aplikasi pelaporan dan perlindungan ibu
            dan anak dari tindak kekerasan
          </motion.p>
        </div>
      </div>

      {/* Tentang Section */}
      <section className="py-16 px-6 md:px-24 bg-white">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-10 text-center"
          >
            Tentang Aplikasi
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={itemVariants}>
              <div className="bg-[#F9F5FF] p-6 rounded-xl">
                <img
                  src="/assets/hero.png"
                  alt="About the application"
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-6">
              <h3 className="text-2xl font-semibold text-[#8B5CF6]">
                Melindungi dan Memberdayakan
              </h3>
              <p className="text-[#6B7280]">
                Aplikasi ini dirancang sebagai platform pengaduan dan pelaporan
                tindak kekerasan terhadap ibu dan anak. Dengan pendekatan yang
                berpusat pada korban, kami menyediakan ruang aman untuk
                melaporkan insiden, mendapatkan dukungan, dan menghubungkan
                dengan sumber daya yang diperlukan.
              </p>
              <p className="text-[#6B7280]">
                Setiap laporan ditangani dengan perlindungan data yang ketat dan
                terjamin keamanannya. Sehingga pelapor tidak perlu khawatir dan merasa takut
                untuk melaporkan tindak kekerasan dimana pun dan kapan saja. Dilengkapi dengan 
                pelayanan berbasis chatbot yang siap membantu para korban dan para pelapor.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#8B5CF6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4B5563]">Privasi Terjamin</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#8B5CF6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4B5563]">Dukungan 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#F3E8FF] flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-[#8B5CF6]"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <span className="text-[#4B5563]">
                    Pendampingan Profesional
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Cara Penggunaan */}
      <section className="py-16 px-6 md:px-24 bg-[#F9FAFB]">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-10 text-center"
          >
            Cara Penggunaan
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-[#8B5CF6]">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Buat Akun</h3>
              <p className="text-[#6B7280]">
                Daftar dengan mudah menggunakan email atau nomor telepon. Kami
                menjamin kerahasiaan identitas Anda. Verifikasi akun untuk
                keamanan tambahan.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-[#8B5CF6]">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Buat Pengaduan</h3>
              <p className="text-[#6B7280]">
                Isi formulir pengaduan dengan detail yang lengkap. Semua laporan
                ditangani dengan penuh kehati-hatian.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="w-14 h-14 bg-[#F3E8FF] rounded-full flex items-center justify-center mb-4">
                <span className="text-xl font-bold text-[#8B5CF6]">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Pantau Perkembangan
              </h3>
              <p className="text-[#6B7280]">
                Setelah laporan terkirim, Anda dapat memantau status
                penanganannya. Tim kami akan mengganti status pelaporan dalam waktu 24 jam
              </p>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="mt-12 p-6 bg-white border border-[#E5E7EB] rounded-xl shadow-sm"
          >
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#8B5CF6] mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Informasi Penting
            </h3>
            <ul className="space-y-3 text-[#6B7280]">
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B5CF6] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Untuk kondisi darurat yang membutuhkan bantuan segera, hubungi
                  langsung nomor hotline di 0800-123-4567.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B5CF6] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Pengaduan akan diteruskan ke pihak berwenang dan lembaga
                  pendamping sesuai dengan jenis kasus dan lokasi.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-[#8B5CF6] mr-2 mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>
                  Semua data dan informasi yang disampaikan dilindungi oleh
                  undang-undang perlindungan data pribadi.
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-6 md:px-24 bg-[#F9FAFB]">
        <motion.div
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-semibold mb-10 text-center"
          >
            Pertanyaan Umum
          </motion.h2>

          <div className="space-y-6">
            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">
                Apakah pengaduan saya akan dijaga kerahasiaannya?
              </h3>
              <p className="text-[#6B7280]">
                Ya, semua pengaduan diproses dengan kerahasiaan yang ketat. Kami
                tidak akan membagikan identitas pelapor tanpa persetujuan,
                kecuali jika diwajibkan oleh hukum. Sistem kami dirancang untuk
                melindungi privasi Anda.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">
                Bagaimana cara melacak status pengaduan?
              </h3>
              <p className="text-[#6B7280]">
                Setelah membuat pengaduan, Anda akan menerima nomor referensi
                unik. Gunakan nomor ini untuk melacak status pengaduan di akun
                Anda. 
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">
                Dapatkah saya melaporkan kasus untuk orang lain?
              </h3>
              <p className="text-[#6B7280]">
                Ya, Anda dapat melaporkan kasus atas nama orang lain yang
                menjadi korban. Pastikan untuk menyertakan informasi bahwa Anda
                bukan korban langsung dan berikan detail kontak jika
                memungkinkan untuk tindak lanjut yang lebih baik.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">
                Apa saja jenis kekerasan yang dapat dilaporkan?
              </h3>
              <p className="text-[#6B7280]">
                Aplikasi ini menerima laporan tentang berbagai jenis kekerasan
                terhadap ibu dan anak, termasuk kekerasan fisik, verbal,
                psikologis, ekonomi, dan seksual. Kami juga menerima laporan
                tentang penelantaran dan perdagangan manusia.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="bg-white p-6 rounded-xl shadow-sm"
            >
              <h3 className="text-lg font-semibold mb-2">
                Berapa lama waktu penanganan laporan?
              </h3>
              <p className="text-[#6B7280]">
                Laporan keadaan darurat akan ditangani dalam 24 jam. Untuk kasus
                lain, tim kami akan merespon dalam 1-3 hari kerja. Durasi
                penyelesaian kasus bergantung pada kompleksitas dan kerja sama
                dengan pihak berwenang.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 md:px-24 bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Siap Untuk Bertindak?
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Jadilah bagian dari perubahan. Laporkan tindak kekerasan dan bantu
            menciptakan lingkungan yang lebih aman untuk ibu dan anak di
            Indonesia.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/pengaduan">
              <Button variant="outline">Buat Pengaduan Sekarang</Button>
            </Link>
          </div>
        </motion.div>
      </section>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default LearnMore;
