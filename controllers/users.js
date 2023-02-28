//Import environment
require("dotenv").config();
// Import User model
const { User } = require("../models");
// Import modules for encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");

// Function for creating user account
const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({
        status: "Bad Request",
        message: "User already exists",
      });
    }
    const { first_name, last_name, email, password, is_admin, is_active } =
      req.body;
    const hash = await bcrypt.hash(password, 10);
    const createUser = await User.create({
      first_name,
      last_name,
      email,
      password: hash,
      is_admin,
      is_active,
    });
    res.status(201).json({
      status: "Created",
      message: "User has been created successfully.",
    });
  } catch (err) {
    res.status(400).json({ status: "Bad Request", message: err.message });
  }
};

// Function for user login
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res
        .status(400)
        .json({ status: "Bad Request", message: "Email does not exist." });
    }
    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res
        .status(401)
        .json({ status: "Unauthorized", message: "Invalid password." });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(payload, process.env.REFRESH_SECRET, {
      expiresIn: "30D",
      jwtid: uuidv4(),
    });

    const response = { access, refresh };
    res.json(response);
  } catch (err) {
    res.status(400).json({ status: "Bad Request", message: err.message });
  }
};

module.exports = { createUser };
