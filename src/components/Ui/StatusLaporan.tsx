import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const StatusLaporan: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [bgColor, setBgColor] = useState('bg-white');
  const [status, setStatus] = useState('Pending');
  const [modalStatus, setModalStatus] = useState('Pending');

  useEffect(() => {
    if (isModalOpen) {
      setModalStatus(status);
    }
  }, [isModalOpen, status]);

  const handleModalStatusChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setModalStatus(event.target.value);
  };

  const saveChanges = () => {
    setStatus(modalStatus);
    setModalOpen(false);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value;

    let newColor = 'bg-white';
    if (status === 'Pending') newColor = 'bg-blue-300';
    else if (status === 'Process') newColor = 'bg-yellow-300';
    else if (status === 'Reject') newColor = 'bg-red-300';
    else if (status === 'Accept') newColor = 'bg-green-300';

    setBgColor(newColor);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Laporan Korban
      </h2>

      <form className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600">Kode</label>
          <input
            type="text"
            className="w-44 p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400 block"
          />
        </div>

        {/* Bagian Status yang Backgroundnya Berubah */}
        <div className={`p-4 rounded shadow ${bgColor} transition-all`}>
          <label className="block text-gray-800 mb-1">Status</label>
          <select
            value={modalStatus}
            onChange={handleStatusChange}
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
            className="block w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
          />
        </div>

        <div className="col-span-2">
          <label className="block text-gray-600">Kronologi</label>
          <textarea
            className="w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            rows={3}
          ></textarea>
        </div>

        <div className="col-span-2 text-right">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Edit Laporan
          </button>
        </div>
      </form>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(10)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-purple-400 opacity-50 rounded-full"
                  style={{
                    width: `${Math.random() * 50 + 20}px`,
                    height: `${Math.random() * 50 + 20}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: ['0%', '-50%', '0%'],
                    x: ['0%', '10%', '-10%', '0%'],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
            <motion.div
              className="bg-white p-6 m-10 shadow-lg w-96 rounded-md"
              style={{ width: '400px', minHeight: '300px' }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 m-10 shadow-lg w-96 rounded-md">
                  <h3 className="text-xl font-semibold mb-4">
                    Konfirmasi Edit
                  </h3>
                  <form className="grid">
                    <div>
                      <label className="block text-gray-800 ">Kode</label>
                      <input
                        type="number"
                        className="w-24 p-2 mb-4 focus:outline-none border border-gray-300 rounded focus:ring-purple-300 focus:border-purple-400"
                      />
                    </div>

                    <div
                      className={`p-4 rounded shadow ${bgColor} transition-all mb-4`}
                    >
                      <label className="block text-gray-800">Status</label>
                      <select
                        onChange={handleModalStatusChange}
                        className="w-full p-2 focus:outline-none border border-gray-300 rounded focus:ring-2 focus:ring-purple-300 focus:border-purple-400 transition-colors"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Process">Process</option>
                        <option value="Reject">Reject</option>
                        <option value="Accept">Accept</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-800 ">Keterangan</label>
                      <textarea className="h-32 w-full focus:outline-none border border-gray-300 rounded focus:ring-purple-300 focus:border-purple-400"></textarea>
                    </div>
                  </form>
                  <div className="flex justify-end mt-4">
                    <button
                      onClick={() => setModalOpen(false)}
                      className="px-4 py-2 mr-24 bg-yellow-500 hover:bg-yellow-400 rounded-lg"
                    >
                      Batal
                    </button>
                    <button
                      onClick={saveChanges}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                    >
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StatusLaporan;
