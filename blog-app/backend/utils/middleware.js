const logger = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

function errorHandler(error, req, res, next) {
  logger.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ error: "malformatted id" });
  }
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json({ error: error.message });
  }
  next(error);
}

function extractToken(auth) {
  if (auth && auth.toLowerCase().startsWith("bearer ")) {
    return auth.substring(7);
  }
  return null;
}
function tokenExtractor(req, res, next) {
  const token = extractToken(req.get("authorization"));
  req.token = token;
  next();
}

async function userExtractor(req, res, next) {
  const token = extractToken(req.get("authorization"));
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!decodedToken.id) {
    return res.status(401).json({ error: "Invalid token" });
  }

  req.user = await User.findById(decodedToken.id);
  next();
}

module.exports = { errorHandler, tokenExtractor, userExtractor };
