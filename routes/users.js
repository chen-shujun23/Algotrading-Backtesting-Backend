// Import express & express router
const express = require("express");
const router = express.Router();

// Import functions from controller
const { createUser, login } = require("../controllers/users");

// Create routes/ endpoints
router.put("/create", createUser);
// router.post("/login", login);

// Export routes for server.js to access
module.exports = router;
