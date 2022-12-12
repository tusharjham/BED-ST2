require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const mongo = require("./config/db");
const userRoute = require("./routes/UserRoutes");
const app = express();
app.use(express.json());
mongoose.set("strictQuery", false);
mongo();
app.use(userRoute);
const PORT = 5000 || process.env.PORT;
app.listen(5000, () => {
  console.log("server running on port 5000");
});
