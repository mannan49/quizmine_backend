const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index");

module.exports = function (req, res, next) {
  // Get the token from the header if present
  const token = req.headers["x-auth-token"] || req.headers["authorization"];

  // If no token found, return response (without going to the next middleware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // Remove "Bearer " prefix if present
    const tokenValue = token.replace("Bearer ", "");

    // If can verify the token, set req.user and pass to the next middleware
    const decoded = jwt.verify(tokenValue, SECRET);
    req.user = decoded;

    if (req.user.role !== "admin") {
      return res.status(403).send("Insufficient permissions");
    }

    next();
  } catch (ex) {
    // If invalid token
    return res.status(400).send("Invalid token.");
  }
};
