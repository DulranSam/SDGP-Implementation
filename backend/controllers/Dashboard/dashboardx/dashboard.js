const Dashboard = require("../Dash");
const userModel = require("../../../models/users");

async function GetProgress(req, res) {
  const userProgress = new Dashboard("velo", "velo123", "velo@gmail.com"); //just testing , this is invalid

  const findUser = await userModel.find({ userProgress });
  if (!findUser) {
    return res.status(404).json({ Alert: "User Invalid" });
  } else {
    return res.status(200).json(userProgress.returnProg());
  }
}

module.exports = { GetProgress };
