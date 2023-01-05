const { api, db } = require("./api_setup");
const User = require("../models/user");

const initialUsers = [
  {
    username: "Admin",
    password: "4321",
  },
];
const usersInDb = async () => {
  const users = await User.find({});
  return users;
};

beforeEach(async () => {
  await User.deleteMany({});
});

test("fails with status code 400 if no username and/or password is provided", async () => {
  let res = await api.post("/api/users").send({}).expect(400);
  expect(res.body.error).toBeDefined();

  res = await api.post("/api/users").send({ username: "Kerron" }).expect(400);
  expect(res.body.error).toBeDefined();

  res = await api.post("/api/users").send({ password: "1234" }).expect(400);
  expect(res.body.error).toBeDefined();

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(0);
});

test("fails with status code 400 if username and/or password is not at least 3 characters long", async () => {
  let res = await api.post("/api/users").send({ username: "K", password: "1234" }).expect(400);
  expect(res.body.error).toBeDefined();

  res = await api.post("/api/users").send({ username: "Kerron", password: "12" }).expect(400);
  expect(res.body.error).toBeDefined();

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(0);
});

test("user with unique username is successfully created with status code 201 and hashed pw is not returned", async () => {
  const res = await api.post("/api/users").send({ username: "Unique", password: "1234" }).expect(201);
  expect(res.body.username).toBe("Unique");
  expect(res.body.hashedPassword).toBeUndefined();

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(1);
});

test("user with already existing username is not created and returns status code 400", async () => {
  await User.insertMany(initialUsers);

  const res = await api.post("/api/users").send({ username: initialUsers[0].username, password: "1234" }).expect(400);
  expect(res.body.error).toBe("Username is already in use");

  const usersAtEnd = await usersInDb();
  expect(usersAtEnd).toHaveLength(1);
});

afterAll(() => {
  db.connection.close();
});
