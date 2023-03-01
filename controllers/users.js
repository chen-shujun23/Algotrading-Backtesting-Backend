//Import environment
require("dotenv").config();
// Import User model
const { User } = require("../models");
// Import modules for encryption
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

// Function to CREATE a new user
const createUser = async (req, res) => {
  try {
    //Check if user already exists
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: "User already exists",
      });
    }
    //Check if password if valid
    const err = validationResult(req);
    if (!err.isEmpty()) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: err.array() });
    }
    //Create user account after checks
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: hash,
      is_admin: req.body.is_admin,
      is_active: req.body.is_active,
    });
    res.status(201).json({
      status: "201 Created",
      message: "User has been created successfully.",
    });
  } catch (err) {
    console.log("PUT /users/create", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

// Function to READ all user accounts (NEED AUTH)
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: ["id", "first_name", "last_name", "email", "is_admin"],
    });
    res.json(allUsers);
  } catch (err) {
    console.log("GET /users/all-users", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

// Function to READ one user account (NEED AUTH)
const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: { email: req.body.email },
      attributes: ["id", "first_name", "last_name", "email", "is_admin"],
    });

    if (!user) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "User does not exist." });
    }
    res.json(user);
  } catch (err) {
    console.log("GET /users/user", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

// Function to UPDATE user account (NEED AUTH)
const updateUser = async (req, res) => {
  try {
    // const user = await User.findOne({
    //   where: { id: req.params.id },
    // });
    // if (!user) {
    //   return res
    //     .status(400)
    //     .json({ status: "400 Bad Request", message: "User does not exist." });
    // }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash,
        is_admin: req.body.is_admin,
        is_active: req.body.is_active,
      },
      {
        where: { id: req.params.id },
      }
    );
  } catch (err) {
    console.log("PUT /users/update/:id", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

// Function to DELETE user account (NEED AUTH)
const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { email: req.body.email } });
    res.status(200).json({ status: "200 OK", message: "User is deleted." });
  } catch (err) {
    console.log("DEL /users/delete", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

// Function for user login
const userLogin = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "User does not exist." });
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

// Function for admin login
const adminLogin = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      return res
        .status(400)
        .json({ status: "400 Bad Request", message: "Email does not exist." });
    }
    if (!user.is_admin) {
      return res.status(403).json({
        status: "403 Forbidden",
        message: "User is not an administrator.",
      });
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
    console.log("POST /users/admin-login", err);
    res.status(400).json({ status: "400 Bad Request", message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  adminLogin,
};
