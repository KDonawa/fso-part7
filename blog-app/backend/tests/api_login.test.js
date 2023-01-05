const { api, db } = require("./api_setup");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const userInfo = { username: "Kerron", password: "nv7394hbg934gb" };

beforeAll(async () => {
  await User.deleteMany({});
  await api.post("/api/users").send(userInfo);
});

test("login is successful with status code 200 if valid username and password are provided and a token is returned", async () => {
  const hashedPassword = await bcrypt.hash(userInfo.password, 10);
  await new User({ username: userInfo.username, password: hashedPassword }).save();

  const response = await api.post("/api/login").send(userInfo).expect(200);
  expect(response.body.token).toBeDefined();
});

test("login fails with code 401 if invalid password is provided", async () => {
  const falseCredentials = { username: userInfo.username, password: "InvalidPassword" };
  const response = await api.post("/api/login").send(falseCredentials).expect(401);
  expect(response.body.token).toBeUndefined();
});

test("login fails with code 401 if invalid username is provided", async () => {
  const falseCredentials = { username: "Invalid Username", password: userInfo.password };
  const response = await api.post("/api/login").send(falseCredentials).expect(401);
  expect(response.body.token).toBeUndefined();
});

afterAll(() => {
  db.connection.close();
});
