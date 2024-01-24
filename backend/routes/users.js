const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const userIDController = require("../controllers/userIDControl/userIDControl");

router.route("/").get(userController.Users).post(userController.CreateUsers);

router.route("/login").post(loginController.Login);
router.route("/status").post((req, res) => {
  const { user } = req?.session;

  if (!user || !user.username || !user.password) {
    return res.status(401).json({ Alert: "Unauthorized!" });
  } else {
    return res
      .status(200)
      .json({ username: user.username, password: user.password });
  }
});

router.route("/logout").post(loginController.LogOut);

router
  .route("/:id")
  .delete(userIDController.DeleteUser)
  .put(userIDController.UpdateUsers);

module.exports = router;
