import axios from "axios";
const baseUrl = "/api/users";

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function getAllPopulated() {
  const response = await axios.get(`${baseUrl}/populated`);
  return response.data;
}

async function getById(id) {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
}

const userService = { getAll, getAllPopulated, getById };
export default userService;
