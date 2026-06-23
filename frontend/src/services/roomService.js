import axios from "axios";

const API_URL = "http://localhost:5000/api/rooms";

export const getRooms = async () => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const createRoom = async (roomData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    API_URL,
    roomData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

export const updateRoom = async (id, roomData) => {
  const token = localStorage.getItem("token");

  const res = await axios.put(
    `${API_URL}/${id}`,
    roomData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

export const deleteRoom = async (id) => {
  const token = localStorage.getItem("token");

  const res = await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};