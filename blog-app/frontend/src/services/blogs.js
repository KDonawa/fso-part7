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

async function getAllPopulated() {
  const response = await axios.get(`${baseUrl}/populated`);
  return response.data;
}

async function getById(id) {
  const response = await axios.get(`${baseUrl}/${id}`);
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

async function postComment(comment, id) {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
  return response.data;
}

const blogService = {
  setAuth,
  getAll,
  getAllPopulated,
  getById,
  create,
  update,
  remove,
  postComment,
};
export default blogService;
