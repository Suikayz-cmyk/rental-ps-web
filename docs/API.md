# API Contract - PSRental Management System

Dokumen ini menjadi kontrak API antara **Frontend Vue.js** dan **Backend Node.js/Express.js**.  
Frontend dapat memakai dokumen ini untuk membuat UI secara paralel memakai dummy data atau mock API.

---

## 1. Base URL

### Development

```txt
http://localhost:5000/api
```

### Contoh penggunaan di frontend

```js
const BASE_URL = "http://localhost:5000/api";
```

---

## 2. Format Response Umum

### Success Response

```json
{
  "success": true,
  "message": "Request berhasil",
  "data": {}
}
```

### Error Response

```json
{
  "success": false,
  "message": "Pesan error",
  "errors": []
}
```

---

## 3. Status Code

| Status Code | Keterangan                                    |
| ----------- | --------------------------------------------- |
| 200         | Request berhasil                              |
| 201         | Data berhasil dibuat                          |
| 400         | Data request tidak valid                      |
| 401         | Belum login atau token tidak valid            |
| 403         | Tidak memiliki akses                          |
| 404         | Data tidak ditemukan                          |
| 409         | Data konflik, misalnya ruangan sedang dipakai |
| 500         | Error server                                  |

---

## 4. Authentication

Sistem memakai login admin sederhana seperti UI awal.

### Default Account Development

```txt
username: admin
password: admin123
```

### 4.1 Login Admin

**Endpoint**

```http
POST /auth/login
```

**Request Body**

```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Login berhasil",
  "data": {
    "token": "jwt_token_here",
    "user": {
      "id": 1,
      "name": "Administrator",
      "username": "admin",
      "role": "admin"
    }
  }
}
```

**Error Response 401**

```json
{
  "success": false,
  "message": "Username atau password salah",
  "errors": []
}
```

---

### 4.2 Get Current User

Dipakai untuk mengecek apakah admin masih login.

**Endpoint**

```http
GET /auth/me
```

**Headers**

```http
Authorization: Bearer jwt_token_here
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Data user berhasil diambil",
  "data": {
    "id": 1,
    "name": "Administrator",
    "username": "admin",
    "role": "admin"
  }
}
```

---

## 5. Dashboard

Dashboard menampilkan ringkasan sistem seperti jumlah ruangan kosong, ruangan dipakai, transaksi hari ini, dan pendapatan hari ini.

### 5.1 Get Dashboard Summary

**Endpoint**

```http
GET /dashboard/summary
```

**Headers**

```http
Authorization: Bearer jwt_token_here
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Ringkasan dashboard berhasil diambil",
  "data": {
    "emptyRooms": 4,
    "usedRooms": 0,
    "todayTransactions": 2,
    "todayIncome": 105000
  }
}
```

---

### 5.2 Get Room Status for Dashboard

Dipakai untuk kartu status ruangan pada halaman dashboard.

**Endpoint**

```http
GET /dashboard/rooms
```

**Headers**

```http
Authorization: Bearer jwt_token_here
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Status ruangan berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "PS Room 1",
      "psType": "PS5",
      "pricePerHour": 15000,
      "status": "kosong"
    },
    {
      "id": 2,
      "name": "PS Room 2",
      "psType": "PS5",
      "pricePerHour": 15000,
      "status": "kosong"
    },
    {
      "id": 3,
      "name": "PS Room 3",
      "psType": "PS4",
      "pricePerHour": 10000,
      "status": "kosong"
    },
    {
      "id": 4,
      "name": "PS Room 4",
      "psType": "PS4",
      "pricePerHour": 10000,
      "status": "kosong"
    }
  ]
}
```

---

## 6. Rooms / Manajemen Ruangan

Data ruangan berisi nama ruangan, jenis PS, harga per jam, dan status awal.

### Enum Room

```txt
psType: PS4 | PS5
status: kosong | dipakai | maintenance
```

---

### 6.1 Get All Rooms

**Endpoint**

```http
GET /rooms
```

**Headers**

```http
Authorization: Bearer jwt_token_here
```

**Query Params Optional**

```txt
status=kosong
psType=PS5
search=room
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Data ruangan berhasil diambil",
  "data": [
    {
      "id": 1,
      "name": "PS Room 1",
      "psType": "PS5",
      "pricePerHour": 15000,
      "status": "kosong",
      "createdAt": "2026-06-04T06:00:00.000Z",
      "updatedAt": "2026-06-04T06:00:00.000Z"
    }
  ]
}
```

---

### 6.2 Get Room Detail

**Endpoint**

```http
GET /rooms/:id
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Detail ruangan berhasil diambil",
  "data": {
    "id": 1,
    "name": "PS Room 1",
    "psType": "PS5",
    "pricePerHour": 15000,
    "status": "kosong",
    "createdAt": "2026-06-04T06:00:00.000Z",
    "updatedAt": "2026-06-04T06:00:00.000Z"
  }
}
```

---

### 6.3 Create Room

Dipakai pada modal **Tambah Ruangan**.

**Endpoint**

```http
POST /rooms
```

**Request Body**

```json
{
  "name": "PS Room 5",
  "psType": "PS4",
  "pricePerHour": 10000,
  "status": "kosong"
}
```

**Success Response 201**

```json
{
  "success": true,
  "message": "Ruangan berhasil ditambahkan",
  "data": {
    "id": 5,
    "name": "PS Room 5",
    "psType": "PS4",
    "pricePerHour": 10000,
    "status": "kosong",
    "createdAt": "2026-06-04T07:00:00.000Z",
    "updatedAt": "2026-06-04T07:00:00.000Z"
  }
}
```

**Validation Error 400**

```json
{
  "success": false,
  "message": "Validasi gagal",
  "errors": [
    "Nama ruangan wajib diisi",
    "Jenis PS hanya boleh PS4 atau PS5",
    "Harga per jam harus lebih dari 0"
  ]
}
```

---

### 6.4 Update Room

Dipakai pada tombol edit di halaman **Manajemen Ruangan**.

**Endpoint**

```http
PUT /rooms/:id
```

**Request Body**

```json
{
  "name": "PS Room 1",
  "psType": "PS5",
  "pricePerHour": 15000,
  "status": "kosong"
}
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Ruangan berhasil diperbarui",
  "data": {
    "id": 1,
    "name": "PS Room 1",
    "psType": "PS5",
    "pricePerHour": 15000,
    "status": "kosong",
    "createdAt": "2026-06-04T06:00:00.000Z",
    "updatedAt": "2026-06-04T08:00:00.000Z"
  }
}
```

---

### 6.5 Delete Room

**Endpoint**

```http
DELETE /rooms/:id
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Ruangan berhasil dihapus",
  "data": {
    "id": 1
  }
}
```

**Conflict Response 409**

```json
{
  "success": false,
  "message": "Ruangan tidak bisa dihapus karena sedang dipakai",
  "errors": []
}
```

---

## 7. Booking / Pemesanan Aktif

Pemesanan aktif berisi sesi bermain yang sedang berjalan.  
Saat pesanan dibuat, status ruangan berubah dari `kosong` menjadi `dipakai`.

### Enum Booking

```txt
status: aktif | selesai | dibatalkan
paymentStatus: belum_dibayar | sudah_dibayar
```

---

### 7.1 Get Active Bookings

Dipakai pada halaman **Pemesanan Aktif**.

**Endpoint**

```http
GET /bookings/active
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Data pemesanan aktif berhasil diambil",
  "data": [
    {
      "id": 1,
      "customerName": "Aryo",
      "room": {
        "id": 1,
        "name": "PS Room 1",
        "psType": "PS5",
        "pricePerHour": 15000
      },
      "durationHours": 2,
      "totalPrice": 30000,
      "paymentStatus": "belum_dibayar",
      "status": "aktif",
      "startedAt": "2026-06-04T06:08:00.000Z",
      "createdAt": "2026-06-04T06:08:00.000Z"
    }
  ]
}
```

**Empty Response 200**

```json
{
  "success": true,
  "message": "Tidak ada pemesanan aktif",
  "data": []
}
```

---

### 7.2 Create Booking

Dipakai pada modal **Tambah Pemesanan** dari dashboard atau halaman pemesanan aktif.

**Endpoint**

```http
POST /bookings
```

**Request Body**

```json
{
  "customerName": "Reza",
  "roomId": 2,
  "durationHours": 5
}
```

**Success Response 201**

```json
{
  "success": true,
  "message": "Pesanan berhasil dibuat",
  "data": {
    "id": 2,
    "customerName": "Reza",
    "room": {
      "id": 2,
      "name": "PS Room 2",
      "psType": "PS5",
      "pricePerHour": 15000
    },
    "durationHours": 5,
    "totalPrice": 75000,
    "paymentStatus": "belum_dibayar",
    "status": "aktif",
    "startedAt": "2026-06-04T06:09:00.000Z",
    "createdAt": "2026-06-04T06:09:00.000Z"
  }
}
```

**Conflict Response 409**

```json
{
  "success": false,
  "message": "Ruangan sedang dipakai",
  "errors": []
}
```

---

### 7.3 Update Booking

Dipakai jika admin mengubah durasi, customer, atau status pembayaran.

**Endpoint**

```http
PUT /bookings/:id
```

**Request Body**

```json
{
  "customerName": "Reza",
  "durationHours": 5,
  "paymentStatus": "sudah_dibayar"
}
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Pesanan berhasil diperbarui",
  "data": {
    "id": 2,
    "customerName": "Reza",
    "room": {
      "id": 2,
      "name": "PS Room 2",
      "psType": "PS5",
      "pricePerHour": 15000
    },
    "durationHours": 5,
    "totalPrice": 75000,
    "paymentStatus": "sudah_dibayar",
    "status": "aktif",
    "startedAt": "2026-06-04T06:09:00.000Z",
    "updatedAt": "2026-06-04T06:20:00.000Z"
  }
}
```

---

### 7.4 Finish Booking

Dipakai saat sesi bermain selesai.  
Data akan masuk ke **Riwayat Transaksi**. Status ruangan kembali menjadi `kosong`.

**Endpoint**

```http
PATCH /bookings/:id/finish
```

**Request Body**

```json
{
  "paymentStatus": "sudah_dibayar"
}
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Pesanan berhasil diselesaikan",
  "data": {
    "bookingId": 2,
    "transaction": {
      "id": 10,
      "customerName": "Reza",
      "roomName": "PS Room 2",
      "psType": "PS5",
      "durationHours": 5,
      "totalPrice": 75000,
      "paymentStatus": "sudah_dibayar",
      "transactionDate": "2026-06-04T06:30:00.000Z"
    }
  }
}
```

---

### 7.5 Cancel Booking

Dipakai jika pesanan aktif dibatalkan. Status ruangan kembali menjadi `kosong`.

**Endpoint**

```http
PATCH /bookings/:id/cancel
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Pesanan berhasil dibatalkan",
  "data": {
    "id": 2,
    "status": "dibatalkan"
  }
}
```

---

## 8. Transactions / Riwayat Transaksi

Riwayat transaksi menampilkan semua transaksi rental PS.  
Data bisa berasal dari booking yang selesai atau transaksi manual.

### Enum Transaction

```txt
paymentStatus: belum_dibayar | sudah_dibayar
```

---

### 8.1 Get All Transactions

Dipakai pada halaman **Riwayat Transaksi**.

**Endpoint**

```http
GET /transactions
```

**Query Params Optional**

```txt
search=Reza
date=2026-06-04
paymentStatus=sudah_dibayar
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Data transaksi berhasil diambil",
  "data": [
    {
      "id": 1,
      "customerName": "Reza",
      "roomName": "PS Room 2",
      "psType": "PS5",
      "durationHours": 5,
      "totalPrice": 75000,
      "paymentStatus": "sudah_dibayar",
      "transactionDate": "2026-06-04T06:09:00.000Z",
      "createdAt": "2026-06-04T06:09:00.000Z"
    },
    {
      "id": 2,
      "customerName": "Aryo",
      "roomName": "PS Room 1",
      "psType": "PS5",
      "durationHours": 2,
      "totalPrice": 30000,
      "paymentStatus": "sudah_dibayar",
      "transactionDate": "2026-06-04T06:08:00.000Z",
      "createdAt": "2026-06-04T06:08:00.000Z"
    }
  ],
  "meta": {
    "totalTransactions": 2,
    "paidTransactions": 2,
    "totalIncome": 105000
  }
}
```

---

### 8.2 Create Manual Transaction

Dipakai pada modal **Tambah Transaksi Manual**.

**Endpoint**

```http
POST /transactions/manual
```

**Request Body**

```json
{
  "customerName": "Dina",
  "roomName": "PS Room 3",
  "psType": "PS4",
  "durationHours": 1,
  "totalPrice": 10000,
  "paymentStatus": "sudah_dibayar",
  "transactionDate": "2026-06-04T07:00:00.000Z"
}
```

**Success Response 201**

```json
{
  "success": true,
  "message": "Transaksi manual berhasil ditambahkan",
  "data": {
    "id": 3,
    "customerName": "Dina",
    "roomName": "PS Room 3",
    "psType": "PS4",
    "durationHours": 1,
    "totalPrice": 10000,
    "paymentStatus": "sudah_dibayar",
    "transactionDate": "2026-06-04T07:00:00.000Z",
    "createdAt": "2026-06-04T07:00:00.000Z"
  }
}
```

---

### 8.3 Update Transaction

Dipakai pada tombol edit di halaman **Riwayat Transaksi**.

**Endpoint**

```http
PUT /transactions/:id
```

**Request Body**

```json
{
  "customerName": "Reza",
  "roomName": "PS Room 2",
  "psType": "PS5",
  "durationHours": 5,
  "totalPrice": 75000,
  "paymentStatus": "sudah_dibayar",
  "transactionDate": "2026-06-04T06:09:00.000Z"
}
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Transaksi berhasil diperbarui",
  "data": {
    "id": 1,
    "customerName": "Reza",
    "roomName": "PS Room 2",
    "psType": "PS5",
    "durationHours": 5,
    "totalPrice": 75000,
    "paymentStatus": "sudah_dibayar",
    "transactionDate": "2026-06-04T06:09:00.000Z",
    "updatedAt": "2026-06-04T08:00:00.000Z"
  }
}
```

---

### 8.4 Delete Transaction

Dipakai pada tombol hapus di halaman **Riwayat Transaksi**.

**Endpoint**

```http
DELETE /transactions/:id
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Transaksi berhasil dihapus",
  "data": {
    "id": 1
  }
}
```

---

## 9. Reports / Rekap Data

Endpoint ini opsional. Bisa dipakai jika nanti ingin menambah fitur laporan.

### 9.1 Get Daily Report

**Endpoint**

```http
GET /reports/daily?date=2026-06-04
```

**Success Response 200**

```json
{
  "success": true,
  "message": "Laporan harian berhasil diambil",
  "data": {
    "date": "2026-06-04",
    "totalTransactions": 2,
    "paidTransactions": 2,
    "unpaidTransactions": 0,
    "totalIncome": 105000,
    "transactions": [
      {
        "id": 1,
        "customerName": "Reza",
        "roomName": "PS Room 2",
        "psType": "PS5",
        "durationHours": 5,
        "totalPrice": 75000,
        "paymentStatus": "sudah_dibayar",
        "transactionDate": "2026-06-04T06:09:00.000Z"
      }
    ]
  }
}
```

---

## 10. Data Rules

### 10.1 Room Rules

1. `name` wajib diisi.
2. `psType` hanya boleh `PS4` atau `PS5`.
3. `pricePerHour` harus angka lebih dari 0.
4. `status` default adalah `kosong`.
5. Ruangan dengan status `dipakai` tidak boleh dihapus.
6. Ruangan yang sedang dipakai tidak boleh dibuatkan booking baru.

---

### 10.2 Booking Rules

1. `customerName` wajib diisi.
2. `roomId` wajib mengarah ke data room yang ada.
3. Booking hanya boleh dibuat jika room berstatus `kosong`.
4. `durationHours` minimal 1 jam.
5. `totalPrice` dihitung otomatis oleh backend:

```txt
totalPrice = room.pricePerHour * durationHours
```

6. Setelah booking dibuat, room berubah menjadi `dipakai`.
7. Setelah booking selesai atau dibatalkan, room berubah menjadi `kosong`.
8. Booking selesai akan menghasilkan satu data transaksi.

---

### 10.3 Transaction Rules

1. Transaksi bisa dibuat otomatis dari booking selesai.
2. Transaksi juga bisa dibuat manual lewat halaman Riwayat Transaksi.
3. `totalPrice` untuk transaksi manual boleh dikirim dari frontend.
4. `paymentStatus` hanya boleh `sudah_dibayar` atau `belum_dibayar`.
5. Total pendapatan hanya menghitung transaksi dengan `paymentStatus = sudah_dibayar`.

---

## 11. Format Data untuk Frontend

### Room Object

```json
{
  "id": 1,
  "name": "PS Room 1",
  "psType": "PS5",
  "pricePerHour": 15000,
  "status": "kosong"
}
```

### Booking Object

```json
{
  "id": 1,
  "customerName": "Reza",
  "room": {
    "id": 2,
    "name": "PS Room 2",
    "psType": "PS5",
    "pricePerHour": 15000
  },
  "durationHours": 5,
  "totalPrice": 75000,
  "paymentStatus": "belum_dibayar",
  "status": "aktif",
  "startedAt": "2026-06-04T06:09:00.000Z"
}
```

### Transaction Object

```json
{
  "id": 1,
  "customerName": "Reza",
  "roomName": "PS Room 2",
  "psType": "PS5",
  "durationHours": 5,
  "totalPrice": 75000,
  "paymentStatus": "sudah_dibayar",
  "transactionDate": "2026-06-04T06:09:00.000Z"
}
```

---

## 12. Dummy Data Awal

### Rooms

```json
[
  {
    "id": 1,
    "name": "PS Room 1",
    "psType": "PS5",
    "pricePerHour": 15000,
    "status": "kosong"
  },
  {
    "id": 2,
    "name": "PS Room 2",
    "psType": "PS5",
    "pricePerHour": 15000,
    "status": "kosong"
  },
  {
    "id": 3,
    "name": "PS Room 3",
    "psType": "PS4",
    "pricePerHour": 10000,
    "status": "kosong"
  },
  {
    "id": 4,
    "name": "PS Room 4",
    "psType": "PS4",
    "pricePerHour": 10000,
    "status": "kosong"
  }
]
```

### Transactions

```json
[
  {
    "id": 1,
    "customerName": "Reza",
    "roomName": "PS Room 2",
    "psType": "PS5",
    "durationHours": 5,
    "totalPrice": 75000,
    "paymentStatus": "sudah_dibayar",
    "transactionDate": "2026-06-04T06:09:00.000Z"
  },
  {
    "id": 2,
    "customerName": "Aryo",
    "roomName": "PS Room 1",
    "psType": "PS5",
    "durationHours": 2,
    "totalPrice": 30000,
    "paymentStatus": "sudah_dibayar",
    "transactionDate": "2026-06-04T06:08:00.000Z"
  }
]
```

---

## 13. Catatan Integrasi Frontend dan Backend

### Untuk Frontend

1. Semua request ke backend lewat file service, misalnya:
   - `authService.js`
   - `roomService.js`
   - `bookingService.js`
   - `transactionService.js`
2. Jangan panggil Axios langsung dari banyak komponen.
3. Simpan token login di `localStorage`.
4. Kirim token lewat header `Authorization`.
5. Gunakan format response `response.data.data`.

### Untuk Backend

1. Ikuti nama field sesuai kontrak.
2. Jangan mengganti field tanpa memberi tahu frontend.
3. Semua error memakai format error response umum.
4. Hitung `totalPrice` booking di backend.
5. Update status room secara otomatis saat booking dibuat, selesai, atau dibatalkan.

---

## 14. Checklist Endpoint

### Auth

- [ ] POST `/auth/login`
- [ ] GET `/auth/me`

### Dashboard

- [ ] GET `/dashboard/summary`
- [ ] GET `/dashboard/rooms`

### Rooms

- [ ] GET `/rooms`
- [ ] GET `/rooms/:id`
- [ ] POST `/rooms`
- [ ] PUT `/rooms/:id`
- [ ] DELETE `/rooms/:id`

### Bookings

- [ ] GET `/bookings/active`
- [ ] POST `/bookings`
- [ ] PUT `/bookings/:id`
- [ ] PATCH `/bookings/:id/finish`
- [ ] PATCH `/bookings/:id/cancel`

### Transactions

- [ ] GET `/transactions`
- [ ] POST `/transactions/manual`
- [ ] PUT `/transactions/:id`
- [ ] DELETE `/transactions/:id`

### Reports Optional

- [ ] GET `/reports/daily`
