import axios from "axios";

// Sesuaikan port dan prefix URL dengan backend temanmu
//const API_URL = "http://localhost:5000/api/transactions";
const API_URL =
  "https://visible-sneeze-grazing.ngrok-free.dev/api/trasnsactions";

export const getTransactions = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Mengembalikan data transaksi dari backend
};

export const updateTransaction =
  async (id, data) => {

    const response =
      await axios.put(
        `${API_URL}/${id}`,
        data
      );

    return response.data;
};

export const deleteTransaction =
  async (id) => {

    const response =
      await axios.delete(
        `${API_URL}/${id}`
      );

    return response.data;
};