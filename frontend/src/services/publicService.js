import axios from "axios";

const API_URL = "http://localhost:5000/api/public";

export const getPublicRooms = async () => {
const response = await axios.get(`${API_URL}/rooms`);
return response.data;
};

export const createPublicBooking = async (data) => {
const response = await axios.post(
`${API_URL}/booking`,
data
);

return response.data;
};
