require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const app = express();
const router = express.Router();
const PORT = process.env.PORT || 5001;

//Import routes
const users = require("./routes/users");
const strategies = require("./routes/strategies");

//Connect to Database
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);
app.use("/strategies", strategies);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});

//Express app testing
app.use(
  "/",
  router.get("/", async (req, res, next) => {
    return res.status(200).json({
      title: "Express Testing",
      message: "The app is working properly!",
    });
  })
);
