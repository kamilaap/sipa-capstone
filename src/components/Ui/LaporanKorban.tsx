import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  Eye,
  Edit2,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import Sidebar from './SideBar';

 //Interface untuk data status pengaduan dari API
interface StatusPengaduan {
  id: number;
  status: string;
  keterangan: string;
}

 //Interface utama untuk data pengaduan dari API
interface Pengaduan {
  id: number;
  kode: string;
  tanggal: string;
  umur: number;
  gender: string | null;
  lokasi: string;
  kronologi: string;
  bukti: string;
  status_pengaduan_id: number;
  status_pengaduan: StatusPengaduan;
}

/**
 * Komponen Halaman Laporan Korban
 * Menampilkan daftar pengaduan kekerasan dan fitur untuk admin
 * mengubah status dan melihat detail laporan
 */
const LaporanKorban: React.FC = () => {
  const navigate = useNavigate();
  // State untuk daftar pengaduan
  const [daftarPengaduan, setPengaduanList] = useState<Pengaduan[]>([]);
  const [pengaduanYangDipilih, setSelectedPengaduan] =
    useState<Pengaduan | null>(null);
  const [detailPengaduan, setDetailPengaduan] = useState<Pengaduan | null>(
    null
  );

  // State untuk modal dan notifikasi
  const [modalStatusTerbuka, setIsStatusModalOpen] = useState(false);
  const [statusYangDipilih, setSelectedStatus] = useState<string | null>(null);
  const [catatanKeterangan, setKeterangan] = useState('');
  const [statusModal, setModalStatus] = useState<'success' | 'error' | null>(
    null
  );
  const [pesanError, setErrorMessage] = useState('');

  // State untuk pagination
  const [halamanSaatIni, setCurrentPage] = useState(1);
  const [jumlahItemPerHalaman] = useState(10);

  // Deskripsi status untuk membantu petugas memahami setiap status
  const DESKRIPSI_STATUS = {
    antre: {
      status: 'antre',
      keterangan: 'Laporan telah diterima dan menunggu proses lebih lanjut',
    },
    proses: {
      status: 'proses',
      keterangan: 'Tim sedang melakukan investigasi dan tindak lanjut laporan',
    },
    selesai: {
      status: 'selesai',
      keterangan: 'Laporan telah diselesaikan dan ditindaklanjuti',
    },
  };

  // Cek autentikasi dan ambil data saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    ambilDataPengaduan();
  }, [navigate]);

  /**
   * Mengambil data pengaduan dari API
   */
  const ambilDataPengaduan = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        'https://api-sipa-capstone-production.up.railway.app/data-pengaduan',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPengaduanList(response.data);
      setCurrentPage(1); // Reset ke halaman pertama saat data baru diambil
    } catch (error) {
      console.error('Gagal mengambil data pengaduan:', error);
      // Tambahan: Kita bisa menambahkan notifikasi error di sini
    }
  };

  /**
   * Menampilkan badge status dengan warna sesuai jenisnya
   */
  const tampilkanBadgeStatus = (status: string) => {
    const warnaStatus = {
      antre: 'bg-blue-100 text-blue-800',
      proses: 'bg-amber-100 text-amber-800',
      selesai: 'bg-emerald-100 text-emerald-800',
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${warnaStatus[status as keyof typeof warnaStatus]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  /**
   * Handler untuk memperbarui status pengaduan
   */
  const handleUpdateStatus = async () => {
    if (!pengaduanYangDipilih || !statusYangDipilih) return;

    try {
      const token = localStorage.getItem('token');
      const deskripsiStatus =
        DESKRIPSI_STATUS[statusYangDipilih as keyof typeof DESKRIPSI_STATUS];

      await axios.put(
        `https://api-sipa-capstone-production.up.railway.app/pengaduan/${pengaduanYangDipilih.status_pengaduan_id}`,
        {
          status: statusYangDipilih,
          keterangan: catatanKeterangan || deskripsiStatus.keterangan,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Refresh data setelah update
      await ambilDataPengaduan();

      // Tampilkan notifikasi sukses
      setModalStatus('success');

      // Reset state setelah delay
      setTimeout(() => {
        setSelectedPengaduan(null);
        setIsStatusModalOpen(false);
        setSelectedStatus(null);
        setKeterangan('');
        setModalStatus(null);
      }, 2000);
    } catch (error) {
      console.error('Gagal memperbarui status:', error);

      // Tampilkan notifikasi error
      setModalStatus('error');
      setErrorMessage('Gagal memperbarui status. Silakan coba lagi.');

      setTimeout(() => {
        setModalStatus(null);
        setErrorMessage('');
      }, 2000);
    }
  };

  // Kalkulasi untuk pagination
  const indexItemTerakhir = halamanSaatIni * jumlahItemPerHalaman;
  const indexItemPertama = indexItemTerakhir - jumlahItemPerHalaman;
  const itemHalamanIni = daftarPengaduan.slice(
    indexItemPertama,
    indexItemTerakhir
  );
  const totalHalaman = Math.ceil(daftarPengaduan.length / jumlahItemPerHalaman);

  // Handler navigasi pagination
  const keHalamanBerikutnya = () => {
    if (halamanSaatIni < totalHalaman) {
      setCurrentPage(halamanSaatIni + 1);
    }
  };

  const keHalamanSebelumnya = () => {
    if (halamanSaatIni > 1) {
      setCurrentPage(halamanSaatIni - 1);
    }
  };

  const keHalaman = (nomorHalaman: number) => {
    setCurrentPage(nomorHalaman);
  };

  // Membuat nomor pagination yang ditampilkan
  const renderNomorPagination = () => {
    const nomorHalaman = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(
      1,
      halamanSaatIni - Math.floor(maxPagesToShow / 2)
    );
    const endPage = Math.min(totalHalaman, startPage + maxPagesToShow - 1);

    // Pastikan kita selalu menampilkan maxPagesToShow jika ada cukup halaman
    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      nomorHalaman.push(
        <button
          key={i}
          onClick={() => keHalaman(i)}
          className={`px-3 py-1 mx-1 rounded ${
            halamanSaatIni === i
              ? 'bg-ungu-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {i}
        </button>
      );
    }

    return nomorHalaman;
  };

  // Komponen modal notifikasi sukses
  const renderModalSukses = () => {
    if (statusModal !== 'success') return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
          <CheckCircle className="mx-auto mb-4 text-emerald-500" size={64} />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Berhasil</h3>
          <p className="text-gray-600">Status laporan berhasil diperbarui</p>
        </div>
      </div>
    );
  };

  // Komponen modal notifikasi error
  const renderModalError = () => {
    if (statusModal !== 'error') return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
          <XCircle className="mx-auto mb-4 text-red-500" size={64} />
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Gagal</h3>
          <p className="text-gray-600">{pesanError}</p>
        </div>
      </div>
    );
  };

  // Komponen modal detail pengaduan
  const renderModalDetail = () => {
    if (!detailPengaduan) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-bold mb-4 text-gray-800">
            Detail Laporan
          </h3>

          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-600">Kode Laporan:</span>
              <p>{detailPengaduan.kode}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Tanggal:</span>
              <p>{new Date(detailPengaduan.tanggal).toLocaleString()}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Umur Korban:</span>
              <p>{detailPengaduan.umur} tahun</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Lokasi Kejadian:
              </span>
              <p>{detailPengaduan.lokasi}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">Kronologi:</span>
              <p className="whitespace-pre-line">{detailPengaduan.kronologi}</p>
            </div>
            <div>
              <span className="font-semibold text-gray-600">
                Status Penanganan:
              </span>
              {tampilkanBadgeStatus(detailPengaduan.status_pengaduan.status)}
            </div>
          </div>

          <button
            onClick={() => setDetailPengaduan(null)}
            className="mt-6 w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  };

  // Komponen modal ubah status
  const renderModalUpdateStatus = () => {
    if (!pengaduanYangDipilih) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-8 rounded-2xl shadow-2xl w-[500px] space-y-6">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-4">
            Ubah Status Laporan
          </h3>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="status"
                className="block text-gray-700 font-semibold mb-2"
              >
                Pilih Status Baru
              </label>
              <div className="grid grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setSelectedStatus('antre');
                    setIsStatusModalOpen(true);
                  }}
                  className={`py-3 rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2 ${
                    statusYangDipilih === 'antre'
                      ? 'bg-blue-600 text-white'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <span>Antre</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('proses');
                    setIsStatusModalOpen(true);
                  }}
                  className={`py-3 rounded-lg hover:bg-amber-600 transition flex items-center justify-center space-x-2 ${
                    statusYangDipilih === 'proses'
                      ? 'bg-amber-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  <span>Proses</span>
                </button>
                <button
                  onClick={() => {
                    setSelectedStatus('selesai');
                    setIsStatusModalOpen(true);
                  }}
                  className={`py-3 rounded-lg hover:bg-emerald-600 transition flex items-center justify-center space-x-2 ${
                    statusYangDipilih === 'selesai'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-emerald-500 text-white'
                  }`}
                >
                  <span>Selesai</span>
                </button>
              </div>
            </div>
          </div>

          {modalStatusTerbuka && (
            <div className="mt-6">
              <label
                htmlFor="keterangan"
                className="block text-gray-700 font-semibold mb-2"
              >
                Keterangan Tambahan
              </label>
              <textarea
                id="keterangan"
                value={catatanKeterangan}
                onChange={(e) => setKeterangan(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                placeholder={`Contoh: ${DESKRIPSI_STATUS[statusYangDipilih as keyof typeof DESKRIPSI_STATUS]?.keterangan || 'Masukkan keterangan status...'}`}
              />
              <div className="flex space-x-4 mt-6">
                                <button 
                                    onClick={handleUpdateStatus}
                                    className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
                                >
                                    Simpan Perubahan
                                </button>
                <button
                  onClick={() => {
                    setIsStatusModalOpen(false);
                    setSelectedStatus(null);
                    setKeterangan('');
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto w-full">
        <div className="bg-white p-6 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Laporan Korban Kekerasan
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full bg-white border rounded-lg">
              <thead className="bg-ungu-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left">Kode</th>
                  <th className="py-3 px-4 text-left">Tanggal</th>
                  <th className="py-3 px-4 text-left">Lokasi</th>
                  <th className="py-3 px-4 text-left">Status</th>
                  <th className="py-3 px-4 text-left">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {itemHalamanIni.length > 0 ? (
                  itemHalamanIni.map((pengaduan) => (
                    <tr
                      key={pengaduan.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">{pengaduan.kode}</td>
                      <td className="py-3 px-4">
                        {new Date(pengaduan.tanggal).toLocaleDateString(
                          'id-ID'
                        )}
                      </td>
                      <td className="py-3 px-4">{pengaduan.lokasi}</td>
                      <td className="py-3 px-4">
                        {tampilkanBadgeStatus(
                          pengaduan.status_pengaduan.status
                        )}
                      </td>
                      <td className="py-3 px-4 flex space-x-2">
                        <button
                          onClick={() => setDetailPengaduan(pengaduan)}
                          className="bg-indigo-500 text-white p-2 rounded-lg hover:bg-indigo-600 transition flex items-center"
                          title="Lihat Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => setSelectedPengaduan(pengaduan)}
                          className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition flex items-center"
                          title="Ubah Status"
                        >
                          <Edit2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-gray-500">
                      Belum ada data laporan saat ini
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {daftarPengaduan.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-gray-600">
                Menampilkan {indexItemPertama + 1}-
                {Math.min(indexItemTerakhir, daftarPengaduan.length)} dari{' '}
                {daftarPengaduan.length} laporan
              </div>
              <div className="flex items-center">
                <button
                  onClick={keHalamanSebelumnya}
                  disabled={halamanSaatIni <= 1}
                  className={`p-2 rounded-lg mr-2 ${halamanSaatIni <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <ChevronLeft size={16} />
                </button>

                <div className="flex">{renderNomorPagination()}</div>

                <button
                  onClick={keHalamanBerikutnya}
                  disabled={halamanSaatIni >= totalHalaman}
                  className={`p-2 rounded-lg ml-2 ${halamanSaatIni >= totalHalaman ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        {pengaduanYangDipilih && renderModalUpdateStatus()}
        {detailPengaduan && renderModalDetail()}
        {renderModalSukses()}
        {renderModalError()}
      </div>
    </div>
  );
};

export default LaporanKorban;
