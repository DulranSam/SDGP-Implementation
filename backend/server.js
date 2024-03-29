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
const session = require("express-session");
const gpt = require("./routes/gpt");
const { join } = require("path");
const fs = require("fs");
const helmet = require("helmet");
const dashboard = require("./routes/dashboard");
const gemini = require("./routes/gemini");
const learningMaterial = require("./routes/learn");
const wrongQuestion = require("./routes/wrong");
const userModel = require("./models/users");

async function authenticated(req, res, next) {
  if (req?.session?.user) {
    const user = req.session.user;
    const foundUser = await userModel.findOne({ username: user.username });
    if (!foundUser) {
      return res.status(400).json({ Alert: "invalid user!" });
    }
    return res.status(200).json(foundUser);
  } else {
    return res.status(401).json({ Alert: "Not logged in!" });
  }
  next();
}

app.use(cors({ origin: "*" })); //allow access from anywhere FOR NOW
app.use(helmet()); //to protect the api
app.use(express.urlencoded());
app.use(express.json({ limit: "*" }));
app.use(
  session({
    secret: "someencryptedkeylol123",
    resave: false,
    saveUninitialized: false,
    httpSecure: true,
    cookie: { maxAge: 60000 }, // session timeout of 60 seconds
  })
);

app.use("/users", users);
// app.use(authenticated); //when the session exists (user is authenticated) let them access the rest of the routes
app.use("/resources", learningMaterial);
app.use("/gpts", gpt);
app.use("/question", wrongQuestion);
app.use("/admins", adminPage);
app.use("/socials", social);
app.use("/dashboards", dashboard);
app.use("/gemini", gemini);

if (!fs.existsSync(join(__dirname, "public"))) {
  fs.mkdirSync(join(__dirname, "public"));
}
app.use(express.static(join(__dirname, "public"))); //get rid of this approach and use cloudinary!

//anything below this is an unknown path , 404
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
  await mongoose.connect(
    cluster,
    { useNewUrlParser: true },
    console.log(`Connected to cluster`)
  );
  app.listen(port, console.log(`Servers up on port ${port}`));
}

start();
