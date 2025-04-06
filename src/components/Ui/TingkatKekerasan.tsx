import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from './SideBar';
import { CheckCircle, XCircle } from 'lucide-react';

interface TingkatKekerasan {
  id?: number;
  kode?: string;
  pelaku_kekerasan: number;
  jenis_kekerasan: string;
  kronologi: string;
}

const TingkatKekerasan: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<TingkatKekerasan>({
    pelaku_kekerasan: 0,
    jenis_kekerasan: 'Fisik',
    kronologi: '',
  });
  const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://api-sipa-capstone-production.up.railway.app/tingkat-kekerasan',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success modal
      setModalStatus('success');

      // Reset form after success
      setTimeout(() => {
        setFormData({
          pelaku_kekerasan: 0,
          jenis_kekerasan: 'Fisik',
          kronologi: '',
        });
        setModalStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Error submitting report:', error);

      // Show error modal
      setModalStatus('error');
      setErrorMessage('Gagal mengirim laporan. Silakan coba lagi.');

      // Reset error modal after a delay
      setTimeout(() => {
        setModalStatus(null);
        setErrorMessage('');
      }, 2000);
    }
  };

  const renderSuccessModal = () => {
    if (modalStatus !== 'success') return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] text-center">
          <CheckCircle className="mx-auto mb-4 text-emerald-500" size={64} />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Berhasil</h3>
          <p className="text-gray-600">
            Laporan tingkat kekerasan berhasil dikirim
          </p>
        </div>
      </div>
    );
  };

  const renderErrorModal = () => {
    if (modalStatus !== 'error') return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[400px] text-center">
          <XCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Gagal</h3>
          <p className="text-gray-600">{errorMessage}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto w-full">
        <div className="max-w-3xl w-full mx-auto bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Laporan Tingkat Kekerasan
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-6">
            <div>
              <label className="block text-gray-600 mb-2">
                Jumlah Pelaku Kekerasan
              </label>
              <input
                type="number"
                value={formData.pelaku_kekerasan}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    pelaku_kekerasan: parseInt(e.target.value),
                  })
                }
                className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500"
                min="0"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Jenis Kekerasan
              </label>
              <select
                value={formData.jenis_kekerasan}
                onChange={(e) =>
                  setFormData({ ...formData, jenis_kekerasan: e.target.value })
                }
                className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500"
                required
              >
                <option value="Fisik">Fisik</option>
                <option value="Psikis">Psikis</option>
                <option value="Seksual">Seksual</option>
                <option value="Penelantaran">Penelantaran</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-600 mb-2">
                Kronologi Kejadian
              </label>
              <textarea
                value={formData.kronologi}
                onChange={(e) =>
                  setFormData({ ...formData, kronologi: e.target.value })
                }
                className="w-full p-3 border rounded focus:ring-2 focus:ring-purple-500"
                rows={5}
                required
              />
            </div>

            <div className="text-right">
              <button
                type="submit"
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                Kirim Laporan
              </button>
            </div>
          </form>
        </div>

        {renderSuccessModal()}
        {renderErrorModal()}
      </div>
    </div>
  );
};

export default TingkatKekerasan;
