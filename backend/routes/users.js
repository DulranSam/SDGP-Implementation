const express = require("express");
const router = express.Router();
const userData = require("../models/users");
const bcrypt = require("bcrypt");

router
  .route("/")
  .get(async (req, res) => {
    const users = await userData.find();
    res.json(users);
  })
  .post(async (req, res) => {
    try {
      const { username, password, mail } = req.body;
      if (!username || !password || !mail) {
        return res
          .status(400)
          .json({ Alert: "Username/Password or Mail missing" });
      }

      const userExists = await userData.findOne({ username: username });
      if (!userExists) {
        const hashedPWD = bcrypt.hashSync(password, 10);
        const newUser = new userData({
          username,
          password: hashedPWD,
          mail,
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
  });

router.route("/login").post(async (req, res) => {
  const { username, password } = req.body;

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
      return res.status(200).json({ Alert: `${username} logged in` });
    } else {
      return res.status(403).json({ Alert: `${username} unauthorized` });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ Alert: "Internal Server Error" });
  }
});

router
  .route("/:id")
  .delete(async (req, res) => {
    const { id } = req.params;
    const converted = String(id);

    if (!id) return res.status(400).json({ Alert: "No ID Provided" });

    const verifyanddel = await userData.findOneAndDelete({ _id: converted });
    if (!verifyanddel) {
      return res.status(400).json({ Alert: `${id} doesn't exist` });
    } else {
      return res.status(200).json({ Alert: `${id} deleted` });
    }
  })
  .put(async (req, res) => {
    const { id } = req.params;
    const converted = String(id);

    if (!id) return res.status(400).json({ Alert: "No ID Provided" });

    const verifyanddel = await userData.findOneAndUpdate({ _id: converted });
    if (!verifyanddel) {
      return res.status(400).json({ Alert: `${id} doesn't exist` });
    } else {
      return res.status(200).json({ Alert: `${id} Updated` });
    }
  });

module.exports = router;
