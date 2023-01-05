import axios from "axios";
const baseUrl = "/api/blogs";

let auth = { Authorization: "" };

function setAuth(token) {
  auth.Authorization = `bearer ${token}`;
}

async function getAll() {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(data) {
  const config = { headers: auth };
  const response = await axios.post(baseUrl, data, config);
  return response.data;
}

async function update(id, data) {
  const config = { headers: auth };
  const response = await axios.put(`${baseUrl}/${id}`, data, config);
  return response.data;
}

async function remove(id) {
  const config = { headers: auth };
  await axios.delete(`${baseUrl}/${id}`, config);
}

const blogService = { setAuth, getAll, create, update, remove };
export default blogService;
