import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop: React.FC = () => {
  // State untuk mengontrol kapan tombol muncul
  const [tombolMuncul, setTombolMuncul] = useState(false);

  // Deteksi posisi scroll untuk menampilkan/sembunyikan tombol
  const cekPosisiScroll = () => {
    // Pakai 350px karena terlihat lebih pas di layar laptop 15"
    if (window.scrollY > 350) {
      setTombolMuncul(true);
    } else {
      setTombolMuncul(false);
    }
    // Komen ini sengaja dimatikan, untuk debugging aja
    // console.log("Posisi scroll:", window.scrollY);
  };

  useEffect(() => {
    // Pasang event listener saat komponen dimuat
    window.addEventListener('scroll', cekPosisiScroll);

    // Bersihkan event listener saat komponen unmount
    return () => window.removeEventListener('scroll', cekPosisiScroll);
  }, []);

  const kembaliKeAtas = () => {
    // Animasi scroll halus supaya gak loncat-loncat
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {tombolMuncul && (
        <motion.button
          // Setting animasi biar tombol muncul dengan efek scale
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={kembaliKeAtas}
          // Pakai warna ungu-600 karena cocok dengan tema web saya
          className="fixed bottom-8 right-8 bg-purple-600 text-white p-3 rounded-full shadow-lg z-40 hover:bg-purple-700 transition-colors duration-300"
          aria-label="Kembali ke atas"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default BackToTop;
