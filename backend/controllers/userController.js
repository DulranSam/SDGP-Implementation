const userData = require("../models/users");
const bcrypt = require("bcrypt");
const fs = require("fs");
const { join } = require("path");

async function Users(req, res) {
  const users = await userData.find();
  res.json(users);
}

async function CreateUsers(req, res) {
  try {
    const { username, password, mail, photo } = req.body;
    if (!username || !password || !mail) {
      return res
        .status(400)
        .json({ Alert: "Username/Password or Mail missing" });
    }

    const userExists = await userData.findOne({ username: username });
    if (!userExists) {
      let savedPhoto;
      if (req.file) {
        savedPhoto = fs.writeFileSync(
          join(__dirname, "public", "userpfps", photo)
        );
      }

      const hashedPWD = bcrypt.hashSync(password, 10);
      const newUser = new userData({
        username,
        password: hashedPWD,
        mail,
        photo,
      });
      await newUser.save();
      return res.status(200).json({ Alert: `${username} Created` });
    } else {
      return res.status(409).json({
        Alert: `${username} already exists , please use another username`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { Users, CreateUsers };
