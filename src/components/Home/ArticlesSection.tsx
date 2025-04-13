import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

// Interface untuk data artikel dari API
interface ArtikelData {
  id: number;
  judul: string;
  isi: string;
  kategori: string | null;
}

const ArtikelTerbaru: React.FC = () => {
  // State untuk menyimpan data dan status
  const [daftarArtikel, setDaftarArtikel] = useState<ArtikelData[]>([]);
  const [sedangMuat, setSedangMuat] = useState(true);
  const [pesanError, setPesanError] = useState<string | null>(null);
  const [artikelTerbuka, setArtikelTerbuka] = useState<number | null>(null);

  // Ambil data artikel saat komponen dimuat
  useEffect(() => {
    const ambilDataArtikel = async () => {
      try {
        setSedangMuat(true);
        // Link API bisa diganti sesuai kebutuhan project
        const response = await axios.get<ArtikelData[]>(
          'https://api-sipa-capstone-production.up.railway.app/artikel'
        );

        setDaftarArtikel(response.data);
        setSedangMuat(false);
      } catch (err) {
        setPesanError('Gagal mengambil artikel. Coba refresh halaman.');
        setSedangMuat(false);
        console.error('Error saat mengambil data:', err);
      }
    };

    ambilDataArtikel();
  }, []);

  // Fungsi untuk membuka/tutup artikel
  const bukaArtikel = (id: number) => {
    setArtikelTerbuka(artikelTerbuka === id ? null : id);
  };

  // Tampilan saat loading
  if (sedangMuat) {
    return (
      <div className="flex justify-center items-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // Tampilan ketika terjadi error
  if (pesanError) {
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
        {pesanError}
      </div>
    );
  }

  // Hanya tampilkan 3 artikel teratas
  const artikelDitampilkan = daftarArtikel.slice(0, 3);

  return (
    <div id="bagian-artikel" className="bg-white py-16">
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

        {artikelDitampilkan.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Belum ada artikel yang tersedia saat ini. Cek kembali nanti ya!
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {artikelDitampilkan.map((artikel) => (
              <motion.div
                key={artikel.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow"
              >
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 text-gray-800">
                    {artikel.judul}
                  </h3>

                  <motion.div
                    animate={{
                      height: artikelTerbuka === artikel.id ? 'auto' : '4.5rem',
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-gray-600 text-sm">{artikel.isi}</p>
                  </motion.div>

                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => bukaArtikel(artikel.id)}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center focus:outline-none"
                    >
                      {artikelTerbuka === artikel.id
                        ? 'Tutup'
                        : 'Baca selengkapnya'}
                      <motion.svg
                        animate={{
                          rotate: artikelTerbuka === artikel.id ? 180 : 0,
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
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            to="/artikel"
            className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          >
            Lihat Semua Artikel
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2"
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

export default ArtikelTerbaru;
