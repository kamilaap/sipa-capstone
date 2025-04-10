import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash, Edit2 } from 'lucide-react';
import Sidebar from './SideBar';

interface AkunUser {
  id: number;
  nama: string;
  email: string;
  role?: string;
}

const UserManajemen: React.FC = () => {
  const [users, setUsers] = useState<AkunUser[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [editRoleUser, setEditRoleUser] = useState<AkunUser | null>(null);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    const response = await axios.get(
      'https://api-sipa-capstone-production.up.railway.app/users'
    );
    setUsers(response.data);
  };

  // const handleDelete = async (id: number) => {
  //   await axios.delete(`https://api-sipa-capstone-production.up.railway.app/users/id${id}`);
  //   console.log("ID yang dikirim:", id);
  //   fetchUsers();
  // };

  const handleDelete = async (id: number) => {
    console.log('Menghapus user dengan ID:', id);
    try {
      await axios.delete(
        `https://api-sipa-capstone-production.up.railway.app/users/${id}`
      );
      setUsers((prev) => prev.filter((user) => user.id !== id));
      setSelectedUserId(null);
    } catch (error) {
      console.log('Error detail:', error?.response?.data || error.message);
    }
  };

  const handleEditRole = async (user: AkunUser) => {
    try {
      await axios.put(`https://api-sipa-capstone-production.up.railway.app/edit-role/${user.id}`, {
        role: user.role, // pastikan ada role-nya
      });
      setEditRoleUser(null);
      fetchUsers(); // refresh data
    } catch (error) {
      console.log('Error detail:', error?.response?.data || error.message);
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
                        title="Ubah Status"
                      >
                        <Edit2 size={16} />
                      </button>
                    </div>
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

          {editRoleUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4 text-center">
                  Edit User
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
                    <label className="block text-sm text-gray-600 mb-1">
                      Role
                    </label>
                    <input
                      type="text"
                      value={(editRoleUser as any).role || ''}
                      onChange={(e) =>
                        setEditRoleUser({
                          ...editRoleUser!,
                          role: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border rounded-lg"
                    />
                  </div>

                  {/* Bisa tambahkan input email, role, dll seterah mau tambah apa */}
                  <div className="flex justify-end gap-2">
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
          <div className="flex justify-center">{renderPagination()}</div>
        </div>
      </div>
    </div>
  );
};

export default UserManajemen;
