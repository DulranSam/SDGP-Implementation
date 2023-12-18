const userData = require("../models/users");
const bcrypt = require("bcrypt");

async function Login(req, res) {
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
}

module.exports = { Login };
