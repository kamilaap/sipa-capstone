import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Komponen untuk menampilkan dan mengubah status laporan korban
// Dibuat untuk tugas React Intermediate - Fema (April 2025)
const StatusLaporan: React.FC = () => {
  // State untuk modal edit
  const [isDialogTerbuka, setDialogTerbuka] = useState(false);
  
  // State untuk warna background status
  const [warnaBgStatus, setWarnaBgStatus] = useState('bg-white');
  
  // State untuk status laporan (di form utama)
  const [statusLaporan, setStatusLaporan] = useState('Pending');
  
  // Status yang sedang diedit di modal
  const [statusDalamModal, setStatusDalamModal] = useState('Pending');

  // Memastikan status di modal sesuai dengan status di form utama saat modal dibuka
  useEffect(() => {
    if (isDialogTerbuka) {
      setStatusDalamModal(statusLaporan);
    }
  }, [isDialogTerbuka, statusLaporan]);

  // Handler untuk perubahan status di dalam modal
  const updateStatusDalamModal = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setStatusDalamModal(event.target.value);
  };

  // Menyimpan perubahan dari modal ke form utama
  const simpanPerubahanStatus = () => {
    setStatusLaporan(statusDalamModal);
    setDialogTerbuka(false);
  };

  // Mengubah warna background berdasarkan status
  const ubahWarnaBerdasarkanStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const pilihanStatus = event.target.value;

    // Warna yang aku pilih sendiri biar bagus untuk tiap status
    let warnaBaruBg = 'bg-white';
    if (pilihanStatus === 'Pending') warnaBaruBg = 'bg-blue-300';      // Biru = masih menunggu
    else if (pilihanStatus === 'Process') warnaBaruBg = 'bg-yellow-300'; // Kuning = sedang diproses
    else if (pilihanStatus === 'Reject') warnaBaruBg = 'bg-red-300';     // Merah = ditolak
    else if (pilihanStatus === 'Accept') warnaBaruBg = 'bg-green-300';   // Hijau = diterima

    setWarnaBgStatus(warnaBaruBg);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Laporan Korban
      </h2>

      {/* Form utama laporan */}
      <form className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Kode</label>
          <input
            type="text"
            placeholder="Masukkan kode laporan"
            className="w-44 p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400 block"
          />
        </div>

        {/* Area status dengan background warna dinamis */}
        <div className={`p-4 rounded shadow ${warnaBgStatus} transition-all`}>
          <label className="block text-gray-800 mb-1">Status</label>
          <select
            value={statusDalamModal}
            onChange={ubahWarnaBerdasarkanStatus}
            className="w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          >
            <option value="Pending">Pending</option>
            <option value="Process">Process</option>
            <option value="Reject">Reject</option>
            <option value="Accept">Accept</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-600">Tanggal</label>
          <input
            type="date"
            className="w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>

        <div>
          <label className="block text-gray-600">Lokasi</label>
          <input
            type="text"
            placeholder="Masukkan lokasi kejadian"
            className="block w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600">Kronologi</label>
          <textarea
            placeholder="Ceritakan kronologi kejadian..."
            className="w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            rows={3}
          ></textarea>
        </div>

        <div className="col-span-2 text-right">
          <button
            type="button"
            onClick={() => setDialogTerbuka(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Edit Laporan
          </button>
        </div>
      </form>

      {/* Modal untuk konfirmasi perubahan status */}
      <AnimatePresence>
        {isDialogTerbuka && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }} // Sedikit lebih cepat untuk UX yang lebih responsif
          >
            {/* Background dengan efek bubble (disederhanakan) */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-purple-400 opacity-50 rounded-full"
                  style={{
                    width: `${30 + (i * 10)}px`, // Ukuran yang lebih konsisten
                    height: `${30 + (i * 10)}px`,
                    top: `${20 + (i * 15)}%`, // Posisi yang lebih terstruktur
                    left: `${15 + (i * 17)}%`,
                  }}
                  animate={{
                    y: [0, -20, 0], // Animasi sederhana naik-turun
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 3, // Durasi yang konsisten
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
            
            {/* Modal content */}
            <motion.div
              className="bg-white p-6 m-10 shadow-lg rounded-md relative z-10"
              style={{ width: '400px', minHeight: '300px' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-xl font-semibold mb-4">
                Konfirmasi Edit
              </h3>
              <form className="grid">
                <div>
                  <label className="block text-gray-800">Kode</label>
                  <input
                    type="number"
                    placeholder="Masukkan kode"
                    className="w-24 p-2 mb-4 focus:outline-none border border-gray-300 rounded focus:ring-purple-300 focus:border-purple-400"
                  />
                </div>

                <div
                  className={`p-4 rounded shadow ${warnaBgStatus} transition-all mb-4`}
                >
                  <label className="block text-gray-800">Status</label>
                  <select
                    value={statusDalamModal}
                    onChange={updateStatusDalamModal}
                    className="w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-colors"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Process">Process</option>
                    <option value="Reject">Reject</option>
                    <option value="Accept">Accept</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-800">Keterangan</label>
                  <textarea 
                    placeholder="Tambahkan keterangan tentang perubahan status..."
                    className="h-32 w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-purple-300 focus:border-purple-400">
                  </textarea>
                </div>
              </form>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setDialogTerbuka(false)}
                  className="px-4 py-2 mr-4 bg-yellow-500 hover:bg-yellow-400 rounded-lg"
                >
                  Batal
                </button>
                <button
                  onClick={simpanPerubahanStatus}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  Simpan Perubahan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusLaporan;