import React from 'react';
import { motion } from 'framer-motion';
import Button from '../Ui/Button';
import { Link } from 'react-router-dom';

const Beranda: React.FC = () => {
  // Variasi warna untuk background
  const warnaPartikel = ['#C084FC', '#A78BFA', '#FF8C00', '#DDD6FE'];

  return (
    <section className="relative bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] w-full min-h-screen pt-32 pb-32 px-6 md:px-24 transition-all duration-500 overflow-hidden flex flex-col justify-center">
      {/* Background overflow biar dinamis */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute top-10 left-10 w-4 h-4 rounded-full animate-pulse"
          style={{ backgroundColor: warnaPartikel[0] }}
        ></div>
        <div
          className="absolute top-1/4 right-1/4 w-8 h-8 rounded-full animate-pulse opacity-40"
          style={{ backgroundColor: warnaPartikel[1] }}
        ></div>
        <div
          className="absolute bottom-10 right-10 w-6 h-6 rounded-full animate-pulse"
          style={{ backgroundColor: warnaPartikel[2] }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/5 w-5 h-5 rounded-full animate-pulse opacity-60"
          style={{ backgroundColor: warnaPartikel[3] }}
        ></div>
        {/* Nambahin 1 partikel lagi*/}
        <div
          className="absolute top-1/3 left-2/3 w-3 h-3 rounded-full animate-pulse opacity-70"
          style={{ backgroundColor: warnaPartikel[0] }}
        ></div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Bagian kiri - Text & CTA */}
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
            <span className="text-[#A78BFA] font-bold">#pedulisesama</span>{' '}
            terhadap kasus kekerasan pada ibu dan anak di sekitar anda. Laporkan
            tingkat kekerasan sebagai bentuk perlindungan dan kepedulian
            terhadap korban.
          </p>
          {/* Tombol aksi */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <Link to="/pengaduan">
              <Button variant="primary">Buat Pengaduan</Button>
            </Link>
            <Link to="/learn-more">
              <Button variant="secondary">Pelajari Lebih Lanjut</Button>
            </Link>
          </div>
        </motion.div>

        {/* Bagian kanan - Ilustrasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 mt-16 md:mt-0 flex justify-center relative"
        >
          {/* Efek glow di belakang gambar */}
          <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-lg"></div>
          {/* Gambar utama */}
          <img
            src="/assets/hero.png"
            alt="Ilustrasi SIPA"
            className="w-[500px] h-auto relative z-10 drop-shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default Beranda;
