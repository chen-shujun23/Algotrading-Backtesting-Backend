// Import express & express router
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

// Import functions from controller
const {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  userLogin,
  refresh,
  getStrategiesByUser,
  createStrategy,
} = require("../controllers/users");

// Create routes/ endpoints
router.put(
  "/create",
  [
    body(
      "password",
      "Password must have minimum eight characters, at least one letter, one number and one special character."
    ).matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
  ],
  createUser
);
router.get("/all-users", authAdmin, getAllUsers);
router.put("/update/:id", auth, updateUser);
router.delete("/delete", authAdmin, deleteUser);
router.post("/user-login", userLogin);
router.post("/refresh", refresh);
router.get("/:id/strategies", auth, getStrategiesByUser);
router.post("/:id/strategies", auth, createStrategy);

// Export routes for server.js to access
module.exports = router;
