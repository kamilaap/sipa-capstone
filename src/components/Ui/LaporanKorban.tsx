import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Eye, Edit2, CheckCircle, XCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import Sidebar from './SideBar';

interface StatusPengaduan {
    id: number;
    status: string;
    keterangan: string;
}

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

const LaporanKorban: React.FC = () => {
    const navigate = useNavigate();
    const [pengaduanList, setPengaduanList] = useState<Pengaduan[]>([]);
    const [selectedPengaduan, setSelectedPengaduan] = useState<Pengaduan | null>(null);
    const [detailPengaduan, setDetailPengaduan] = useState<Pengaduan | null>(null);
    
    // New states for modals and notifications
    const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
    const [keterangan, setKeterangan] = useState('');
    const [modalStatus, setModalStatus] = useState<'success' | 'error' | null>(null);
    const [errorMessage, setErrorMessage] = useState('');
    
    // Pagination states
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    // Improved status mapping with more descriptive keterangan
    const STATUS_DESCRIPTIONS = {
        'antre': {
            status: 'antre', 
            keterangan: 'Laporan telah diterima dan menunggu proses lebih lanjut'
        },
        'proses': {
            status: 'proses', 
            keterangan: 'Tim sedang melakukan investigasi dan tindak lanjut laporan'
        },
        'selesai': {
            status: 'selesai', 
            keterangan: 'Laporan telah diselesaikan dan ditindaklanjuti'
        }
    };

    useEffect(() => {
        // Check authentication
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetchPengaduanData();
    }, [navigate]);

    const fetchPengaduanData = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get('https://api-sipa-capstone-production.up.railway.app/data-pengaduan', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setPengaduanList(response.data);
            setCurrentPage(1); // Reset to first page when data is fetched
        } catch (error) {
            console.error('Error fetching pengaduan data:', error);
        }
    };

    const renderStatusBadge = (status: string) => {
        const statusClasses = {
            'antre': 'bg-blue-100 text-blue-800',
            'proses': 'bg-amber-100 text-amber-800',
            'selesai': 'bg-emerald-100 text-emerald-800'
        };

        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    const handleUpdateStatus = async () => {
        if (!selectedPengaduan || !selectedStatus) return;

        try {
            const token = localStorage.getItem("token");
            const statusDescription = STATUS_DESCRIPTIONS[selectedStatus as keyof typeof STATUS_DESCRIPTIONS];
            
            await axios.put(`https://api-sipa-capstone-production.up.railway.app/pengaduan/${selectedPengaduan.status_pengaduan_id}`, {
                status: selectedStatus,
                keterangan: keterangan || statusDescription.keterangan
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            await fetchPengaduanData();
            
            // Show success modal
            setModalStatus('success');
            
            // Reset states after a delay
            setTimeout(() => {
                setSelectedPengaduan(null);
                setIsStatusModalOpen(false);
                setSelectedStatus(null);
                setKeterangan('');
                setModalStatus(null);
            }, 2000);
        } catch (error) {
            console.error('Error updating status:', error);
            
            // Show error modal
            setModalStatus('error');
            setErrorMessage('Gagal memperbarui status. Silakan coba lagi.');
            
            // Reset error modal after a delay
            setTimeout(() => {
                setModalStatus(null);
                setErrorMessage('');
            }, 2000);
        }
    };

    // Pagination calculations
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = pengaduanList.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pengaduanList.length / itemsPerPage);

    // Pagination change handlers
    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToPage = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Generate pagination numbers
    const renderPaginationNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;
        
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`px-3 py-1 mx-1 rounded ${
                        currentPage === i 
                            ? 'bg-purple-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {i}
                </button>
            );
        }
        
        return pageNumbers;
    };

    const renderSuccessModal = () => {
        if (modalStatus !== 'success') return null;

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

    // Error Modal Component
    const renderErrorModal = () => {
        if (modalStatus !== 'error') return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center">
                    <XCircle className="mx-auto mb-4 text-red-500" size={64} />
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Gagal</h3>
                    <p className="text-gray-600">{errorMessage}</p>
                </div>
            </div>
        );
    };

    const renderDetailModal = () => {
        if (!detailPengaduan) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">Detail Laporan</h3>
                    
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
                            <span className="font-semibold text-gray-600">Umur:</span>
                            <p>{detailPengaduan.umur} tahun</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">Lokasi:</span>
                            <p>{detailPengaduan.lokasi}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">Kronologi:</span>
                            <p>{detailPengaduan.kronologi}</p>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-600">Status:</span>
                            {renderStatusBadge(detailPengaduan.status_pengaduan.status)}
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

    const renderStatusUpdateModal = () => {
        if (!selectedPengaduan) return null;

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
                                Pilih Status
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                <button 
                                    onClick={() => {
                                        setSelectedStatus('antre');
                                        setIsStatusModalOpen(true);
                                    }}
                                    className="py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center space-x-2"
                                >
                                    <span>Antre</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        setSelectedStatus('proses');
                                        setIsStatusModalOpen(true);
                                    }}
                                    className="py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition flex items-center justify-center space-x-2"
                                >
                                    <span>Proses</span>
                                </button>
                                <button 
                                    onClick={() => {
                                        setSelectedStatus('selesai');
                                        setIsStatusModalOpen(true);
                                    }}
                                    className="py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition flex items-center justify-center space-x-2"
                                >
                                    <span>Selesai</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {isStatusModalOpen && (
                        <div className="mt-6">
                            <label 
                                htmlFor="keterangan" 
                                className="block text-gray-700 font-semibold mb-2"
                            >
                                Keterangan Tambahan
                            </label>
                            <textarea 
                                id="keterangan"
                                value={keterangan}
                                onChange={(e) => setKeterangan(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
                                placeholder="Masukkan keterangan tambahan tentang status laporan..."
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
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">Laporan Korban</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full bg-white border rounded-lg">
                            <thead className="bg-purple-100 text-gray-700">
                                <tr>
                                    <th className="py-3 px-4 text-left">Kode</th>
                                    <th className="py-3 px-4 text-left">Tanggal</th>
                                    <th className="py-3 px-4 text-left">Lokasi</th>
                                    <th className="py-3 px-4 text-left">Status</th>
                                    <th className="py-3 px-4 text-left">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentItems.map((pengaduan) => (
                                    <tr key={pengaduan.id} className="border-b hover:bg-gray-50">
                                        <td className="py-3 px-4">{pengaduan.kode}</td>
                                        <td className="py-3 px-4">{new Date(pengaduan.tanggal).toLocaleDateString()}</td>
                                        <td className="py-3 px-4">{pengaduan.lokasi}</td>
                                        <td className="py-3 px-4">
                                            {renderStatusBadge(pengaduan.status_pengaduan.status)}
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                    
                    {/* Pagination Controls */}
                    {pengaduanList.length > 0 && (
                        <div className="flex items-center justify-between mt-6">
                            <div className="text-sm text-gray-600">
                                Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, pengaduanList.length)} dari {pengaduanList.length} laporan
                            </div>
                            <div className="flex items-center">
                                <button 
                                    onClick={goToPreviousPage} 
                                    disabled={currentPage <= 1} 
                                    className={`p-2 rounded-lg mr-2 ${currentPage <= 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                                
                                <div className="flex">
                                    {renderPaginationNumbers()}
                                </div>
                                
                                <button 
                                    onClick={goToNextPage} 
                                    disabled={currentPage >= totalPages} 
                                    className={`p-2 rounded-lg ml-2 ${currentPage >= totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                
                {/* Modals */}
                {selectedPengaduan && renderStatusUpdateModal()}
                {detailPengaduan && renderDetailModal()}
                {renderSuccessModal()}
                {renderErrorModal()}
            </div>
        </div>
    );
};

export default LaporanKorban;