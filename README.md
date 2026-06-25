# PS Rental Management System

Sistem Informasi Rental PlayStation berbasis web yang digunakan untuk mengelola ruangan, pelanggan, booking, dan transaksi rental PS secara digital.

Project ini dibangun menggunakan Vue.js sebagai frontend, Express.js sebagai backend, dan MySQL sebagai database.

## Team
- Muhammad Prayogo Pangestu (2410501046)
- Muhammad Reza Avicenna (2310501043)

## Deskripsi

PS Rental Management System merupakan aplikasi web yang membantu pengelolaan usaha rental PlayStation agar lebih terstruktur dan efisien.

Sistem menyediakan dua jenis pengguna:
1. Admin untuk mengelola operasional rental
Customer untuk melakukan booking ruangan secara online
2. Melalui sistem ini, pelanggan dapat melihat ketersediaan ruangan, melakukan booking, dan melihat riwayat pemesanan. Admin dapat mengelola ruangan, menyetujui booking, serta mencatat transaksi rental.

## Fitur
### Admin
Login Admin (JWT Authentication)
Dashboard Statistik
CRUD Ruangan
Kelola Booking
Approve Booking Customer
Batalkan Booking
Selesaikan Booking
Riwayat Transaksi
Kelola Data Customer

### Customer
Registrasi Customer
Login Customer
Melihat Daftar Ruangan
Booking Ruangan Online
Melihat Status Booking
Melihat Riwayat Booking

### Sistem
REST API
Authentication menggunakan JWT
Relasi Database dengan Sequelize ORM
Responsive User Interface
Booking Workflow (Pending → Active → Finished)

## Tech Stack
### Frontend
Vue.js 3
Vue Router
Axios
CSS

### Backend
Node.js
Express.js
Sequelize ORM
JWT Authentication

### Database
MySQL
Development Tools
Vite
Nodemon
Laragon

### Cara Menjalankan Project
1. Clone Repository
```
git clone https://github.com/USERNAME/rental-ps-web.git
```
Masuk ke folder project:
```
cd rental-ps-web
```
2. Setup Database
Buat database MySQL:
```
CREATE DATABASE psrental;
```
Pastikan MySQL sudah berjalan.

4. Setup Backend
Masuk ke folder backend:
```
cd backend
```
Install dependency:
```
npm install
```
Buat file .env
```
PORT=5000
DB_NAME=psrental
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
JWT_SECRET=your_secret_key
```
Jalankan backend:
```
npm run dev
```

Jika berhasil:
Database Connected
Server running on port 5000

4. Setup Frontend
Buka terminal baru lalu masuk ke folder frontend:
```
cd frontend
```
Install dependency:
```
npm install
```
Jalankan frontend:
```
npm run dev
```
Jika berhasil:
Local: http://localhost:5173

5. Akses Aplikasi
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

Akun Default Admin
- Username : admin
- Password : 123456
Sesuaikan dengan data admin yang terdapat pada database.

## Screenshoot UI
### Login Admin
<img width="480" alt="image" src="https://github.com/user-attachments/assets/4ae3cbb3-6666-4229-992c-6b790c45ff54" />

### Dashboard
<img width="480" alt="image" src="https://github.com/user-attachments/assets/03da487d-e2e0-4a92-9362-8b734bc9a8f0" />

### Manajemen Ruangan
<img width="480" alt="image" src="https://github.com/user-attachments/assets/2cabcb12-1c81-4d74-a996-43aa39d67fa3" />

### Pemesanan 
<img width="480" alt="image" src="https://github.com/user-attachments/assets/49c96d19-fb56-46e1-bcf3-00b132346cf9" />

### Riwayat
<img width="480" alt="image" src="https://github.com/user-attachments/assets/61ef81cd-e04a-4ae9-9a7e-8f85722d481f" />

### Booking Public
<img width="480" alt="image" src="https://github.com/user-attachments/assets/9d98d074-5a6d-426d-af6b-eafe9210a137" />

