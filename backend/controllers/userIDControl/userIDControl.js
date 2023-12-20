const userData = require("../../models/users");

async function DeleteUser(req, res) {
  const { id } = req?.params;
  const converted = String(id);

  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const verifyanddel = await userData.findOneAndDelete({ _id: converted });
  if (!verifyanddel) {
    return res.status(400).json({ Alert: `${id} doesn't exist` });
  } else {
    return res.status(200).json({ Alert: `${id} deleted` });
  }
}

async function UpdateUsers(req, res) {
  const { id } = req?.params;
  const { updatedUsername } = req?.body;
  const converted = String(id);

  if (!id) return res.status(400).json({ Alert: "No ID Provided" });

  const verifyanddel = await userData.findOneAndUpdate(
    { _id: converted },
    { username: updatedUsername },
    { new: true }
  );
  if (!verifyanddel) {
    return res.status(400).json({ Alert: `${id} doesn't exist` });
  } else {
    return res.status(200).json({ Alert: `${id} Updated` });
  }
}

module.exports = { DeleteUser, UpdateUsers };
