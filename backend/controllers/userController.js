const userData = require("../models/users");
const HashPass = require("./secure/Hashing");
async function Users(req, res) {
  const users = await userData.find();
  if (users.length) {
    res.status(200).json(users);
  } else {
    res.status(400).json({ Alert: "No users found!" });
  }
}

async function CreateUsers(req, res) {
  try {
    const { username, password, mail } = req?.body;

    if (!username || !password || !mail) {
      return res
        .status(400)
        .json({ Alert: "Username/Password or Mail missing" });
    }

    const userExists = await userData.findOne({
      $or: [{ username: username }, { mail: mail }],
    });

    if (!userExists) {
      let savedPhoto;

      const hashedPWD = new HashPass(password).getHashedPassword();

      await userData.create({
        username,
        password: hashedPWD,
        mail,
        // photo: req.file ? req.file.filename : null,
      });

      req.session.user = { username, password };

      return res.status(200).json({ Alert: `Account ${username} Created` });
    } else {
      return res.status(409).json({
        Alert: `${username} or ${mail} already exists!`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

module.exports = { Users, CreateUsers };
