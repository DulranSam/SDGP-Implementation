const express = require("express");
const router = express.Router();
// const OpenAI = require("openai");
// const openai = new OpenAI();
const textToResponse = require("../controllers/GPTControl/textToResponse");

router.route("/").post(textToResponse.AskGPT);

router.route("/sub").post(async (req, res) => {
  const { userInput } = req.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: userInput }],
      model: "gpt-3.5-turbo", //let's stick to this for now
    });

    console.log(completion.choices[0]);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
