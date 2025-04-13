import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaPaperPlane, FaRobot, FaUser, FaSignOutAlt } from 'react-icons/fa';
import Button from '../components/Ui/Button';

// Define message interface
interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Pelayanan = () => {
  // State untuk menyimpan pesan chat
  const [chatHistory, setChatHistory] = useState<Message[]>([
    {
      id: 1,
      text: "Halo! Saya adalah SIPA Assistant. Ada yang bisa saya bantu terkait perlindungan anak?",
      sender: "bot",
      timestamp: new Date()
    }
  ]);
  
  // State untuk input pesan
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [showErrorBanner, setShowErrorBanner] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Effect untuk cek login status
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setIsLoggedIn(true);
        setUserName(user.email?.split('@')[0] || 'Pengguna');
      } catch (error) {
        console.error("Error parsing user data", error);
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  // Effect untuk auto-scroll ke pesan terbaru
  useEffect(() => {
    scrollToLatestChat();
  }, [chatHistory]);

  const scrollToLatestChat = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle kirim pesan
  const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!userInput.trim()) return;
    
    const userMessage: Message = {
      id: chatHistory.length + 1,
      text: userInput,
      sender: "user",
      timestamp: new Date()
    };
    
    setChatHistory(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);
    
    try {
      // ini api yang sebenarnya
      const response = await axios.post('https://api-sipa-capstone-production.up.railway.app/ask-model', {
        question: userInput
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      
      const botMessage: Message = {
        id: chatHistory.length + 2,
        text: response.data.answer || "Maaf, saya tidak dapat menjawab pertanyaan itu sekarang.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, botMessage]);
      setShowErrorBanner(false);
    } catch (error) {
      console.error("Error fetching response from chatbot:", error);
      
      // Pesan error
      const errorMessage: Message = {
        id: chatHistory.length + 2,
        text: "Maaf, terjadi kesalahan saat memproses pertanyaan Anda. Silakan coba lagi nanti.",
        sender: "bot",
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, errorMessage]);
      setShowErrorBanner(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle akhiri sesi chat
  const handleEndChat = () => {
    // Tampilkan modal konfirmasi yang menarik
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
      <div class="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transform transition-all animate-fadeIn">
        <div class="text-center mb-4">
          <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-violet-100 mb-4">
            <svg class="h-8 w-8 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-lg font-bold text-gray-900 mb-1">Akhiri Percakapan</h3>
          <p class="text-sm text-gray-600">Apakah Anda yakin ingin mengakhiri percakapan dengan SIPA Assistant? Semua pesan akan hilang.</p>
        </div>
        <div class="flex gap-3 mt-6">
          <button id="cancel-chat-end" class="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors">
            Lanjutkan Chat
          </button>
          <button id="confirm-chat-end" class="flex-1 py-2 px-4 bg-violet-600 rounded-lg text-sm font-medium text-white hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors">
            Akhiri Chat
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Tambahkan animasi
    document.getElementById('confirm-chat-end')?.addEventListener('click', () => {
      const modalContent = modal.querySelector('div');
      if (modalContent) {
        modalContent.classList.remove('animate-fadeIn');
        modalContent.classList.add('animate-fadeOut');
        setTimeout(() => {
          document.body.removeChild(modal);
          navigate('/');
        }, 300);
      }
    });
    
    document.getElementById('cancel-chat-end')?.addEventListener('click', () => {
      const modalContent = modal.querySelector('div');
      if (modalContent) {
        modalContent.classList.remove('animate-fadeIn');
        modalContent.classList.add('animate-fadeOut');
        setTimeout(() => {
          document.body.removeChild(modal);
        }, 300);
      }
    });
    
    // Tambahkan CSS untuk animasi jika belum ada
    if (!document.getElementById('animation-styles')) {
      const style = document.createElement('style');
      style.id = 'animation-styles';
      style.innerHTML = `
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeOut {
          from { opacity: 1; transform: scale(1); }
          to { opacity: 0; transform: scale(0.95); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-fadeOut {
          animation: fadeOut 0.3s ease-in forwards;
        }
      `;
      document.head.appendChild(style);
    }
  };

  // Navigasi ke login
  const navigateToLogin = () => {
    navigate('/login', { state: { from: '/pelayanan' } });
  };

  // Format timestamp
  const formatTime = (timestamp: Date) => {
    return new Date(timestamp).toLocaleTimeString('id-ID', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Jika belum login, tampilkan halaman login required
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
          <div className="text-center mb-6">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-[#8B5CF6]/10 mb-4">
              <FaRobot className="h-8 w-8 text-[#8B5CF6]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Layanan Chatbot SIPA
            </h2>
            <p className="text-gray-600">
              Silakan login terlebih dahulu untuk mengakses layanan chatbot kami.
            </p>
          </div>
          
          <div className="mt-8">
            <Button
              variant="primary"
              fullWidth
              onClick={navigateToLogin}
              icon={<FaUser />}
            >
              Login untuk Melanjutkan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] flex flex-col pt-20 pb-4 px-4">
      {/* Error Banner */}
      {showErrorBanner && (
        <div className="fixed top-20 inset-x-0 flex justify-center z-50 px-4 animate-fadeIn">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-md flex items-center max-w-md">
            <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="flex-1 text-sm">Ada masalah koneksi ke server. Pastikan Anda terhubung ke internet.</span>
            <button 
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => setShowErrorBanner(false)}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      {/* Header */}
      <div className="bg-white rounded-t-xl shadow-md p-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#8B5CF6]/10 flex items-center justify-center mr-3">
            <FaRobot className="text-[#8B5CF6] text-lg" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900">SIPA Assistant</h2>
            <p className="text-xs text-gray-500">Siap membantu Anda 24/7</p>
          </div>
        </div>
        <div>
          <Button
            variant="danger"
            size="sm"
            onClick={handleEndChat}
            icon={<FaSignOutAlt />}
          >
            Akhiri Chat
          </Button>
        </div>
      </div>
      
      {/* Chat Messages Area */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 bg-gray-50 p-4 overflow-y-auto" 
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        <div className="space-y-4">
          {chatHistory.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`
                max-w-xs md:max-w-md lg:max-w-lg rounded-lg p-3 
                ${message.sender === 'user' 
                  ? 'bg-[#8B5CF6] text-white rounded-tr-none' 
                  : 'bg-white text-gray-800 rounded-tl-none shadow-md'}
              `}>
                <div className="flex items-center mb-1">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2">
                    {message.sender === 'user' 
                      ? <FaUser className="text-white/80 text-xs" /> 
                      : <FaRobot className="text-[#8B5CF6] text-xs" />
                    }
                  </div>
                  <span className={`text-xs ${message.sender === 'user' ? 'text-white/80' : 'text-gray-500'}`}>
                    {message.sender === 'user' ? userName : 'SIPA Assistant'} • {formatTime(message.timestamp)}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white rounded-lg p-4 rounded-tl-none shadow-md">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "100ms" }}></div>
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="bg-white rounded-b-xl shadow-md p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ketik pesan Anda di sini..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8B5CF6] focus:border-transparent"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            disabled={isLoading || !userInput.trim()}
            icon={<FaPaperPlane />}
          >
            Kirim
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Pelayanan;