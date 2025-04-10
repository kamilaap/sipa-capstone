import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaKey, FaEdit, FaCheck, FaTimes, FaHome } from 'react-icons/fa';
import Button from '../Ui/Button';
import axios from 'axios';
import Loading from '../Ui/Loading';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://api-sipa-capstone-production.up.railway.app';

interface UserProfile {
  id: number | null;
  nama: string | null;
  email: string | null;
  role: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

interface ProfileUpdateData {
  nama?: string;
  email?: string;
  password?: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

interface FormInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    placeholder?: string;
    error?: string;
    icon?: React.ReactNode;
    name?: string; // Add this line
  }
  
  const FormInput = React.memo(({ 
    id, 
    label, 
    type = 'text', 
    value, 
    onChange, 
    disabled = false, 
    placeholder, 
    error = '',
    icon,
    name 
  }: FormInputProps) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={type}
          id={id}
          name={name} 
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`w-full px-4 py-2 ${icon ? 'pl-10' : ''} border ${
            error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 
                   disabled ? 'border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed' :
                            'border-gray-300 focus:ring-[#8B5CF6] focus:border-[#8B5CF6]'
          } rounded-lg transition-colors`}
          placeholder={placeholder}
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      {disabled && <p className="mt-1 text-xs text-gray-500">Bidang ini tidak dapat diubah</p>}
    </div>
  ));
const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<UserProfile>({
    id: null,
    nama: null,
    email: null,
    role: null,
    createdAt: null,
    updatedAt: null
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({
    nama: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const getAuthData = useCallback(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (!token || !userId) {
      throw new Error('User tidak terautentikasi');
    }
    
    return { token, userId };
  }, []);

  // Fetch data user nya 
  const fetchUserData = useCallback(async () => {
    try {
      setIsLoading(true);
      const { token, userId } = getAuthData();

      const response = await axios.get(`${API_BASE_URL}/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const userData = response.data;
      setProfile({
        id: userData.id,
        nama: userData.nama,
        email: userData.email,
        role: userData.role,
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      });

      // set form data
      setFormData({
        nama: userData.nama || '',
        email: userData.email || '',
        password: '',
        confirmPassword: ''
      });
    } catch (error) {
      handleApiError(error as ApiError);
    } finally {
      setIsLoading(false);
    }
  }, [getAuthData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleApiError = (error: ApiError) => {
    console.error("API Error:", error);
    const errorMsg = error.response?.data?.message || 
                    error.message || 
                    'Terjadi kesalahan. Silakan coba lagi nanti.';
                    
    showNotification('error', errorMsg);
    
    if (error.response?.status === 401) {
      localStorage.clear();
      navigate('/login');
    }
  };

  const showNotification = useCallback((type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification({ type: null, message: '' }), 3000);
  }, []);

  const formatDate = useCallback((dateString: string | null) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric', 
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  }, []);

  const validateForm = useCallback((): boolean => {
    const errors = {
      nama: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    
    let isValid = true;
    
    if (editMode && formData.nama.trim() === '') {
      errors.nama = 'Nama tidak boleh kosong';
      isValid = false;
    }
    
    if (editMode && formData.email.trim() === '') {
      errors.email = 'Email tidak boleh kosong';
      isValid = false;
    } else if (editMode && formData.email !== profile.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Format email tidak valid';
        isValid = false;
      }
    }
    
    if (formData.password) {
      if (formData.password.length < 8) {
        errors.password = 'Password minimal 8 karakter';
        isValid = false;
      }
      
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Password tidak cocok';
        isValid = false;
      }
    }
    
    setFormErrors(errors);
    return isValid;
  }, [editMode, formData, profile.email]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setIsSaving(true);
      const { token, userId } = getAuthData();
      

      const updateData: ProfileUpdateData = {};
      
      if (formData.nama !== profile.nama) updateData.nama = formData.nama;
      if (formData.email !== profile.email) updateData.email = formData.email;
      if (formData.password) updateData.password = formData.password;

      if (Object.keys(updateData).length === 0) {
        setEditMode(false);
        showNotification('success', 'Tidak ada perubahan yang perlu disimpan');
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/users/${userId}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    
      const updatedData = response.data.user || response.data;
      setProfile(prev => ({
        ...prev,
        nama: updatedData.nama || prev.nama,
        email: updatedData.email || prev.email,
        updatedAt: updatedData.updatedAt || prev.updatedAt
      }));
      if (updatedData.nama) localStorage.setItem('userName', updatedData.nama);
      if (updatedData.email) localStorage.setItem('userEmail', updatedData.email);

      showNotification('success', response.data.message || 'Profil berhasil diperbarui!');
      setEditMode(false);
      setFormData(prev => ({ ...prev, password: '', confirmPassword: '' }));
    } catch (error) {
      handleApiError(error as ApiError);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancelEdit = useCallback(() => {
    setEditMode(false);
    setFormData({
      nama: profile.nama || '',
      email: profile.email || '',
      password: '',
      confirmPassword: ''
    });
    setFormErrors({
      nama: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  }, [profile]);

  const Notification = useCallback(() => {
    if (!notification.type) return null;
    
    return (
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`mb-4 ${
          notification.type === 'success' 
            ? 'bg-green-100 border-l-4 border-green-500 text-green-700' 
            : 'bg-red-100 border-l-4 border-red-500 text-red-700'
        } p-4 rounded shadow-md`}
      >
        <div className="flex items-center">
          {notification.type === 'success' 
            ? <FaCheck className="text-green-500 mr-2" />
            : <FaTimes className="text-red-500 mr-2" />
          }
          <p>{notification.message}</p>
        </div>
      </motion.div>
    );
  }, [notification]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0E7FF] via-[#EAD6FF] to-[#F5EBFF] pt-24 pb-12 px-4">
      <div className="absolute top-4 left-4 z-20">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => navigate('/')}
          icon={<FaHome className="mr-2" />}
        >
          Kembali ke Beranda
        </Button>
      </div>

      <div className="container mx-auto max-w-3xl">
        <Notification />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-white/50 rounded-2xl blur-lg"></div>
            <div className="bg-white rounded-xl shadow-xl p-6 md:p-8 relative">
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loading />
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Profil Saya</h1>
                    {!editMode && (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => setEditMode(true)}
                        className="flex items-center"
                      >
                        <FaEdit className="mr-2" />
                        Edit Profil
                      </Button>
                    )}
                  </div>

                  <div className="flex flex-col md:flex-row items-center md:items-start mb-8">
                    <div className="w-24 h-24 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6">
                      <FaUser className="text-[#8B5CF6] text-4xl" />
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-bold text-gray-800">{profile.nama || 'Pengguna'}</h2>
                      <p className="text-gray-600">{profile.email || 'email@example.com'}</p>
                      <div className="mt-2 inline-block bg-[#8B5CF6]/10 text-[#8B5CF6] px-3 py-1 rounded-full text-sm font-medium">
                        {profile.role === 'admin' ? 'Administrator' : profile.role}
                      </div>
                    </div>
                  </div>

                  {!editMode ? (
                    <div className="space-y-6">
                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Informasi Akun</h3>
                        
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mr-4">
                              <FaUser className="text-[#8B5CF6]" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Nama</p>
                              <p className="font-medium">{profile.nama || 'Belum diatur'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mr-4">
                              <FaEnvelope className="text-[#8B5CF6]" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">{profile.email || 'Belum diatur'}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start">
                            <div className="w-10 h-10 bg-[#8B5CF6]/10 rounded-full flex items-center justify-center mr-4">
                              <FaKey className="text-[#8B5CF6]" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Password</p>
                              <p className="font-medium">••••••••</p>
                            </div>
                          </div>

                          <div className="pt-4 border-t border-gray-100">
                            <h4 className="font-medium text-gray-800 mb-3">Info Lainnya</h4>
                            
                            <div className="grid grid-cols-1 gap-4">
                              <div>
                                <p className="text-sm text-gray-500">Terdaftar Pada</p>
                                <p className="font-medium">{formatDate(profile.createdAt)}</p>
                              </div>
                              
                              <div>
                                <p className="text-sm text-gray-500">Diperbarui Pada</p>
                                <p className="font-medium">{formatDate(profile.updatedAt)}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSaveProfile} className="space-y-6">
                      <div className="border-t border-gray-100 pt-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">Edit Informasi Akun</h3>
                        
                        <div className="space-y-4">
                          <FormInput
                            key="name-input"
                            id="name"
                            label="Nama"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            placeholder="Nama Anda"
                            error={formErrors.nama}
                            icon={<FaUser className="text-gray-400" />}
                          />
                          
                          <FormInput
                            key="email-input"
                            id="email"
                            label="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@example.com"
                            error={formErrors.email}
                            icon={<FaEnvelope className="text-gray-400" />}
                          />
                          
                          <div className="pt-4 border-t border-gray-100">
                            <h4 className="font-medium text-gray-800 mb-3">Ubah Password</h4>
                            <p className="text-sm text-gray-500 mb-3">Biarkan kosong jika tidak ingin mengubah password</p>
                            
                            <div className="space-y-3">
                              <FormInput
                                key="password-input"
                                id="newPassword"
                                label="Password Baru"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Masukkan password baru (min 8 karakter)"
                                error={formErrors.password}
                                icon={<FaKey className="text-gray-400" />}
                              />
                              
                              <FormInput
                                key="confirm-password-input"
                                id="confirmPassword"
                                label="Konfirmasi Password Baru"
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Konfirmasi password baru"
                                error={formErrors.confirmPassword}
                                icon={<FaKey className="text-gray-400" />}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex space-x-3 pt-4">
                        <Button 
                          variant="primary" 
                          type="submit"
                          className="flex-1 md:flex-none"
                          disabled={isSaving}
                        >
                          {isSaving ? 'Menyimpan...' : 'Simpan Perubahan'}
                        </Button>
                        <Button 
                          variant="secondary" 
                          type="button"
                          className="flex-1 md:flex-none"
                          onClick={handleCancelEdit}
                          disabled={isSaving}
                        >
                          Batal
                        </Button>
                      </div>
                    </form>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;