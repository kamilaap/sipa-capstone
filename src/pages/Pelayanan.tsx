import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Ui/Navbar';
import Footer from '../components/Ui/Footer';
import { FaSignOutAlt, FaTimes, FaRobot, FaSignInAlt } from 'react-icons/fa';

interface ApiResponse {
  original_question: string;
  translated_question: string;
  context: string;
  model_input: string;
  output: string;
}

const Pelayanan: React.FC = () => {
  const [messages, setMessages] = useState<
    Array<{
      text: string | ApiResponse;
      sender: 'user' | 'bot' | 'loading' | 'response-details';
      id: number;
    }>
  >([]);

  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [openDetailId, setOpenDetailId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('userName');

    if (!token) {
      setIsLoggedIn(false);

      setMessages([
        {
          text: 'Selamat datang di layanan chatbot SIPA. Silakan login untuk menggunakan layanan ini.',
          sender: 'bot',
          id: Date.now(),
        },
      ]);
      return;
    }

    setIsLoggedIn(true);
    setUserName(name || 'Pengguna');

    setMessages([
      {
        text: `Halo ${name || 'Pengguna'}! Saya adalah chatbot SIPA. Apa yang ingin Anda tanyakan tentang perlindungan anak?`,
        sender: 'bot',
        id: Date.now(),
      },
    ]);
  }, [navigate]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || !isLoggedIn) return;
  
    const userMessageId = Date.now();
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: inputValue, sender: 'user', id: userMessageId },
    ]);
  
    const loadingMessageId = userMessageId + 1;
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: 'Memproses...', sender: 'loading', id: loadingMessageId },
    ]);
  
    setInputValue('');
    setIsLoading(true);
  
    try {
      // Add a timeout to the request
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
  
      const response = await axios.post('/api/generate', {
        question: inputValue,
      }, {
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        timeout: 30000 // 30 seconds timeout
      });
  
      clearTimeout(timeoutId);
      console.log('API Response:', response.data);
  
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.id !== loadingMessageId),
        { text: response.data, sender: 'response-details', id: Date.now() },
      ]);
    } catch (error) {
      console.error('Error details:', error);
      
      let errorMessage = 'Maaf, terjadi kesalahan saat menghubungi API.';
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
          errorMessage = 'Permintaan timeout. Server API mungkin sedang sibuk atau tidak tersedia.';
        } else if (error.response) {
          // The request was made and the server responded with a status code
          errorMessage = `Error ${error.response.status}: ${error.response.statusText}`;
        }
      }
  
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.id !== loadingMessageId),
        {
          text: errorMessage,
          sender: 'bot',
          id: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isLoading && isLoggedIn) {
      sendMessage();
    }
  };

  const toggleDetails = (id: number) => {
    if (openDetailId === id) {
      setOpenDetailId(null);
    } else {
      setOpenDetailId(id);
    }
  };

  const endChat = () => {
    if (!isLoggedIn) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        text: 'Terima kasih telah menggunakan layanan chatbot SIPA. Sampai jumpa kembali!',
        sender: 'bot',
        id: Date.now(),
      },
    ]);

    setTimeout(() => {
      setMessages([
        {
          text: `Halo ${userName}! Saya adalah chatbot SIPA. Apa yang ingin Anda tanyakan tentang perlindungan anak?`,
          sender: 'bot',
          id: Date.now(),
        },
      ]);
    }, 2000);
  };

  const redirectToLogin = () => {
    navigate('/login');
  };

  const exitToHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4 pt-24 pb-16">
        <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <FaRobot className="h-6 w-6" />
                </div>
                <h1 className="text-xl font-bold">SIPA Chatbot</h1>
              </div>

              <div className="flex space-x-2">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={endChat}
                      className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      title="Akhiri percakapan"
                    >
                      <FaTimes className="text-sm" />
                      <span className="text-sm">Akhiri Chat</span>
                    </button>

                    <button
                      onClick={exitToHome}
                      className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      title="Kembali ke beranda"
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span className="text-sm">Keluar</span>
                    </button>
                  </>
                ) : (
                  <button
                    onClick={redirectToLogin}
                    className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                    title="Login untuk menggunakan chatbot"
                  >
                    <FaSignInAlt className="text-sm" />
                    <span className="text-sm">Login</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {!isLoggedIn && (
            <div className="p-6 bg-yellow-50 border-b border-yellow-100">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-100 rounded-full p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Anda belum login
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <p>
                      Silakan login untuk menggunakan layanan chatbot SIPA.
                      <button
                        onClick={redirectToLogin}
                        className="ml-2 font-medium text-yellow-800 underline hover:text-yellow-900"
                      >
                        Login sekarang
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div
            ref={chatBoxRef}
            className="h-96 overflow-y-auto p-6 bg-gray-50 space-y-4"
            style={{ scrollBehavior: 'smooth' }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === 'user'
                    ? 'justify-end'
                    : message.sender === 'loading'
                      ? 'justify-center'
                      : 'justify-start'
                }`}
              >
                {message.sender === 'user' && (
                  <div className="flex items-start space-x-2 max-w-xs md:max-w-md">
                    <div className="order-2 bg-purple-100 rounded-2xl rounded-tr-none py-3 px-4 text-gray-800 shadow-sm">
                      {message.text as string}
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 order-1">
                      <img
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=8B5CF6&color=fff`}
                        alt={userName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}

                {message.sender === 'bot' && (
                  <div className="flex items-start space-x-2 max-w-xs md:max-w-md">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <FaRobot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none py-3 px-4 text-gray-700 shadow-sm">
                      {message.text as string}
                    </div>
                  </div>
                )}

                {message.sender === 'loading' && (
                  <div className="flex justify-center items-center space-x-1 px-4 py-2 rounded-full bg-gray-100">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                  </div>
                )}

                {message.sender === 'response-details' && (
                  <div className="flex items-start space-x-2 max-w-xs md:max-w-md">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <FaRobot className="h-4 w-4 text-white" />
                    </div>
                    <div className="bg-white rounded-2xl rounded-tl-none py-3 px-4 text-gray-700 shadow-sm">
                      <div>
                        {typeof message.text === 'object' &&
                        'output' in message.text &&
                        message.text.output
                          ? message.text.output
                          : typeof message.text === 'object' &&
                              'model_input' in message.text &&
                              message.text.model_input
                            ? message.text.model_input
                            : 'Tidak ada jawaban yang tersedia.'}
                      </div>

                      <div className="mt-3 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => toggleDetails(message.id)}
                          className="text-xs bg-gray-100 hover:bg-gray-200 rounded-full px-3 py-1 text-gray-600 transition-colors"
                        >
                          {openDetailId === message.id
                            ? 'Sembunyikan Detail'
                            : 'Lihat Detail'}
                        </button>

                        {openDetailId === message.id &&
                          typeof message.text === 'object' && (
                            <div className="mt-2 bg-gray-50 p-3 rounded text-xs whitespace-pre-wrap border border-gray-100">
                              <div className="mb-1">
                                <strong className="text-purple-600">
                                  Original:
                                </strong>{' '}
                                {
                                  (message.text as ApiResponse)
                                    .original_question
                                }
                              </div>
                              <div className="mb-1">
                                <strong className="text-purple-600">
                                  Translated:
                                </strong>{' '}
                                {
                                  (message.text as ApiResponse)
                                    .translated_question
                                }
                              </div>
                              <div>
                                <strong className="text-purple-600">
                                  Context:
                                </strong>{' '}
                                {(message.text as ApiResponse).context}
                              </div>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex rounded-xl border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-purple-500 focus-within:border-transparent">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={
                  isLoggedIn
                    ? 'Ketik pertanyaan Anda...'
                    : 'Silakan login untuk menggunakan chatbot'
                }
                className="flex-1 py-3 px-4 focus:outline-none text-gray-700"
                disabled={isLoading || !isLoggedIn}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim() || !isLoggedIn}
                className={`bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 flex items-center justify-center transition-colors ${
                  isLoading || !inputValue.trim() || !isLoggedIn
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:from-purple-700 hover:to-indigo-700'
                }`}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center space-x-1">
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: '0ms' }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: '150ms' }}
                    ></div>
                    <div
                      className="w-1 h-1 bg-white rounded-full animate-bounce"
                      style={{ animationDelay: '300ms' }}
                    ></div>
                  </div>
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
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                )}
              </button>
            </div>
            <div className="mt-2 text-xs text-gray-500 text-center">
              SIPA chatbot akan memberikan informasi terkait layanan
              perlindungan anak
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Pelayanan;
