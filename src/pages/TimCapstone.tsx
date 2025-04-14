import React, { useEffect, useState } from 'react';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBrain,
  FaCode,
  FaServer,
  FaStar,
  FaInstagram,
  FaTimes,
} from 'react-icons/fa';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';
import BackToTop from '../components/Ui/BackToTop';
import { motion } from 'framer-motion';
import TeamNotification from '../components/Ui/TeamNotification';

// Interface untuk properties anggota tim
interface AnggotaTimProps {
  nama: string;
  posisi: string;
  foto: string;
  github?: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
}

const TimCapstone: React.FC = () => {
  // State untuk menyimpan foto yang diperbesar
  const [fotoTerpilih, setFotoTerpilih] = useState<string | null>(null);

  // Data anggota tim capstone project
  const timPengembang: AnggotaTimProps[] = [
    {
      nama: 'Sipa Sopiatul Patoni',
      posisi: 'Frontend Developer',
      foto: '/assets/sipa.png',
      github: 'https://github.com/Aleftu',
      linkedin: 'https://linkedin.com/in/rinawijaya',
      email: 'sopiatulpatonisipa@gmail.com',
      instagram: 'https://instagram.com/sipasff',
    },
    {
      nama: 'Kamila Putri Herlambang', // ini aku, hehehe
      posisi: 'Frontend Developer',
      foto: '/assets/kamila.jpg',
      github: 'https://github.com/kamilaap',
      linkedin: 'https://www.linkedin.com/in/kamila-putri-herlambang',
      email: 'kp.herlambang@gmail.com',
      instagram: 'https://instagram.com/kamilaputrih',
    },
    {
      nama: 'Elgiva Rasyad Aditya Putra',
      posisi: 'Backend Developer',
      foto: '/assets/rasyad.jpg', 
      github: 'https://github.com/Rasyaditya13',
      linkedin: 'https://www.linkedin.com/in/elgiva-rasyad-581b67291/',
      email: 'rasyadelgiva@gmail.com',
      instagram: 'https://www.instagram.com/rasyad.mencarinama/',
    },
    {
      nama: 'Thomas Christian Kuntolukito',
      posisi: 'Backend Developer',
      foto: '/assets/thomas.jpg', 
      github: 'https://www.github.com/Norpele/',
      linkedin: 'https://www.linkedin.com/in/thomas-christian-kuntoluktio-8620252a6/',
      email: 'thomaschristian012e@gmail.com',
      instagram: 'https://www.instagram.com/thomas_christian_k/',
    },
    {
      nama: 'Bintang Raga Pratama',
      posisi: 'Machine Learning Engineer',
      foto: '/assets/tokdalang.jpg', // nanti diupdate
      github: 'https://github.com/SuryakandaRagaWistara',
      linkedin: 'https://linkedin.com/in/anitarahman',
      email: 'bintang@sipa.id',
      instagram: 'https://instagram.com/bintangraga',
    },
    {
      nama: 'Yogi Kautsar Alnandeta',
      posisi: 'Machine Learning Engineer',
      foto: '/assets/yogi.jpg', 
      github: 'https://github.com/yogikautsa112',
      linkedin: 'https://www.linkedin.com/in/alndta/',
      email: 'yogikautsa@gmail.com',
      instagram: 'https://www.instagram.com/alndta_/',
    },
  ];

  useEffect(() => {
    // Set judul tab browser
    document.title = 'Tim Pengembang | Sipa';
    window.scrollTo(0, 0);
  }, []);

  // Komponen untuk menampilkan profil per anggota tim
  const AnggotaTim: React.FC<AnggotaTimProps> = ({
    nama,
    posisi,
    foto,
    github,
    linkedin,
    email,
    instagram,
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg border border-purple-100"
      >
        {/* Foto profil yang bisa diklik untuk diperbesar */}
        <div
          className="relative h-48 w-full overflow-hidden cursor-pointer"
          onClick={() => setFotoTerpilih(foto)}
        >
          <img src={foto} alt={nama} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-xl text-purple-800">{nama}</h3>
          <div className="flex items-center mt-1 mb-3">
            {/* Icon sesuai dengan posisi di tim */}
            {posisi === 'Frontend Developer' && (
              <FaCode className="text-purple-600 mr-2" />
            )}
            {posisi === 'Backend Developer' && (
              <FaServer className="text-purple-600 mr-2" />
            )}
            {posisi === 'Machine Learning Engineer' && (
              <FaBrain className="text-purple-600 mr-2" />
            )}
            <p className="text-sm font-medium text-purple-600">{posisi}</p>
          </div>

          {/* Link sosmed - kalo gamau hapus nih */}
          <div className="flex space-x-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 p-2 rounded-full text-purple-600 hover:bg-purple-200 transition duration-200"
                title="GitHub"
              >
                <FaGithub size={18} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-100 p-2 rounded-full text-blue-600 hover:bg-blue-200 transition duration-200"
                title="LinkedIn"
              >
                <FaLinkedin size={18} />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-pink-100 p-2 rounded-full text-pink-600 hover:bg-pink-200 transition duration-200"
                title="Instagram"
              >
                <FaInstagram size={18} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="bg-green-100 p-2 rounded-full text-green-600 hover:bg-green-200 transition duration-200"
                title="Email"
              >
                <FaEnvelope size={18} />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-purple-50">
      <Navbar />
      <TeamNotification />

      <main className="flex-grow">
        {/* Hero Section - Judul halaman tim */}
        <div className="relative w-full bg-purple-100 py-20 px-4 overflow-hidden">
          {/* Background patterns */}
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-5 rounded-full -ml-16 -mt-16"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white opacity-5 rounded-full -mr-20 -mb-20"></div>
            <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-white opacity-5 rounded-full"></div>
          </div>

          <div className="container mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6 bg-white/10 backdrop-blur-sm p-2 rounded-full"
            >
              <div className="flex items-center space-x-1 px-3 py-1">
                <FaStar className="text-yellow-300" />
                <span className="text-purple-800 text-sm font-medium">
                  Tim Capstone Project
                </span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-purple-800 mb-4 leading-tight"
            >
              Tim Pengembang <span className="text-purple-600">Sipa</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-purple-700 max-w-2xl mx-auto text-lg"
            >
              Kenali tim di balik platform Sipa yang berdedikasi untuk
              menciptakan ruang aman dan solusi teknologi untuk menangani kasus
              kekerasan terhadap perempuan dan anak.
            </motion.p>
          </div>
        </div>

        {/* Bagian tampilan anggota tim */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
                Tim Kami
              </h2>
              <div className="w-20 h-1 bg-purple-500 mx-auto mb-4"></div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Bertemu dengan individu-individu berbakat yang bekerja bersama
                untuk membuat perbedaan melalui teknologi.
              </p>
            </motion.div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {timPengembang.map((anggota, index) => (
              <AnggotaTim
                key={index}
                nama={anggota.nama}
                posisi={anggota.posisi}
                foto={anggota.foto}
                github={anggota.github}
                linkedin={anggota.linkedin}
                email={anggota.email}
                instagram={anggota.instagram}
              />
            ))}
          </div>
        </div>

        {/* Bagian tentang proyek Sipa */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 mb-4">
                  Tentang Proyek Sipa
                </h2>
                <div className="w-20 h-1 bg-purple-500 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Platform digital untuk mencegah dan menangani kasus kekerasan
                  di Indonesia.
                </p>
              </motion.div>

              {/* Latar belakang proyek */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white p-6 rounded-xl shadow-md mb-8 border border-purple-100"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  Latar Belakang
                </h3>
                <p className="text-gray-700 mb-4">
                Kekerasan terhadap ibu dan anak merupakan salah satu permasalahan sosial yang hingga kini masih marak terjadi di berbagai daerah. Banyak korban kekerasan yang tidak mendapatkan perlindungan dan pendampingan yang layak karena kurangnya akses terhadap saluran pelaporan yang aman, cepat, dan mudah dijangkau. Tak jarang pula korban merasa takut, malu, atau tidak tahu ke mana harus melapor.
                </p>
                <p className="text-gray-700">
                Seiring dengan perkembangan teknologi, inovasi digital dapat dimanfaatkan untuk menjawab permasalahan tersebut. Dalam upaya mendukung perlindungan terhadap ibu dan anak, diperlukan sebuah sistem yang dapat menjadi jembatan antara korban dan pihak yang berwenang dalam penanganan kasus kekerasan.
Berdasarkan permasalahan tersebut, tim kami mengembangkan aplikasi SIPA (Sistem Pelaporan Kekerasan Ibu dan Anak), sebuah platform berbasis digital yang memungkinkan masyarakat, khususnya korban atau saksi kekerasan terhadap ibu dan anak, untuk melaporkan kasus secara cepat, aman, dan terverifikasi. Aplikasi ini dirancang untuk mempermudah proses pelaporan, menyediakan informasi dan edukasi terkait kekerasan, serta menghubungkan korban dengan lembaga terkait seperti Dinas Sosial, kepolisian, dan LSM pendamping.
                </p>
                <p className="text-gray-700 mb-4">Dengan adanya SIPA, diharapkan dapat tercipta ekosistem pelaporan yang lebih responsif dan mendukung upaya pencegahan serta penanganan kekerasan terhadap ibu dan anak secara lebih efektif dan terstruktur.</p>
              </motion.div>

              {/* Teknologi yang dipakai */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-xl shadow-md mb-8 border border-purple-100"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  Teknologi yang Digunakan
                </h3>
                <p className="text-gray-700 mb-4">
                  Platform Sipa dikembangkan menggunakan teknologi terkini untuk
                  memastikan keamanan, kecepatan, dan keandalan:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>
                    <strong>Frontend:</strong> React.js, TailwindCSS,
                    Framer Motion
                  </li>
                  <li>
                    <strong>Backend:</strong> Node.js, Express, PostgreSQL,
                  </li>
                  <li>
                    <strong>Machine Learning:</strong> TensorFlow, Python,
                    Natural Language Processing
                  </li>
                  <li>
                    <strong>Keamanan:</strong> End-to-end encryption, anonymized
                    reporting, secure data storage
                  </li>
                </ul>
              </motion.div>

              {/* Visi dan tujuan */}
             
            </div>
          </div>
        </div>

        {/* Modal untuk memperbesar foto - muncul ketika foto diklik */}
        {fotoTerpilih && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-8"
            onClick={() => setFotoTerpilih(null)} // Tutup modal ketika klik background
          >
            <div
              className="relative max-w-2xl w-full max-h-[80vh] bg-white rounded-lg overflow-hidden shadow-xl"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              } // Mencegah modal tertutup saat klik gambar
            >
              <div className="p-2 bg-white flex justify-between items-center border-b">
                <h3 className="text-lg font-medium text-purple-800">
                  Tim Member
                </h3>
                <button
                  onClick={() => setFotoTerpilih(null)}
                  className="bg-purple-100 rounded-full p-2 text-purple-800 hover:bg-purple-200 transition"
                  aria-label="Close image"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={fotoTerpilih}
                  alt="Foto anggota tim"
                  className="w-full h-auto max-h-[60vh] object-contain"
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
};

export default TimCapstone;
