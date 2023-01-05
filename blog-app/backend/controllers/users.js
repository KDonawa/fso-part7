const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, password, name } = req.body;

  const newUser = new User({ username, password, name });
  await newUser.validate(); // validate username and password with mongoose validation

  const existingUser = await User.findOne({ username });
  if (existingUser) return res.status(400).json({ error: "Username is already in use" });

  const saltRounds = 10;
  newUser.password = await bcrypt.hash(password, saltRounds);

  const user = await newUser.save();
  res.status(201).json(user);
});

module.exports = router;
