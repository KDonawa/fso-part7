const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const userAuthenticated = user === null ? false : await bcrypt.compare(password, user.password);

  if (!userAuthenticated) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET);
  res.send({ token, username, name: user.name, id: user._id });
});

module.exports = router;
