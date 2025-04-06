import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaInfoCircle } from 'react-icons/fa';

const TeamNotification: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Memeriksa apakah pengguna pernah mengunjungi halaman tim sebelumnya
    const hasVisitedTeam = localStorage.getItem('hasVisitedTeamPage');

    if (!hasVisitedTeam) {
      // Jika belum pernah mengunjungi, tampilkan notifikasi
      const timer = setTimeout(() => {
        setShow(true);
      }, 1000);

      // Catat bahwa pengguna telah mengunjungi halaman tim
      localStorage.setItem('hasVisitedTeamPage', 'true');

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-24 right-4 w-full max-w-sm bg-white border border-purple-100 rounded-lg shadow-md overflow-hidden z-50"
        >
          <div className="bg-gradient-to-r from-purple-600 to-violet-700 p-2 text-white flex justify-between items-center">
            <div className="flex items-center">
              <FaInfoCircle className="mr-2" />
              <span className="font-medium">Selamat Datang!</span>
            </div>
            <button
              onClick={handleClose}
              className="text-white hover:text-purple-200 focus:outline-none"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <p className="text-gray-700">
              Kenali tim pengembang yang berada di balik platform Sipa. Kami
              terdiri dari 6 anggota yang berkomitmen untuk menciptakan solusi
              teknologi berdampak sosial.
            </p>
            <div className="flex justify-end mt-3">
              <button
                onClick={handleClose}
                className="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeamNotification;
