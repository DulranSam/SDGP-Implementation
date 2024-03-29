const express = require("express");
const router = express.Router();
const geminiModel = require("../controllers/GeminiControl/Gemini");
const rateLimit = require("express-rate-limit");

const geminiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  limit: 115, // Limit each IP to 120 requests per `window` (here, per minute).
});

router.route("/").post(geminiLimiter, geminiModel.gemini);

module.exports = router;
