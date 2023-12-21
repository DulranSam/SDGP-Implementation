const express = require("express");
const router = express.Router();
const statisticController = require("../controllers/StatisticController");
const pureMaths = require("../controllers/PureMathController");

router.route("/").get((req, res) => {
  res.json({
    Alert:
      "Change path (/stat) to get stat data or (/pure) to get pure math data",
  });
});

router
  .route("/stat")
  .get(statisticController.StatisticQuestions)
  .post(statisticController.CreateQuestions);

router
  .route("/pure")
  .get(pureMaths.PureMathQuestions)
  .post(pureMaths.AddPureMaths);

module.exports = router;
