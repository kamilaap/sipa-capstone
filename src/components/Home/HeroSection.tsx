import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Ui/Button';
import { Link } from 'react-router-dom';

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] w-full min-h-screen pt-32 pb-32 px-6 md:px-24 transition-all duration-500 overflow-hidden flex flex-col justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-4 h-4 bg-[#C084FC] rounded-full animate-pulse"></div>
        <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-[#A78BFA] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-6 h-6 bg-[#FF8C00] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/3 left-1/5 w-5 h-5 bg-[#DDD6FE] rounded-full animate-pulse opacity-60"></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left md:w-1/2 space-y-6"
        >
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">
            Laporkan Tindak Kekerasan Ibu dan Anak
          </h1>
          <p className="text-lg text-[#6B7280] max-w-xl">
            Tumbuhkan sikap{' '}
            <span className="text-[#8B5CF6] font-bold">#peduli sesama</span>{' '}
            terhadap kasus kekerasan pada ibu dan anak di sekitar anda. Laporkan
            tingkat kekerasan sebagai bentuk perlindungan dan kepedulian
            terhadap korban.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/pengaduan">
              <Button variant="primary">Buat Pengaduan</Button>
            </Link>
            <Link to="/learn-more">
              <Button variant="secondary">Pelajari Lebih Lanjut</Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative"
        >
          <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-lg"></div>
          <img
            src="/assets/hero.png"
            alt="Illustration"
            className="w-[500px] h-auto relative z-10 drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
