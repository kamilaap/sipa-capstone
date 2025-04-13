import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Ui/Button';

const Register: React.FC = () => {
  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);
    setShowErrorPopup(false);

    // Check password length - minimum 8 characters
    if (password.length < 8) {
      setErrorMessage('Password harus minimal 8 karakter!');
      setShowErrorPopup(true);
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Password dan konfirmasi password tidak sama!');
      setShowErrorPopup(true);
      setIsLoading(false);
      return;
    }

    //user validasi gamil adn yahuuu
    if (!email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com')) {
      setErrorMessage(
        'email Anda harus berakhiran dengan gmail.com atau yahoo.com !'
      );
      setShowErrorPopup(true);
      setIsLoading(false);
      return;
    }

    // if (!email.endsWith("@gmail.com" && !email.endsWith("@yahoo.com"))) {
    //   setErrorMessage("email Anda harus berakhiran dengan gmail.com atau yahoo.com !");
    //   setIsLoading(false);
    //   return;
    // }

    try {
      await axios.post(
        'https://api-sipa-capstone-production.up.railway.app/register',
        { nama, email, password, confirmPassword }
      );

      // Show success popup instead of alert
      setShowSuccessPopup(true);

      // Navigate after delay
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/login');
      }, 2000);
    } catch (error) {
      // Handle error from axios
      if (axios.isAxiosError(error)) {
        // Error response from server
        const errorMsg = error.response?.data?.message || 'Gagal Mendaftar!';
        setErrorMessage(errorMsg);
        setShowErrorPopup(true);
      } else {
        // Network error or unexpected issue
        setErrorMessage('Terjadi kesalahan tidak terduga');
        setShowErrorPopup(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Success Popup */}
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Pendaftaran Berhasil!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error Popup */}
      <AnimatePresence>
        {showErrorPopup && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed top-4 right-4 z-50"
          >
            <div className="bg-red-500 text-white px-6 py-4 rounded-lg shadow-xl flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {errorMessage}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to Home button */}
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          }
        >
          Kembali ke Beranda
        </Button>
      </div>

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-4 h-4 bg-[#C084FC] rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-[#A78BFA] rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-20 right-20 w-5 h-5 bg-[#FF8C00] rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/5 w-7 h-7 bg-[#DDD6FE] rounded-full animate-pulse opacity-60"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 relative z-10"
      >
        <div className="relative">
          <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-lg"></div>
          <div className="bg-white p-8 rounded-xl shadow-xl relative">
            <div className="text-center mb-6">
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#8B5CF6]/10 mb-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-[#8B5CF6]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900">
                Buat Akun Baru
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sudah punya akun?{' '}
                <Link
                  to="/login"
                  className="font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                >
                  Masuk sekarang
                </Link>
              </p>
            </div>

            {/* Error Message - can be removed since we have popup now */}
            {errorMessage && !showErrorPopup && (
              <div className="mb-4 p-3 bg-red-50 border border-red-300 text-red-800 rounded-lg text-sm">
                {errorMessage}
              </div>
            )}

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {/* Rest of the form remains the same */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="nama"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Lengkap
                  </label>
                  <div className="mt-1">
                    <input
                      id="nama"
                      name="nama"
                      type="text"
                      autoComplete="name"
                      required
                      value={nama}
                      onChange={(e) => setNama(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors"
                      placeholder="Nama Lengkap"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Alamat Email
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors"
                      placeholder="email@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kata Sandi
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Minimal 8 karakter
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Konfirmasi Kata Sandi
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="agree-terms"
                  name="agree-terms"
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="h-4 w-4 text-[#8B5CF6] focus:ring-[#8B5CF6] border-gray-300 rounded"
                  required
                />
                <label
                  htmlFor="agree-terms"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Saya setuju dengan{' '}
                  <Link to="/terms" className="text-[#8B5CF6] hover:underline">
                    Syarat dan Ketentuan
                  </Link>{' '}
                  serta{' '}
                  <Link
                    to="/privacy"
                    className="text-[#8B5CF6] hover:underline"
                  >
                    Kebijakan Privasi
                  </Link>
                </label>
              </div>

              <div>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-full flex justify-center"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  ) : null}
                  {isLoading ? 'Memproses...' : 'Daftar'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;