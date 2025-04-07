import React, { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Ui/Button';
import Loading from '../components/Ui/Loading';

// Definisi tipe data user
interface User {
  email: string;
  role: 'admin' | 'user';
  token: string;
}

// Definisi format response dari server
interface LoginResponse {
  user?: User;
  token?: string;
  role?: 'admin' | 'user';
  message?: string;
}

const Login: React.FC = () => {
  // State untuk input form
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ingatSaya, setIngatSaya] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tampilPassword, setTampilPassword] = useState(false);
  
  // State untuk popup notifikasi
  const [tampilPopupSukses, setTampilPopupSukses] = useState(false);
  const [tampilPopupError, setTampilPopupError] = useState(false);
  const [pesanError, setPesanError] = useState('');
  const navigate = useNavigate();

  // Fungsi untuk memproses login
  const prosesLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTampilPopupError(false);

    try {
      // Kirim request ke API login
      const response: AxiosResponse<LoginResponse> = await axios.post(
        'https://api-sipa-capstone-production.up.railway.app/login',
        { email, password }
      );

      const data = response.data;

      // Cek apakah data user dan token ada dari response
      if (data.user && data.token) {
        const userData: User = {
          email: data.user.email || email,
          role: data.user.role || 'user',
          token: data.token,
        };

        // Simpan token dan role di localStorage untuk sesi
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', userData.role);

        // Tampilkan popup sukses
        setTampilPopupSukses(true);

        // Redirect otomatis setelah 1.8 detik
        setTimeout(() => {
          setTampilPopupSukses(false);
          if (userData.role === 'admin') {
            navigate('/dashboard');
          } else {
            navigate('/');
          }
        }, 1800);
      } else {
        throw new Error(data.message || 'Login gagal, coba lagi ya');
      }
    } catch (error) {
      // Handle berbagai jenis error
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<LoginResponse>;
        const errorMsg =
          axiosError.response?.data?.message ||
          axiosError.message ||
          'Email atau password salah, cek lagi ya';

        setPesanError(errorMsg);
        setTampilPopupError(true);
      } else {
        setPesanError('Ups, ada masalah teknis. Coba refresh halaman');
        setTampilPopupError(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle untuk memperlihatkan/menyembunyikan password
  const gantiTampilan = () => {
    setTampilPassword(!tampilPassword);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Popup Sukses */}
      <AnimatePresence>
        {tampilPopupSukses && (
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
              Yeay! Login Berhasil!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Error */}
      <AnimatePresence>
        {tampilPopupError && (
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
              {pesanError}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tombol kembali ke beranda */}
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
      
      {/* Form Login */}
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
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900">
                Masuk ke Akun Anda
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Belum punya akun?{' '}
                <Link
                  to="/register"
                  className="font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
            {isLoading && <Loading />}
            <form className="mt-8 space-y-6" onSubmit={prosesLogin}>
              <div className="space-y-4">
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
                      placeholder="email@contoh.com"
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
                      type={tampilPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#8B5CF6] focus:border-[#8B5CF6] transition-colors pr-10"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={gantiTampilan}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                    >
                      {tampilPassword ? (
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={ingatSaya}
                    onChange={(e) => setIngatSaya(e.target.checked)}
                    className="h-4 w-4 text-[#8B5CF6] focus:ring-[#8B5CF6] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ingat saya
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors"
                  >
                    Lupa kata sandi?
                  </Link>
                </div>
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
                  {isLoading ? 'Memproses...' : 'Masuk'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;