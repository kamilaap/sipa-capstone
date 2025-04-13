# 📌 Laporan Kekerasan Ibu dan Anak - SIPA

> Sebuah aplikasi berbasis web yang mempermudah masyarakat dalam melaporkan kasus kekerasan terhadap ibu dan anak. Dibangun menggunakan **Vite + React.js + TypeScript** untuk tampilan antarmuka yang responsif dan user-friendly.

![Tangkapan Layar Aplikasi](/assets/tampilan.png)

## 🔗 Link Deploy Projek

🌐 https://sipa-capstone.vercel.app/

## 📢 Tentang Proyek

Aplikasi Laporan Kekerasan Ibu dan Anak merupakan tugas capstone kami di **Coding Camp 2025** dengan tema **"Inclusivity for All"**.

### 👨‍💻 Tim Pengembang

| Nama                            | Peran                | GitHub                                                  |
| ------------------------------- | -------------------- | -------------------------------------------------------- |
| Sipa Sopiatul Patoni            | Frontend Developer   | [@Aleftu](https://github.com/Aleftu)            |
| Kamila Putri Herlambang         | Frontend Developer   | [@kamilaap](https://github.com/kamilaap)                |
| Elgiva Rasyad Aditya Putra      | Backend Developer    | [@Rasyadditya13](https://github.com/Rasyaditya13)                |
| Thomas Christian Kuntolukito    | Backend Developer    | [@thomaskuntolukito](https://github.com/thomaskuntolukito) |
| Bintang Raga Pratama            | ML Engineer          | [@SuryakandaRagaWistara](https://github.com/SuryakandaRagaWistara)          |
| Yogi Kautsar Alnandeta          | ML Engineer          | [@yogikautsa112](https://github.com/yogikautsa112)          |

## 🚀 Fitur Utama

- ✅ **Pelaporan Online** – Pengguna dapat mengisi formulir laporan kekerasan dengan bukti foto.  
- ✅ **Anonimitas Terjaga** – Pelapor dapat memilih untuk tetap anonim.  
- ✅ **Tracking Laporan** – Cek status laporan secara real-time.  
- ✅ **Dashboard Admin** – Admin dapat mengelola laporan, memberikan respon, dan melihat statistik laporan.  
- ✅ **Pelayanan** – Layanan konsultasi berbasis chatbot.  

## 🛠️ Teknologi yang Digunakan

- **Frontend:** Vite, React.js, TypeScript, Tailwind CSS, Axios  
- **Backend:** Node.js, Express.js  
- **Database:** PostgreSQL  
- **Machine Learning:** NumPy, Flask, TensorFlow  
- **Deployment:** Vercel, Railway  

## 📦 Instalasi dan Menjalankan Proyek

Ikuti langkah-langkah berikut untuk menjalankan proyek di lokal:

### 1️⃣ Clone Repository

```bash
git clone https://github.com/kamilaap/laporan-kekerasan.git
cd laporan-kekerasan
```

### 2️⃣ Install Dependensi

```bash
npm install
```

### 3️⃣ Konfigurasi Environment

Buat file `.env` di root proyek dan tambahkan konfigurasi berikut:

```env
VITE_API_URL=https://api-sipa-capstone-production.up.railway.app
```

### 4️⃣ Jalankan Aplikasi

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

## 🚀 Deployment

### 🌐 Frontend ke Vercel

1. Login ke [Vercel](https://vercel.com) dan import repository ini.  
2. Tambahkan environment variable:
   ```
   VITE_API_URL=https://api-sipa-capstone-production.up.railway.app
   ```
3. Klik **Deploy** dan tunggu proses selesai.  
4. Aplikasi siap diakses melalui URL Vercel.

### ⚙️ Backend ke Railway

1. Login ke [Railway](https://railway.app) dan hubungkan dengan repo backend.
2. Tambahkan environment variables seperti:
   ```env
   DB_HOST=
   DB_PORT=
   DB_USER=
   DB_PASSWORD=
   DB_NAME=
   JWT_SECRET=
   ```
3. Klik deploy dan salin link backend.

> Pastikan URL backend dicantumkan di frontend lewat `.env`

## 📄 API Endpoint

| Method | Endpoint                                                                                 | Deskripsi                 |
| ------ | ---------------------------------------------------------------------------------------- | ------------------------- |
| GET    | `/https://api-sipa-capstone-production.up.railway.app/pengaduan`                         | Mengambil semua laporan   |
| PUT    | `/https://api-sipa-capstone-production.up.railway.app/cek-pengaduan/status_pengaduan_id` | Mengedit Status Pengaduan |
| POST   | `/https://api-sipa-capstone-production.up.railway.app/pengaduan/`                        | Membuat Laporan baru      |
| GET    | `/https://api-sipa-capstone-production.up.railway.app/cek-pengaduan/nomorPengaduan`      | Mengecek status laporan   |
| POST   | `/https://api-sipa-capstone-production.up.railway.app/login`                             | Login                     |
| POST   | `/https://api-sipa-capstone-production.up.railway.app/register`                          | Register                  |
| PUT    | `/https://api-sipa-capstone-production.up.railway.app/forgot-password`                   | Untuk lupa password       |
| GET    | `/https://api-sipa-capstone-production.up.railway.app/artikel`                           | Mengambil semua artikel   |

---

## 🤝 Cara Berkontribusi

Kami membuka kontribusi untuk pengembangan proyek ini! Ikuti langkah-langkah berikut:

1. **Fork** repositori ini  
2. **Clone** hasil fork ke lokal  
   ```bash
   git clone https://github.com/username/laporan-kekerasan.git
   ```
3. Buat branch baru  
   ```bash
   git checkout -b frontend
   ```
4. Lakukan perubahan dan commit  
   ```bash
   git commit -m "Menambahkan fitur X"
   ```
5. Push ke GitHub  
   ```bash
   git push origin frontend
   ```
6. Buka Pull Request dari GitHub

> Semua kontribusi akan direview oleh tim kami terlebih dahulu sebelum digabungkan ke `main`.

---

## ❗❗❗ Alert

GitHub ini dibuat **public** dengan tujuan transparansi, namun **dilarang keras** mengcopy-paste dan **melakukan plagiarisme** terhadap proyek ini selain oleh tim capstone **SIPA**.
