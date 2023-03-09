// Import express & express router
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Import functions from controller
const { deleteStrategy } = require("../controllers/strategies");

// Create routes/ endpoints
router.delete("/delete", auth, deleteStrategy);

// Export routes for server.js to access
module.exports = router;
