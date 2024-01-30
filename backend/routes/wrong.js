const express = require("express");
const router = express.Router();
const wrongControl = require("../controllers/wrong");

router
  .route("/")
  .get(wrongControl.getQuestion)
  .post(wrongControl.createWrongQuestion);

module.exports = router;
