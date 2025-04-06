import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, Edit2, Trash } from "lucide-react";
import Sidebar from "./SideBar";

// // Interface untuk user
// interface AkunUser {
//   id: number;
//   nama: string;
//   email: string;
// }

const UserManajemen: React.FC = () => {
  const [users, setUsers] = useState<AkunUser[]>([]);
  const [form, setForm] = useState<{ nama: string; email: string }>({
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

  const handleSubmit = async () => {
    await axios.post("/api/users", form); // api post 
    fetchUsers(); // Refresh list
    setForm({ nama: "", email: "" , password: "", confirmPassword: ""}); 
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`/api/users/${id}`); // api delete
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 bg-gradient-moving bg-400 animate-gradient-move">
      <Sidebar />

      <h2 className="text-xl font-semibold mb-4">Manajemen Akun</h2>

      
     
    </div>
  );
}
export default UserManajemen;
