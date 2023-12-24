const express = require("express");
const router = express.Router();
const dashboard = require("../controllers/Dashboard/dashboardx/dashboard");

router.route("/").get(dashboard.GetProgress);

module.exports = router;
