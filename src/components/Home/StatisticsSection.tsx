import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';

// Define interfaces for the data structure
interface ViolenceData {
  id: number;
  tahun: number;
  korban_laki: number;
  korban_perempuan: number;
  korban_total: number;
}

interface ChartData {
  name: string;
  'Korban Laki-laki': number;
  'Korban Perempuan': number;
  'Total Korban': number;
}

interface AnimatedCounterProps {
  value: number | string;
  suffix?: string;
  duration?: number;
}

const StatisticsSection: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<ViolenceData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<number>(0);
  const tabs = ['Semua Data', 'Berdasarkan Gender', 'Tren Tahunan'];

  // Handle navigation to pengaduan page
  const handleReportClick = () => {
    navigate('/pengaduan');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ViolenceData[]>('https://api-sipa-capstone-production.up.railway.app/data-kekerasan');
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate total victims across all years
  const totalVictims = data.reduce((acc, curr) => acc + curr.korban_total, 0);
  const totalMaleVictims = data.reduce((acc, curr) => acc + curr.korban_laki, 0);
  const totalFemaleVictims = data.reduce((acc, curr) => acc + curr.korban_perempuan, 0);
  
  // Calculate percentage increase from 2020 to 2024
  const calculateGrowth = (): number => {
    if (data.length < 5) return 0;
    const dataFrom2020To2024 = data.filter(item => item.tahun >= 2020 && item.tahun <= 2024);
    if (dataFrom2020To2024.length < 2) return 0;
    
    const startYear = dataFrom2020To2024.find(item => item.tahun === 2020);
    const endYear = dataFrom2020To2024.find(item => item.tahun === 2024);
    
    if (!startYear || !endYear) return 0;
    
    return parseFloat(((endYear.korban_total - startYear.korban_total) / startYear.korban_total * 100).toFixed(1));
  };

  // Format data for charts with custom colors
  const getChartData = (): ChartData[] => {
    return data.map(item => ({
      name: item.tahun.toString(),
      'Korban Laki-laki': item.korban_laki,
      'Korban Perempuan': item.korban_perempuan,
      'Total Korban': item.korban_total,
    }));
  };

  const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, suffix = '', duration = 2 }) => {
    const [count, setCount] = useState<number>(0);
    
    useEffect(() => {
      let startTime: number | null = null;
      const targetValue = typeof value === 'string' ? parseFloat(value) : value;
      let animationFrameId: number;
      
      const updateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const currentCount = Math.floor(progress * targetValue);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrameId = requestAnimationFrame(updateCount);
        } else {
          setCount(targetValue);
        }
      };
      
      animationFrameId = requestAnimationFrame(updateCount);
      
      return () => {
        cancelAnimationFrame(animationFrameId);
      };
    }, [value, duration]);
    
    return (
      <span className="text-3xl font-bold text-purple-600 tracking-tight">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center px-6 md:px-24 py-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="max-w-6xl mx-auto w-full z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">
            <span className="inline-block relative">
              Data Kekerasan di Indonesia
              <span className="text-purple-700"> 2020-2025</span>
              <motion.div
                className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-400 to-purple-600"
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
              ></motion.div>
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
            Visualisasi data statistik kasus kekerasan di Indonesia, menampilkan tren dan pola dari tahun 2020 hingga 2025.
          </p>

          {/* Key Stats Cards */}
          <div className="mt-10 flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <AnimatedCounter value={totalVictims} duration={2.5} />
              <span className="text-sm text-gray-500">Total Korban</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <AnimatedCounter value={calculateGrowth()} suffix="%" duration={2.5} />
              <span className="text-sm text-gray-500">Peningkatan 2020-2024</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex flex-col items-center px-6 py-4 bg-white rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              whileHover={{ y: -5 }}
            >
              <div className="flex gap-4">
                <div>
                  <span className="text-3xl font-bold text-pink-500 tracking-tight">
                    {totalVictims > 0 ? ((totalFemaleVictims / totalVictims) * 100).toFixed(1) : '0'}%
                  </span>
                  <span className="block text-sm text-gray-500">Perempuan</span>
                </div>
                <div>
                  <span className="text-3xl font-bold text-blue-500 tracking-tight">
                    {totalVictims > 0 ? ((totalMaleVictims / totalVictims) * 100).toFixed(1) : '0'}%
                  </span>
                  <span className="block text-sm text-gray-500">Laki-laki</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-purple-100 rounded-lg">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === index
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'text-purple-600 hover:bg-purple-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Charts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="bg-white p-6 rounded-2xl shadow-lg mb-10"
        >
          {activeTab === 0 && (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={getChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="Total Korban" 
                    stroke="#8844d4" 
                    strokeWidth={3} 
                    dot={{ r: 6 }}
                    activeDot={{ r: 8, stroke: '#8844d4', strokeWidth: 2, fill: '#fff' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Korban Perempuan" 
                    stroke="#ec4899" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="Korban Laki-laki" 
                    stroke="#3b82f6" 
                    strokeWidth={2}
                    dot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 1 && (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Korban Perempuan" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Korban Laki-laki" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 2 && (
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={getChartData()}
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '8px',
                      borderColor: '#d1d5db',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Total Korban" fill="#8844d4" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Kasus kekerasan terus meningkat setiap tahun. Mari berperan aktif dalam mencegah dan melaporkan kasus kekerasan.
          </p>
          <button 
            onClick={handleReportClick}
            className="px-8 py-3 bg-purple-600 text-white font-medium rounded-lg shadow-lg hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1"
          >
            Laporkan Kasus Kekerasan
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default StatisticsSection;