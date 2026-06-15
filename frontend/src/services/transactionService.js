import axios from "axios";

// Sesuaikan port dan prefix URL dengan backend temanmu
const API_URL = "http://localhost:5000/api/transactions";

export const getTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Mengembalikan data transaksi dari backend
};