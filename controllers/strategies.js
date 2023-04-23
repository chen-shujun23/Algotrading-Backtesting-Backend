//Import environment
require("dotenv").config();
// Import User model
const { User, Strategy, UserStrategy } = require("../models");

//Function to CREATE a new strategy for user
const createStrategy = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    // Check if strategy already exists for user
    let existingStrategy = await Strategy.findOne({
      where: {
        symbol: req.body.symbol,
        title: req.body.title,
        capital: req.body.capital,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        qty_shares: req.body.qty_shares,
        trend_indicator_id: req.body.trend_indicator_id,
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
    }
    // Create strategy entry after checks
    const strategy = await Strategy.create({
      symbol: req.body.symbol,
      title: req.body.title,
      capital: req.body.capital,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      qty_shares: req.body.qty_shares,
      trend_indicator_id: req.body.trend_indicator_id,
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

// Function to get strategies by user UUID (NEED AUTH)
const getStrategies = async (req, res) => {
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
  createStrategy,
  getStrategies,
  deleteStrategy,
};
