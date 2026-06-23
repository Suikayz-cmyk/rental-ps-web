import axios from "axios";

//const API_URL = "http://localhost:5000/api/customers";

const API_URL =
  "https://visible-sneeze-grazing.ngrok-free.dev/api/customers";

export const customerLogin =
  async (phone) => {

    const response =
      await axios.post(
        `${API_URL}/login`,
        { phone }
      );

    return response.data;

};

export const getMyBookings =
  async (customerId) => {

    const response =
      await axios.get(
        `${API_URL}/${customerId}/bookings`
      );

    return response.data;

};

export const registerCustomer =
  async (payload) => {

    const response =
      await axios.post(
        `${API_URL}/register`,
        payload
      );

    return response.data;

};