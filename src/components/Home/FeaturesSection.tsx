import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
  stat?: { value: string; label: string };
}

interface AnimatedCounterProps {
  value: string;
  suffix?: string;
  duration?: number;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  suffix = '',
  duration = 2,
}) => {
  const [count, setCount] = useState(0);
  const isNumeric = !isNaN(parseFloat(value)) && isFinite(parseFloat(value));
  const targetValue = isNumeric ? parseFloat(value) : 0;

  useEffect(() => {
    if (!isNumeric) {
      setCount(0);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const currentCount = Math.floor(progress * targetValue);

      setCount(currentCount);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(targetValue);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [targetValue, duration, isNumeric]);

  const displayValue = isNumeric ? count : value;

  return (
    <span className="text-3xl font-bold text-purple-600 tracking-tight">
      {displayValue}
      {suffix}
    </span>
  );
};

const AnimatedStats: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="mt-10 flex flex-wrap justify-center gap-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <AnimatedCounter value="98" suffix="%" duration={2.5} />
        <span className="text-sm text-gray-500">Tingkat Kepuasan</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <AnimatedCounter value="500" suffix="+" duration={2.5} />
        <span className="text-sm text-gray-500">Kasus Terselesaikan</span>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isVisible ? 1 : 0.8, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
        whileHover={{ y: -5 }}
      >
        <AnimatedCounter value="24/7" duration={1} />
        <span className="text-sm text-gray-500">Dukungan</span>
      </motion.div>
    </div>
  );
};

const FeaturesCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  delay,
  stat,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="bg-white p-6 rounded-2xl shadow-lg transition-all duration-300 border border-purple-100 group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute -right-8 -top-8 w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full opacity-10 group-hover:scale-[6] transition-all duration-500"></div>

      <div className="w-14 h-14 mb-4 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
        <div className="text-purple-600 text-2xl group-hover:text-white transition-colors duration-300">
          {icon}
        </div>
      </div>

      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 z-10 relative">{description}</p>

      {stat && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? 'auto' : 0,
          }}
          transition={{ duration: 0.3 }}
          className="mt-4 pt-4 border-t border-purple-100"
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-purple-600">
              {stat.value}
            </span>
            <span className="text-sm text-gray-500">{stat.label}</span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const ShieldIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
    />
  </svg>
);

const LightbulbIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    />
  </svg>
);

const HeartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3.172 5.172a4.005 4.005 0 015.656 0L12 8.343l3.172-3.171a4.005 4.005 0 115.656 5.656L12 20.828l-8.828-8.828a4.005 4.005 0 010-5.656z"
    />
  </svg>
);

const SupportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className="w-8 h-8"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M18.364 5.636a9 9 0 11-12.728 0M12 3v4M9.172 9.172a4 4 0 015.656 0"
    />
  </svg>
);

const FeaturesSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ['Semua', 'Keamanan', 'Edukasi', 'Dukungan'];

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-6 md:px-24 py-20 overflow-hidden">
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            <span className="inline-block relative">
              Mengapa Memilih
              <span className="text-purple-700"> SIPA</span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.div>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Platform yang aman, terpercaya, dan efektif untuk melaporkan tindak
            kekerasan terhadap ibu dan anak.
          </p>

          <AnimatedStats />
        </motion.div>

        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-purple-100 rounded-lg">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-600 hover:bg-purple-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {(activeTab === 0 || activeTab === 1) && (
            <FeaturesCard
              icon={<ShieldIcon />}
              title="Keamanan & Privasi"
              description="Identitas pelapor dijamin kerahasiaannya dengan sistem enkripsi data terbaru."
              delay={0.1}
              stat={{ value: '100%', label: 'Kerahasiaan Terjamin' }}
            />
          )}

          {(activeTab === 0 || activeTab === 2) && (
            <FeaturesCard
              icon={<LightbulbIcon />}
              title="Edukasi & Pencegahan"
              description="Akses ke sumber daya edukasi tentang pencegahan kekerasan dan trauma healing."
              delay={0.2}
              stat={{ value: '50+', label: 'Artikel Edukasi' }}
            />
          )}

          {(activeTab === 0 || activeTab === 3) && (
            <FeaturesCard
              icon={<HeartIcon />}
              title="Dukungan Psikologis"
              description="Layanan Chatbot Untuk Konsultasi Awal."
              delay={0.3}
              stat={{ value: '50+', label: 'Psikolog Professional' }}
            />
          )}

          {(activeTab === 0 || activeTab === 3) && (
            <FeaturesCard
              icon={<SupportIcon />}
              title="Respon Cepat 24/7"
              description="Tim respons siap membantu kapanpun dengan waktu tanggap kurang dari 15 menit."
              delay={0.4}
              stat={{ value: '<15m', label: 'Waktu Respons' }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;
