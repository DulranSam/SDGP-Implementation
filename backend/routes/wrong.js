const express = require("express");
const router = express.Router();
const wrongPure = require("../controllers/wrongPure");
const wrongStat = require("../controllers/wrongStat");
router
  .route("/pure")
  .get(wrongPure.getQuestion)
  .post(wrongPure.createWrongQuestion);

router
  .route("/stat")
  .get(wrongStat.getQuestion)
  .post(wrongStat.createWrongQuestion);

module.exports = router;
