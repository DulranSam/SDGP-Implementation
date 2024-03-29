const userData = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const accessTokenX = process.env.ACCESS_TOKEN;
const refreshTokenX = process.env.REFRESH_TOKEN;

async function Login(req, res, next) {
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

    if (isPasswordValid) {
      const accessToken = jwt.sign(
        { user: { username, password } },
        accessTokenX,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { user: { username, password } },
        refreshTokenX,
        {
          expiresIn: "1d",
        }
      );

      req.session.user = { username, maxAge: "1d" }; // Removed storing password in session

      return res.status(200).json({
        Alert: `${username} logged in `,
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        username: username,
        session: req.session.user,
      });
    } else {
      return res.status(401).json({ Alert: `${username} unauthorized` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
}

const status = (req, res) => {
  const user = req?.session?.user;

  if (!user || !user.username || !user.password) {
    return res.status(401).json({ Alert: "Unauthorized!" });
  } else {
    return res
      .status(200)
      .json({ username: user.username, password: user.password });
  }
};

async function LogOut(req, res) {
  if (req?.session?.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ Alert: "Error while logging out!" });
      } else {
        return res.status(200).json({ Alert: "User Logged out!" });
      }
    });
  } else {
    return res.status(500).json({ Alert: "No user was logged in!" });
  }
}

module.exports = { Login, LogOut, status };
