// Import express & express router
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Import functions from controller
const {
  createStrategy,
  getStrategies,
  deleteStrategy,
} = require("../controllers/strategies");

// Create routes/ endpoints
router.post("/:id/strategies", auth, createStrategy);
router.get("/:id/strategies", auth, getStrategies);
router.delete("/delete", auth, deleteStrategy);

// Export routes for server.js to access
module.exports = router;
