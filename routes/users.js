// Import express & express router
const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

// Import functions from controller
const {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  userLogin,
  adminLogin,
  refresh,
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
router.get("/all-users", auth, getAllUsers);
router.get("/user", auth, getUser);
router.put("/update/:id", auth, updateUser);
router.delete("/delete", auth, deleteUser);
router.post("/user-login", userLogin);
router.post("/admin-login", adminLogin);
router.post("/refresh", refresh);

// Export routes for server.js to access
module.exports = router;
