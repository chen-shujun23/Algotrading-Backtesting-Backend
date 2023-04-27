//Import environment
require("dotenv").config();
// Import User model
const { User, StrategySMA, UserStrategy } = require("../models");

//Function to CREATE a new SMA strategy for user
const createStrategySMA = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id } });
    // Check if strategy already exists for user
    let existingStrategySMA = await StrategySMA.findOne({
      where: {
        symbol: req.body.symbol,
        title: req.body.title,
        capital: req.body.capital,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        qty_shares: req.body.qty_shares,
        sSMA: req.body.sSMA,
        lSMA: req.body.lSMA,
      },
    });
    if (existingStrategySMA) {
      const userStrategy = await UserStrategy.findOne({
        where: {
          user_email: user.email,
          strategySMA_id: existingStrategySMA.id,
        },
      });
      if (userStrategy) {
        return res.status(409).json({
          message: "This strategy already exists for user.",
        });
      }
    }
    // Create strategySMA entry after checks
    const strategySMA = await StrategySMA.create({
      symbol: req.body.symbol,
      title: req.body.title,
      capital: req.body.capital,
      start_date: req.body.start_date,
      end_date: req.body.end_date,
      qty_shares: req.body.qty_shares,
      sSMA: req.body.sSMA,
      lSMA: req.body.lSMA,
    });

    await UserStrategy.create({
      user_email: user.email,
      strategySMA_id: strategySMA.id,
    });

    res
      .status(201)
      .json({ message: "Strategy has been created successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Function to get strategiesSMA by user id (NEED AUTH)
const getStrategiesSMA = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({ where: { id } });
    const strategies = await user.getStrategySMAs();
    res.json(strategies);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

// Function to DELETE a StrategySMA for a user
const deleteStrategySMA = async (req, res) => {
  try {
    const id = req.params.id;
    const strategySMA = await StrategySMA.findByPk(id);

    // Find all UserStrategy entries with the same strategySMA_id
    const userStrategies = await UserStrategy.findAll({
      where: {
        strategySMA_id: strategySMA.id,
      },
    });

    // If other users have the same strategySMA, only delete the association entry
    if (userStrategies.length > 1) {
      const user = await User.findByPk(req.user.id);
      await UserStrategy.destroy({
        where: {
          user_email: user.email,
          strategySMA_id: strategySMA.id,
        },
      });
    } else {
      // Otherwise, delete the strategySMA and the association entry
      await strategySMA.destroy();
      await UserStrategy.destroy({
        where: {
          strategySMA_id: strategySMA.id,
        },
      });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createStrategySMA,
  getStrategiesSMA,
  deleteStrategySMA,
};
