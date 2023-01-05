const app = require("../app");
const supertest = require("supertest");
const api = supertest(app);
const mongoose = require("mongoose");
const User = require("../models/user");

async function AuthenticateUser() {
  await User.deleteMany({});
  const user = { username: "Kerron", name: "Kerron Donawa", password: "1234" };
  const savedUserResponse = await api.post("/api/users").send(user);
  const response = await api.post("/api/login").send(user);

  savedUserResponse.body.token = response.body.token;
  return savedUserResponse.body;
}

module.exports = { api, db: mongoose, AuthenticateUser };
