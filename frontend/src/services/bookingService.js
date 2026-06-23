import axios from "axios";

const API_URL = "http://localhost:5000/api/bookings";

export const getBookings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createBooking = async (
  customerName,
  roomId,
  duration
) => {

  const response =
    await axios.post(API_URL, {
      customerName,
      roomId,
      duration
    });

  return response.data;
};

export const finishBooking = async (id) => {
  const response = await axios.patch(
    `${API_URL}/${id}/finish`
  );

  return response.data;
};

export const cancelBooking = async (id) => {
  const response = await axios.patch(
    `${API_URL}/${id}/cancel`
  );

  return response.data;
};

export const approveBooking = async (id) => {
  const token = localStorage.getItem("token");

  const response = await axios.patch(
    `${API_URL}/${id}/approve`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};
