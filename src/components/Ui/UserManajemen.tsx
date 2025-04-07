import React, { useState, useEffect } from "react"; 
import axios from "axios"; 
// Removing the unused import
// import { useNavigate } from "react-router-dom"; 
import { Eye, Edit2, Trash } from "lucide-react"; 
import Sidebar from "./SideBar";  

// Interface for user
interface AkunUser {
  id: number;
  nama: string;
  email: string;
}

interface UserForm {
  nama: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const UserManajemen: React.FC = () => {
  // Removing the unused navigate constant
  // const navigate = useNavigate();
  const [users, setUsers] = useState<AkunUser[]>([]);
  const [form, setForm] = useState<UserForm>({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  
  const fetchUsers = async () => {
    const response = await axios.get("/api/users"); // api get
    setUsers(response.data);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await axios.post("/api/users", form); // api post
    
    fetchUsers(); // Refresh list
    setForm({ nama: "", email: "", password: "", confirmPassword: "" });
  };
  
  const handleDelete = async (id: number) => {
    await axios.delete(`/api/users/${id}`); // api delete
    fetchUsers();
  };
  
  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-8">
        <h2 className="text-xl font-semibold mb-4">Manajemen Akun</h2>
        
        {/* Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-lg font-medium mb-4">Tambah User Baru</h3>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <input
                  type="text"
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Simpan
            </button>
          </form>
        </div>
        
        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{user.nama}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Eye size={18} />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800">
                      <Edit2 size={18} />
                    </button>
                    <button 
                      className="p-1 text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManajemen;