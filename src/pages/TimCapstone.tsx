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

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  github?: string;
  linkedin?: string;
  email?: string;
  instagram?: string;
  bio: string;
}

const TeamPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const teamMembers: TeamMemberProps[] = [
    {
      name: 'Sipa Sopiatul Patoni',
      role: 'Frontend Developer',
      image: '/assets/sipa.png',
      github: 'https://github.com/Aleftu',
      linkedin: 'https://linkedin.com/in/rinawijaya',
      email: 'sopiatulpatonisipa@gmail.com',
      instagram: 'https://instagram.com/sipasff',
      bio: 'UI/UX enthusiast. Passionate about creating accessible interfaces for social impact projects.',
    },
    {
      name: 'Kamila Putri Herlambang',
      role: 'Frontend Developer',
      image: '/assets/kamila.jpg',
      github: 'https://github.com/kamilaap',
      linkedin: 'https://www.linkedin.com/in/kamila-putri-herlambang',
      email: 'kp.herlambang@gmail.com',
      instagram: 'https://instagram.com/kamilaputrih',
      bio: 'React js. Suka nyanyi, membaca buku, dan suka dia yang gak suka aku.',
    },
    {
      name: 'Elgiva Rasyad Aditya Putra',
      role: 'Backend Developer',
      image: '/assets/tokdalang.jpg',
      github: 'https://github.com/Rasyaditya13',
      linkedin: 'https://linkedin.com/in/dewilestari',
      email: 'rasyadelgiva@gmail.com',
      instagram: 'https://instagram.com/elgivarasyad',
      bio: 'Node.js developer with experience in secure API development and database architecture.',
    },
    {
      name: 'Thomas Christian Kuntolukito',
      role: 'Backend Developer',
      image: '/assets/tokdalang.jpg',
      github: 'https://github.com/agussupriyanto',
      linkedin: 'https://linkedin.com/in/agussupriyanto',
      email: 'thomas@sipa.id',
      instagram: 'https://instagram.com/thomaschristian',
      bio: 'Specializes in server optimization, authentication systems, and creating robust backend architectures.',
    },
    {
      name: 'Bintang Raga Pratama',
      role: 'Machine Learning Engineer',
      image: '/assets/tokdalang.jpg',
      github: 'https://github.com/SuryakandaRagaWistara',
      linkedin: 'https://linkedin.com/in/anitarahman',
      email: 'bintang@sipa.id',
      instagram: 'https://instagram.com/bintangraga',
      bio: 'Data scientist focused on NLP and sentiment analysis for identifying cases of violence in text reports.',
    },
    {
      name: 'Yogi Kautsar Alnandeta',
      role: 'Machine Learning Engineer',
      image: '/assets/tokdalang.jpg',
      github: 'https://github.com/farhanabdullah',
      linkedin: 'https://linkedin.com/in/yogikautsar',
      email: 'yogi@sipa.id',
      instagram: 'https://instagram.com/yogikautsar',
      bio: 'ML engineer with expertise in pattern recognition and classification algorithms for early detection systems.',
    },
  ];

  // Scroll to top when component mounts
  useEffect(() => {
    // Set document title
    document.title = 'Tim Pengembang | Sipa';

    // Scroll to top of page
    window.scrollTo(0, 0);
  }, []);

  const TeamMember: React.FC<TeamMemberProps> = ({
    name,
    role,
    image,
    github,
    linkedin,
    email,
    instagram,
    bio,
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg border border-purple-100"
      >
        <div
          className="relative h-48 w-full overflow-hidden cursor-pointer"
          onClick={() => setSelectedImage(image)}
        >
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="p-6">
          <h3 className="font-bold text-xl text-purple-800">{name}</h3>
          <div className="flex items-center mt-1 mb-3">
            {role === 'Frontend Developer' && (
              <FaCode className="text-purple-600 mr-2" />
            )}
            {role === 'Backend Developer' && (
              <FaServer className="text-purple-600 mr-2" />
            )}
            {role === 'Machine Learning Engineer' && (
              <FaBrain className="text-purple-600 mr-2" />
            )}
            <p className="text-sm font-medium text-purple-600">{role}</p>
          </div>
          <p className="text-gray-600 text-sm mb-4">{bio}</p>
          <div className="flex space-x-3">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 p-2 rounded-full text-purple-600 hover:bg-purple-200 transition duration-200"
              >
                <FaGithub size={18} />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 p-2 rounded-full text-purple-600 hover:bg-purple-200 transition duration-200"
              >
                <FaLinkedin size={18} />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-100 p-2 rounded-full text-purple-600 hover:bg-purple-200 transition duration-200"
              >
                <FaInstagram size={18} />
              </a>
            )}
            {email && (
              <a
                href={`mailto:${email}`}
                className="bg-purple-100 p-2 rounded-full text-purple-600 hover:bg-purple-200 transition duration-200"
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
        {/* Hero Section */}
        <div className="relative w-full bg-purple-100 py-20 px-4 overflow-hidden">
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

        {/* Team Members */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} />
            ))}
          </div>
        </div>

        {/* About Project Section */}
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
                  Proyek Sipa lahir dari keprihatinan kami terhadap tingginya
                  angka kekerasan terhadap perempuan dan anak di Indonesia,
                  serta minimnya akses pelaporan yang aman dan mudah digunakan.
                  Sebagai tim Capstone, kami bersatu dengan visi untuk
                  menciptakan platform digital yang dapat membantu korban
                  mendapatkan pendampingan secara cepat dan aman.
                </p>
                <p className="text-gray-700">
                  Berdasarkan riset yang kami lakukan, banyak kasus kekerasan
                  tidak terlaporkan karena korban takut, tidak tahu harus
                  melapor ke mana, atau khawatir tentang kerahasiaan
                  identitasnya. Sipa hadir sebagai solusi untuk mengatasi
                  hambatan-hambatan tersebut.
                </p>
              </motion.div>

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
                    <strong>Frontend:</strong> React.js, Next.js, TailwindCSS,
                    Framer Motion
                  </li>
                  <li>
                    <strong>Backend:</strong> Node.js, Express, PostgreSQL,
                    Firebase Authentication
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white p-6 rounded-xl shadow-md border border-purple-100"
              >
                <h3 className="text-xl font-semibold text-purple-700 mb-3">
                  Visi dan Dampak
                </h3>
                <p className="text-gray-700 mb-4">
                  Sipa bertujuan untuk memberikan dampak positif bagi masyarakat
                  Indonesia dengan:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>
                    Menyediakan saluran pelaporan yang aman, nyaman, dan
                    terjamin kerahasiaannya
                  </li>
                  <li>
                    Menghubungkan korban dengan pendamping profesional secara
                    cepat
                  </li>
                  <li>
                    Meningkatkan kesadaran masyarakat tentang pencegahan
                    kekerasan
                  </li>
                  <li>
                    Memberikan informasi dan edukasi tentang hukum dan hak-hak
                    korban
                  </li>
                  <li>
                    Mengumpulkan data untuk membantu pembuat kebijakan dalam
                    mengatasi masalah kekerasan secara sistematis
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-8"
            onClick={() => setSelectedImage(null)} // Close when clicking background
          >
            <div
              className="relative max-w-2xl w-full max-h-[80vh] bg-white rounded-lg overflow-hidden shadow-xl"
              onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                e.stopPropagation()
              } // Prevent closing when clicking on container
            >
              <div className="p-2 bg-white flex justify-between items-center border-b">
                <h3 className="text-lg font-medium text-purple-800">
                  Tim Member
                </h3>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="bg-purple-100 rounded-full p-2 text-purple-800 hover:bg-purple-200 transition"
                  aria-label="Close image"
                >
                  <FaTimes size={20} />
                </button>
              </div>
              <div className="p-4">
                <img
                  src={selectedImage}
                  alt="Team member"
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

export default TeamPage;
