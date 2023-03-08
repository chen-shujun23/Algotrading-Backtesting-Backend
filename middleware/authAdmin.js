require("dotenv").config();
const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;

      if (decoded.is_admin) {
        next();
      } else {
        return res.status(403).json({
          message: "Not authorised to access",
        });
      }
    } catch (err) {
      return res.status(401).send({
        message: "Not authorised to access",
      });
    }
  } else {
    return res.status(403).json({
      message: "Missing token",
    });
  }
};

module.exports = authAdmin;
