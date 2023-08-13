const jwt = require("jsonwebtoken");
const { SECRET } = require("../config/index"); // Import the secret key for JWT from the config

module.exports = function (req, res, next) {
  // Get the token from the header if present
  const token = req.headers["x-auth-token"] || req.headers["authorization"];

  // If no token found, return response (without going to the next middleware)
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    // If can verify the token, set req.user and pass to the next middleware
    const decoded = jwt.verify(token, SECRET); // Verify the token using the secret key
    req.user = decoded; // Attach the decoded user information to the request object
    next(); // Move to the next middleware or route handler
  } catch (ex) {
    // If invalid token
    return res.status(400).send("Invalid token.");
  }
};
