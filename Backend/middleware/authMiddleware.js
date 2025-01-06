// authMiddleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1]; // Extract the token from the header
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token

      // Get the user from the database based on the decoded ID
      req.user = await User.findById(decoded.id).select("-password");
      next(); // Continue to the next middleware or controller
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
