//Import environment
require("dotenv").config();
// Import User model
const { User, Strategy, UserStrategy } = require("../models");
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
        message: "User already exists",
      });
    }
    //Check if password is valid
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

// Function to READ all user accounts (NEED AUTH)
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

// Function to READ one user account (NEED AUTH)
const getUser = async (req, res) => {
  try {
    const user = await User.findAll({
      where: { email: req.body.email },
      attributes: ["id", "first_name", "last_name", "email", "is_admin"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    res.json(user);
  } catch (err) {
    console.log("GET /users/user", err);
    res.status(400).json({ message: err.message });
  }
};

// Function to UPDATE user account (NEED AUTH)
const updateUser = async (req, res) => {
  console.log(req.params);
  console.log(req.body);

  try {
    const user = await User.findOne({
      where: { id: req.params.id },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    const hash = await bcrypt.hash(req.body.password, 10);
    await User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        password: hash,
        is_admin: req.body.is_admin,
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

// Function to DELETE user account (NEED AUTH)
const deleteUser = async (req, res) => {
  try {
    await User.destroy({ where: { email: req.body.email } });
    res.status(200).json({ message: "User is deleted." });
  } catch (err) {
    console.log("DEL /users/delete", err);
    res.status(400).json({ message: err.message });
  }
};

// Function for user login
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

// Function to generate new access token
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

// Function to get strategies by user UUID (NEED AUTH)
const getStrategiesByUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Strategy,
          attributes: [
            "id",
            "symbol",
            "title",
            "capital",
            "start_date",
            "end_date",
            "sSMA",
            "lSMA",
            "qty_shares",
          ],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const strategies = user.Strategies;
    return res.status(200).send({ strategies });
  } catch (err) {
    console.log("GET /:id/strategies", err);
    return res.status(500).json({ message: err.message });
  }
};

//Function to create a new strategy for user (NEED AUTH)
const createStrategy = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).send("User not found.");
    }

    if (user.is_admin) {
      return res.status(403).json({
        message: "Cannot create strategies using admin account.",
      });
    }

    let existingStrategy = await Strategy.findOne({
      where: {
        symbol: req.body.symbol,
        title: req.body.title,
        capital: req.body.capital,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        sSMA: req.body.sSMA,
        lSMA: req.body.lSMA,
        qty_shares: req.body.qty_shares,
      },
    });

    if (existingStrategy) {
      const userStrategy = await UserStrategy.findOne({
        where: {
          user_id: user.id,
          strategy_id: existingStrategy.id,
        },
      });

      if (userStrategy) {
        return res.status(409).json({
          message: "This strategy already exists for user.",
        });
      }

      // Associate existing strategy with the new user
      await UserStrategy.create({
        user_id: user.id,
        strategy_id: existingStrategy.id,
      });

      return res.json({
        message: "Existing strategy has been associated with the user.",
      });
    }

    const strategy = await Strategy.create({
      symbol: req.body.symbol,
      title: req.body.title,
      capital: req.body.capital,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      sSMA: req.body.sSMA,
      lSMA: req.body.lSMA,
      qty_shares: req.body.qty_shares,
    });

    await UserStrategy.create({
      user_id: user.id,
      strategy_id: strategy.id,
    });

    res
      .status(201)
      .json({ message: "Strategy has been created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  refresh,
  getStrategiesByUser,
  createStrategy,
};
