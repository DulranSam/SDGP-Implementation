const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const adminPage = require("./routes/admin");
const mongoose = require("mongoose");
const users = require("./routes/users");

app.use(express.json());
app.use(cors());

app.use("/admin", adminPage);
app.use("/users", users);

async function start() {
  await mongoose.connect(cluster, { useNewUrlParser: true });
  app.listen(port, console.log(`Servers up on port ${port}`));
}

start();
