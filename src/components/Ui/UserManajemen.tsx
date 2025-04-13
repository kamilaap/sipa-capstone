import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash, Edit2, CheckCircle, AlertCircle } from 'lucide-react';
import Sidebar from './SideBar';

interface AkunUser {
  id: number;
  nama: string;
  email: string;
  role?: string;
}

interface ApiError {
  response?: {
    data?: unknown;
  };
  message?: string;
}

const UserManajemen: React.FC = () => {
  const [users, setUsers] = useState<AkunUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editRoleUser, setEditRoleUser] = useState<AkunUser | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
    show: boolean;
  }>({
    message: '',
    type: 'success',
    show: false,
  });
  const itemsPerPage = 10;

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'https://api-sipa-capstone-production.up.railway.app/users'
      );
      setUsers(response.data);
    } catch (error) {
      const apiError = error as ApiError;
      console.log('Error fetching users:', apiError.message);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(
        `https://api-sipa-capstone-production.up.railway.app/users/${id}`
      );
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setSelectedUserId(null);
      showNotification('User berhasil dihapus', 'success');
    } catch (error) {
      const apiError = error as ApiError;
      const errorMsg = apiError.response?.data
        ? String(apiError.response.data)
        : apiError.message || 'Terjadi kesalahan';
      console.log('Error detail:', errorMsg);
      showNotification('Gagal menghapus user', 'error');
    }
  };

  const handleEditRole = async (user: AkunUser) => {
    try {
      await axios.put(
        `https://api-sipa-capstone-production.up.railway.app/edit-role/${user.id}`,
        {
          role: user.role,
        }
      );
      setEditRoleUser(null);
      fetchUsers();
      showNotification(
        `Role user berhasil diubah menjadi ${user.role}`,
        'success'
      );
    } catch (error) {
      const apiError = error as ApiError;
      const errorMsg = apiError.response?.data
        ? String(apiError.response.data)
        : apiError.message || 'Terjadi kesalahan';
      console.log('Error detail:', errorMsg);
      showNotification('Gagal mengubah role user', 'error');
    }
  };

  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type, show: true });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 5000);
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
        {/* Notification */}
        {notification.show && (
          <div
            className={`fixed top-4 right-4 flex items-center p-4 rounded-lg shadow-lg z-50 ${
              notification.type === 'success'
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {notification.type === 'success' ? (
              <CheckCircle className="mr-2" size={20} />
            ) : (
              <AlertCircle className="mr-2" size={20} />
            )}
            {notification.message}
          </div>
        )}

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
                <th className="py-3 px-3 text-left">Role</th>
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
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user.role || 'tamu'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUserId(user.id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition flex items-center"
                        title="Hapus"
                      >
                        <Trash size={16} />
                      </button>
                      <button
                        onClick={() => setEditRoleUser(user)}
                        className="bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition flex items-center"
                        title="Ubah Role"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Modal Hapus */}
          {selectedUserId !== null && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <p className="mb-4 text-gray-700 text-lg font-medium text-center">
                  Apakah Anda yakin ingin menghapus akun ini?
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleDelete(selectedUserId)}
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

          {/* Modal Edit Role */}
          {editRoleUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Edit Role User
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (editRoleUser) {
                      handleEditRole(editRoleUser);
                    }
                  }}
                >
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-2">
                      Role
                    </label>
                    <div className="flex gap-3">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value="admin"
                          checked={editRoleUser.role === 'admin'}
                          onChange={() =>
                            setEditRoleUser({ ...editRoleUser, role: 'admin' })
                          }
                          className="mr-2"
                        />
                        <span>Admin</span>
                      </label>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="role"
                          value="tamu"
                          checked={
                            editRoleUser.role === 'tamu' || !editRoleUser.role
                          }
                          onChange={() =>
                            setEditRoleUser({ ...editRoleUser, role: 'tamu' })
                          }
                          className="mr-2"
                        />
                        <span>Tamu</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 mt-6">
                    <button
                      type="button"
                      onClick={() => setEditRoleUser(null)}
                      className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      className="bg-emerald-500 text-white px-4 py-2 rounded-lg hover:bg-emerald-600 transition"
                    >
                      Simpan
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Pagination Buttons */}
          <div className="flex justify-center mt-4">{renderPagination()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserManajemen;
