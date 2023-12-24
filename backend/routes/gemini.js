const express = require("express");
const router = express.Router();
const geminiModel = require("../controllers/GeminiControl/Gemini");

router.route("/").post(geminiModel.gemini);

module.exports = router;
