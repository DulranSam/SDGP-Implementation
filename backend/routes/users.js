const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const userData = require("../models/users");

router.route("/").get(userController.Users).post(userController.CreateUsers);

router.route("/login").post(loginController.Login);

router
  .route("/:id")
  .delete(async (req, res) => {
    const { id } = req?.params;
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
  });

module.exports = router;
