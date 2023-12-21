const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT;
const cluster = process.env.CLUSTER;
const cors = require("cors");
const adminPage = require("./routes/admin");
const mongoose = require("mongoose");
const users = require("./routes/users");
const social = require("./routes/social");
// const SQLServer = require("./SQL/SQLServer"); uncomment if needed lol
const gpt = require("./routes/gpt");
const { join } = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const helmet = require("helmet");

app.use(cors({ origin: true })); //allow access from anywhere
app.use(helmet()); //to protect the api
app.use(express.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ strict: false }));
app.use("/gpt", gpt);
app.use("/admin", adminPage);
app.use("/users", users);
app.use("/social", social);

if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}
app.use(express.static(join(__dirname, "public"))); //store everything here

//anything below this is an unknown path , 404
if (!fs.existsSync(join(__dirname, "views"))) {
  fs.mkdirSync(join(__dirname, "views"));
}

app.use("*", (req, res) => {
  res.status(400);
  if (req.accepts("html")) {
    res.sendFile(join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ Alert: "404 , path not found" });
  } else {
    res.type("txt").send("404 Error, path not found");
  }
});

async function start() {
  // await SQLServer.SQLConnect();
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true },
    console.log(`Connected to cluster`)
  );
  app.listen(port, console.log(`Servers up on port ${port}`));
}

start();
