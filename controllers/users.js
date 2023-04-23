//Import environment
require("dotenv").config();
// Import models
const { User } = require("../models");
// Import bcrypt for password hashing
const bcrypt = require("bcrypt");
//Import jwt for user authentication
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { body, validationResult } = require("express-validator");

// Function to CREATE a new user
const createUser = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    //Check if user already exists
    if (user) {
      return res.status(400).json({
        message: "User already exists",
      });
    }
    //Check if password is valid
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long")
      .matches(/^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "i")
      .withMessage(
        "Password must contain at least one letter, one number, and one special character"
      );

    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res.status(400).json({ message: err.array() });
    }
    //Create user account after checks
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      is_admin: req.body.is_admin,
    });
    res.status(201).json({
      message: "User has been created successfully.",
    });
  } catch (err) {
    console.log("PUT /users/create", err);
    res.status(400).json({ message: err.message });
  }
};

// Function to READ all user accounts
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: ["id", "first_name", "last_name", "email", "is_admin"],
    });
    res.json(allUsers);
  } catch (err) {
    console.log("GET /users/all-users", err);
    res.status(400).json({ message: err.message });
  }
};

// Function to UPDATE user account
const updateUser = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
      },
      {
        where: { id: req.params.id },
      }
    );
    res.status(200).json({ message: "User is updated." });
  } catch (err) {
    console.log("PUT /users/update/:id", err);
    res.status(400).json({ message: err.message });
  }
};

// Function to DELETE user account
const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    //delete the user from users table
    await User.destroy({ where: { id } });
    res.status(200).json({
      message: `User is deleted.`,
    });
  } catch (err) {
    console.log("DEL /users/delete", err);
    res.status(400).json({ message: err.message });
  }
};

// Function for user LOGIN
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const result = await bcrypt.compare(req.body.password, user.password);
    if (!result) {
      return res
        .status(401)
        .json({ status: "401 Unauthorized", message: "Invalid password." });
    }

    const payload = {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      is_admin: user.is_admin,
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
    console.log("POST /users/user-login", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

// Function to generate REFRESH token
const refresh = async (req, res) => {
  try {
    const decoded = jwt.verify(req.body.refresh, process.env.REFRESH_SECRET);

    const payload = {
      id: decoded.id,
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      is_admin: decoded.is_admin,
    };

    const access = jwt.sign(payload, process.env.ACCESS_SECRET, {
      expiresIn: "20m",
      jwtid: uuidv4(),
    });

    const response = { access };
    res.json(response);
  } catch (err) {
    console.log("POST /users/refresh", err);
    res.status(401).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  userLogin,
  refresh,
};
