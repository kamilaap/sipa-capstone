import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Define a clear type for the API response
interface Article {
  id: number;
  judul: string;
  isi: string;
  kategori: string | null;
}

const Articles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await axios.get<Article[]>(
          'https://api-sipa-capstone-production.up.railway.app/artikel'
        );

        setArticles(response.data);
        setLoading(false);
      } catch (err) {
        setError('Gagal mengambil artikel');
        setLoading(false);
        console.error('Error fetching articles:', err);
      }
    };

    fetchArticles();
  }, []);

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-16">
        <div className="mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 mx-auto"
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
        </div>
        {error}
      </div>
    );
  }

  // Display only the first 3 articles
  const displayedArticles = articles.slice(0, 3);

  return (
    <div id="articles-section" className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">
            Artikel Terbaru Kami
          </h2>
          <div className="w-16 h-1 bg-purple-500 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Temukan berbagai informasi terkini dan panduan berguna seputar
            perlindungan ibu dan anak.
          </p>
        </div>

        {displayedArticles.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Tidak ada artikel yang tersedia saat ini.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {displayedArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
              >
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {article.judul}
                  </h3>

                  <motion.div
                    animate={{
                      height: expandedId === article.id ? 'auto' : '4.5rem',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 text-sm">{article.isi}</p>
                  </motion.div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => toggleExpand(article.id)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium flex items-center focus:outline-none"
                    >
                      {expandedId === article.id
                        ? 'Tutup'
                        : 'Baca selengkapnya'}
                      <motion.svg
                        animate={{
                          rotate: expandedId === article.id ? 180 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </motion.svg>
                    </button>

                    <Link
                      to={`/artikel/${article.id}`}
                      className="text-sm text-gray-500 hover:text-purple-600 transition-colors"
                    ></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/artikel"
            className="inline-flex items-center px-5 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded transition-colors"
          >
            Lihat Semua Artikel
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Articles;
