// Import express & express router
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

// Import functions from controller
const {
  createStrategySMA,
  getStrategiesSMA,
  deleteStrategySMA,
} = require("../controllers/strategiesSMA");

// Create routes/ endpoints
router.post("/:id/create-strategies", auth, createStrategySMA);
router.get("/:id/get-strategies", auth, getStrategiesSMA);
router.delete("/delete", auth, deleteStrategySMA);

// Export routes for server.js to access
module.exports = router;
