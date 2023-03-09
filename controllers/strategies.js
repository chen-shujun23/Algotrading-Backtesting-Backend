//Import environment
require("dotenv").config();
// Import User model
const { User, Strategy, UserStrategy } = require("../models");

//Function to delete strategy for user
const deleteStrategy = async (req, res) => {
  const strategyId = req.params.id;

  try {
    const strategy = await Strategy.findByPk(req.params.id);

    if (!strategy) {
      return res.status(404).json({ error: "Strategy not found" });
    }

    const associatedUsers = await strategy.getUsers();

    if (associatedUsers.length === 1) {
      await strategy.destroy();
    } else {
      await strategy.removeUser(req.userId); // replace req.userId with user ID if available
    }

    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  deleteStrategy,
};
