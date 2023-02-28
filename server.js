require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const app = express();
const PORT = process.env.PORT || 5001;

//Import routes
const users = require("./routes/users");

//Connect to Database
connectDB();

//Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", users);

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
