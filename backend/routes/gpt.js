const express = require("express");
const router = express.Router();
const textToResponse = require("../controllers/GPTControl/textToResponse");

router.route("/").post(textToResponse.AskGPT);

router.route("/sub").post(textToResponse.Secondary);

module.exports = router;
