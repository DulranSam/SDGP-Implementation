const userData = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenX = process.env.ACCESS_TOKEN;
const refreshTokenX = process.env.REFRESH_TOKEN;

async function Login(req, res) {
  const { username, password } = req?.body;

  if (!username || !password) {
    return res.status(400).json({ Alert: "Username or password not provided" });
  }

  try {
    const user = await userData.findOne({ username: username });

    if (!user) {
      return res.status(403).json({ Alert: `${username} unauthorized` });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    const accessToken = jwt.sign({ username: user }, accessTokenX, {
      expiresIn: "5m",
    });

    const refreshToken = jwt.sign({ username: user }, refreshTokenX, {
      expiresIn: "1d",
    });

    if (isPasswordValid) {
      await res.cookie(
        "user",
        { username, password },
        { maxAge: 60000, httpOnly: true }
      );

      return res.status(200).json({
        Alert: `${username} logged in , access Token ${accessToken} & Refresh Token ${refreshToken}`,
      });
    } else {
      return res.status(403).json({ Alert: `${username} unauthorized` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
}

async function LogOut(req, res) {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      return res.status(200).json({ Alert: "User Logged out!" });
    }
  });
}

module.exports = { Login, LogOut };
