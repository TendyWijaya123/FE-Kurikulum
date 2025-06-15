
# 📘 Frontend Aplikasi Penyusunan Kurikulum Politeknik Negeri Bandung

Aplikasi frontend ini dibuat untuk mendukung proses penyusunan kurikulum di Politeknik Negeri Bandung. Sistem ini terintegrasi dengan backend REST API dan mengacu pada Panduan Teknis Verifikasi (PTV) 2024 edisi kedua.

---

## 🧾 Deskripsi Proyek

Aplikasi ini memfasilitasi penyusunan kurikulum secara digital dengan alur sebagai berikut:
1. **Analisis Konsideran**
2. **Perancangan Model dan Desain**
3. **Konstruksi dan Pra-Uji**
4. **Pengisian Rencana Pembelajaran Semester (RPS)**
5. **Dashboard Pemantauan P2MPP**

### 🎯 Tujuan dan Manfaat
- Menyediakan dashboard pemantauan progres penyusunan kurikulum bagi P2MPP.
- Mengurangi risiko inkonsistensi dan ketidaksesuaian data antar komponen kurikulum.
- Menyederhanakan dan mempercepat proses penyusunan jejaring mata kuliah.
- Mempermudah pengawasan proses oleh tim P2MPP.

### 👥 Pengguna Utama
- **P2MPP** (Pusat Pengembangan Pembelajaran dan Penjaminan Mutu Pendidikan)
- **Penyusun Kurikulum Program Studi**
- **Dosen**

---

## ⚙️ Teknologi yang Digunakan

- **Frontend**: React.js (dengan JSX)
- **Realtime Chat**: Firebase
- **State Management**: Context API / useState/useEffect
- **REST API**: Konsumsi API dari backend Laravel
- **Environment**: Vite

---

## 📦 Instalasi & Menjalankan Proyek

### 1. Prasyarat
- Node.js `v20` atau lebih baru
- npm / yarn

### 2. Clone Repositori
```bash
git clone https://github.com/TendyWijaya123/FE-Kurikulum.git
cd nama-repo
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Konfigurasi Environment
Buat file `.env` di root folder berdasarkan `.env.example` berikut:

```env
VITE_PORT=5173
VITE_REACT_APP_API_URL=http://127.0.0.1:8000/api
```

### 5. Jalankan Aplikasi
```bash
npm run dev
```

Aplikasi akan berjalan di: `http://localhost:5173`

---

## 🔐 Konfigurasi API dan Firebase

### 1. API Endpoint
Pastikan backend sudah aktif di salah satu URL berikut, dan sesuaikan `.env`:

```env
# Beberapa opsi URL yang tersedia:
# VITE_REACT_APP_API_URL=http://localhost:8000/api //jika menggunakan ingin push ke docker
# VITE_REACT_APP_API_URL=http://127.0.0.1:8000/api // server lokal

```


## 🧪 Testing (Opsional)

Belum tersedia unit testing saat ini. Akan ditambahkan pada pengembangan berikutnya.

---

## 🧭 Struktur Direktori (Ringkasan)

```
src/
├── components/       # Komponen UI (modular)
├── pages/            # Halaman utama (routing)
├── hooks/            # Custom React hooks
├── services/         # API handling
├── contexts/         # Context Providers
├── assets/           # Gambar, ikon, dll
└── main.jsx          # Entry point aplikasi
```

## 🐳 Deployment Menggunakan Docker

Untuk menjalankan frontend ini menggunakan Docker dan Nginx, Anda bisa menggunakan konfigurasi berikut:

### 1. Dockerfile

```dockerfile
# Gunakan image Node.js untuk build
FROM node:20 as builder

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json lalu install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy semua file project dan build aplikasi dengan path /kurikulum
COPY . .
RUN npm run build

# Rename hasil build ke /kurikulum
RUN mv dist dist_tmp && mkdir -p dist/kurikulum && mv dist_tmp/* dist/kurikulum/

# Gunakan Nginx sebagai server untuk static files
FROM nginx:latest

# Hapus default config Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy hasil build React ke Nginx html folder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

# Jalankan Nginx
CMD ["nginx", "-g", "daemon off;"]
```

### 2. Konfigurasi Nginx (`nginx.conf`)

```nginx
server {
    listen 80;
    server_name _;

    root /usr/share/nginx/html;
    index index.html;

    # Untuk React app yang di-serve dari /kurikulum/
    location /kurikulum/ {
        try_files $uri $uri/ /kurikulum/index.html;
    }

    # Optional: blokir root
    location = / {
        return 404;
    }

    # Redirect 404 lainnya (optional)
    error_page 404 /kurikulum/index.html;

    # Proxy Laravel backend
    location /api/ {
        proxy_pass http://laravel_backend:8000/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 3. Build dan Jalankan Docker

```bash
docker build -t kurikulum-frontend .
docker run -d -p 8080:80 --name kurikulum-frontend kurikulum-frontend
```

Akses aplikasi melalui `http://localhost:8080/kurikulum/`


## 👨‍💻 Kontributor

- Ahmad Fauzy – _Fullstack Developer_
- Muhammad Syaifullah - _Fullstack Developer_
- Tendy Wijaya - _Fullstack Developer_

---


