require("dotenv").config();
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      return res.status(401).send({
        status: "401 Unauthorized",
        message: "Not authorised to access",
      });
    }
  } else {
    return res.status(403).json({
      status: "403 Forbidden",
      message: "Missing token",
    });
  }
};

module.exports = auth;
