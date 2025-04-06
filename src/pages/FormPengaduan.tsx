import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaFileAlt,
  FaCheck,
  FaCopy,
  FaHome,
  FaSearch,
  FaUser,
} from 'react-icons/fa';
import axios from 'axios';
import Button from '../components/Ui/Button';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';

// Define an interface for the response data
interface ResponseData {
  pengaduan?: {
    kode?: string;
  };
  kode?: string;
}

const FormPengaduan: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [responseData, setResponseData] = useState<ResponseData | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Function to get current date formatted in Indonesian
  const getCurrentDate = () => {
    const now = new Date();
    // Use Indonesian locale with full date formatting
    return (
      now.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }) || new Date().toLocaleDateString()
    ); // Fallback if something goes wrong
  };

  const [formData, setFormData] = useState({
    lokasi: '',
    kronologi: '',
    tanggalLaporan: getCurrentDate(),
    umur: '',
    gender: '',
  });

  // Update date whenever component is mounted or re-rendered
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      tanggalLaporan: getCurrentDate(),
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step < 3) {
      setStep((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Create a new Date object and convert to specific format
      const currentDate = new Date().toISOString().split('T')[0];

      const response = await axios.post<{ pengaduan: ResponseData }>(
        'https://api-sipa-capstone-production.up.railway.app/pengaduan',
        {
          lokasi: formData.lokasi,
          kronologi: formData.kronologi,
          tanggalLaporan: currentDate,
          tanggal: currentDate,
          bukti: '', // Send an empty string for bukti field
          umur: parseInt(formData.umur), // Convert umur to number
          gender: formData.gender,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('API Response:', response.data);

      // Store the response data for display
      if (response.data && response.data.pengaduan) {
        setResponseData(response.data.pengaduan);
        setIsSuccess(true);
      } else {
        throw new Error('Invalid response format from server');
      }
    } catch (error) {
      let message =
        'Terjadi kesalahan saat mengirim pengaduan. Silakan coba lagi.';

      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Error data:', error.response.data);
          console.log('Error status:', error.response.status);

          if (
            error.response.data &&
            (error.response.data as { message?: string }).message
          ) {
            message = `Error: ${(error.response.data as { message: string }).message}`;
          } else if (error.response.status === 500) {
            message = 'Server mengalami masalah. Silakan coba lagi nanti.';
          }
        } else if (error.request) {
          message =
            'Tidak ada respons dari server. Periksa koneksi internet Anda.';
        }
      } else if (error instanceof Error) {
        message = `Error: ${error.message}`;
      }

      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const copyToClipboard = () => {
    const kodePengaduan = responseData?.kode || '';
    navigator.clipboard.writeText(kodePengaduan);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Form progress indicator
  const renderProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  step >= num
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num}
              </div>
              <span className="text-xs mt-2 text-gray-500">
                {num === 1
                  ? 'Identifikasi'
                  : num === 2
                    ? 'Detail'
                    : 'Konfirmasi'}
              </span>
            </div>
          ))}
        </div>
        <div className="relative mt-2">
          <div className="absolute top-0 left-[10%] right-[10%] h-1 bg-gray-200 rounded"></div>
          <div
            className="absolute top-0 left-[10%] h-1 bg-purple-600 rounded transition-all duration-300"
            style={{ width: `${(step - 1) * 40}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Success message after form submission
  const renderSuccessMessage = () => {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center py-8"
      >
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <FaCheck className="text-green-600 text-4xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Pengaduan Berhasil Dibuat
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Pengaduan Anda telah diterima dan akan segera ditindaklanjuti oleh tim
          kami. Silakan simpan kode pengaduan berikut untuk memantau status
          kasus Anda.
        </p>

        <div className="mb-8">
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 flex items-center justify-between max-w-xs mx-auto">
            <span className="text-2xl font-mono font-bold text-purple-700 tracking-wider">
              {responseData?.kode || ''}
            </span>
            <button
              onClick={copyToClipboard}
              className="p-2 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 transition-colors"
              aria-label="Copy code"
            >
              {copied ? <FaCheck /> : <FaCopy />}
            </button>
          </div>
          {copied && (
            <p className="text-sm text-green-600 mt-2">
              Kode berhasil disalin!
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/">
            <Button variant="outline" className="flex items-center">
              <FaHome className="mr-2" /> Kembali ke Beranda
            </Button>
          </Link>
          <Link to="/status-pengaduan">
            <Button variant="primary" className="flex items-center">
              <FaSearch className="mr-2" /> Lihat Status Pengaduan
            </Button>
          </Link>
        </div>
      </motion.div>
    );
  };

  // Step 1: Initial Information
  const renderStep1 = () => {
    return (
      <>
        <div className="mb-6">
          <label
            htmlFor="tanggalLaporan"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Tanggal Laporan
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <input
              id="tanggalLaporan"
              name="tanggalLaporan"
              type="text"
              value={formData.tanggalLaporan}
              readOnly
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Tanggal laporan diisi otomatis dengan tanggal hari ini
          </p>
        </div>

        <div className="mb-6">
          <label
            htmlFor="umur"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Umur <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-gray-400" />
            </div>
            <input
              id="umur"
              name="umur"
              type="number"
              placeholder="Masukkan umur Anda"
              value={formData.umur}
              onChange={handleChange}
              required
              min="0"
              max="120"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="mb-6">
          <label
            htmlFor="gender"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Jenis Kelamin <span className="text-red-500">*</span>
          </label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
          >
            <option value="">Pilih Jenis Kelamin</option>
            <option value="laki-laki">Laki-laki</option>
            <option value="perempuan">Perempuan</option>
            <option value="lainnya">Lainnya</option>
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="lokasi"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Lokasi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaMapMarkerAlt className="text-gray-400" />
            </div>
            <input
              id="lokasi"
              name="lokasi"
              type="text"
              placeholder="Masukkan alamat lengkap kejadian"
              value={formData.lokasi}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors"
            />
          </div>
        </div>
      </>
    );
  };

  // Step 2: Incident Details
  const renderStep2 = () => {
    return (
      <>
        <div className="mb-6">
          <label
            htmlFor="kronologi"
            className="block text-gray-700 text-sm font-medium mb-2"
          >
            Kronologi Kejadian <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none">
              <FaFileAlt className="text-gray-400" />
            </div>
            <textarea
              id="kronologi"
              name="kronologi"
              rows={6}
              placeholder="Jelaskan kronologi kejadian secara detail"
              value={formData.kronologi}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
            />
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Berikan informasi sejelas mungkin tentang apa yang terjadi, kapan
            terjadinya, dan siapa saja yang terlibat
          </p>
        </div>
      </>
    );
  };

  // Step 3: Review Information
  const renderStep3 = () => {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-6">
        <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
          <h3 className="font-medium text-gray-700">Konfirmasi Pengaduan</h3>
          <p className="text-sm text-gray-500">
            Periksa kembali informasi yang Anda berikan sebelum mengirim laporan
          </p>
        </div>

        <div className="px-6 py-4 space-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">
              TANGGAL LAPORAN
            </h4>
            <p className="font-medium text-gray-800">
              {formData.tanggalLaporan}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">UMUR</h4>
            <p className="font-medium text-gray-800">{formData.umur} tahun</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">JENIS KELAMIN</h4>
            <p className="font-medium text-gray-800">{formData.gender}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">
              LOKASI KEJADIAN
            </h4>
            <p className="font-medium text-gray-800">{formData.lokasi}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">KRONOLOGI</h4>
            <p className="text-gray-800 whitespace-pre-line">
              {formData.kronologi}
            </p>
          </div>
        </div>

        <div className="bg-purple-50 px-6 py-4 border-t border-purple-100">
          <p className="text-sm text-purple-700">
            Dengan mengirimkan pengaduan ini, Anda menyatakan bahwa informasi
            yang diberikan adalah benar dan dapat dipertanggungjawabkan.
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="flex-grow pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#8B5CF6] to-[#6366F1] px-6 py-8 sm:px-10">
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Form Pengaduan
              </h1>
              <p className="mt-2 text-purple-100">
                Laporkan tindak kekerasan terhadap ibu dan anak untuk penanganan
                cepat
              </p>
            </div>

            {/* Form */}
            <div className="px-6 py-8 sm:px-10">
              {isSuccess ? (
                renderSuccessMessage()
              ) : (
                <form onSubmit={handleSubmit}>
                  {renderProgress()}

                  {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-lg">
                      <p className="text-red-600 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  {step === 1 && renderStep1()}
                  {step === 2 && renderStep2()}
                  {step === 3 && renderStep3()}

                  <div className="flex justify-between mt-8">
                    {step > 1 ? (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handlePrevStep}
                      >
                        Kembali
                      </Button>
                    ) : (
                      <Link to="/">
                        <Button variant="outline">Batal</Button>
                      </Link>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={isSubmitting}
                      className="relative"
                    >
                      {isSubmitting && (
                        <span className="absolute inset-0 flex items-center justify-center">
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                      )}
                      <span className={isSubmitting ? 'opacity-0' : ''}>
                        {step < 3 ? 'Lanjutkan' : 'Kirim Pengaduan'}
                      </span>
                    </Button>
                  </div>
                </form>
              )}
            </div>

            {/* Help Info */}
            {!isSuccess && (
              <div className="px-6 py-6 sm:px-10 bg-blue-50 border-t border-blue-100">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-blue-700">
                      Laporan Anda akan ditangani secara rahasia dan prioritas.
                      Simpan kode pengaduan untuk memantau status penanganan.
                    </p>
                    <p className="mt-2 text-sm text-blue-700">
                      <span className="font-medium">Butuh bantuan segera?</span>{' '}
                      Hubungi hotline kami di{' '}
                      <span className="font-medium">0800-123-88888</span> (24
                      jam)
                    </p>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FormPengaduan;
