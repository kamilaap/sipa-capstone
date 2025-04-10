import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash } from 'lucide-react';
import Sidebar from './SideBar';

interface AkunUser {
  id: number;
  nama: string;
  email: string;
}

const UserManajemen: React.FC = () => {
  const [users, setUsers] = useState<AkunUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null); // Fixed typo in variable name
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    const response = await axios.get(
      'https://api-sipa-capstone-production.up.railway.app/users'
    );
    setUsers(response.data);
  };

  const handleDelete = async (id: number) => {
    console.log('Menghapus user dengan ID:', id);
    alert('Apakah Anda yakin ingin menghapus akun ini?');
    try {
      await axios.delete(
        `https://api-sipa-capstone-production.up.railway.app/users/${id}`
      );
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Gagal menghapus user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // PAGINATION LOGIC
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const goToPage = (page: number) => setCurrentPage(page);

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
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
    return pages;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-4 md:p-8 lg:p-12 overflow-auto w-full">
        <div className="bg-white p-4 rounded-xl shadow-lg mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Manajemen Akun User
          </h2>
          <table className="w-full bg-white border rounded-lg mb-4">
            <thead className="bg-purple-100 text-gray-700">
              <tr>
                <th className="py-3 px-3 text-left">ID</th>
                <th className="py-3 px-3 text-left">Nama</th>
                <th className="py-3 px-3 text-left">Email</th>
                <th className="py-3 px-3 text-left">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{user.id}</td>
                  <td className="py-3 px-4">{user.nama}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedUserId(user.id)}
                      className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      title="Hapus"
                    >
                      <Trash size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal */}
          {selectedUserId !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <p className="mb-4 text-gray-700 text-lg font-medium text-center">
                  Apakah Anda yakin ingin menghapus akun ini?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      handleDelete(selectedUserId);
                      setSelectedUserId(null);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    onClick={() => setSelectedUserId(null)}
                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-center">{renderPagination()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserManajemen;