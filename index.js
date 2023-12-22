const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("./config/db");
const userDataRoutes = require("./Routes/userDataRoutes");
require("dotenv").config();
const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userDataRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  try {
    connectDatabase();
    console.log("connected to database"),
      console.log("listening on port", port);
  } catch (error) {
    console.log("error connecting db");
  }
});
