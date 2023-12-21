require("dotenv").config();
const apiKey = process.env.API_KEY;
const Axios = require("axios");

async function AskGPT(req, res) {
  const { search } = req?.body;

  try {
    const modelEndpoint =
      "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions";

    const response = await Axios.post(
      modelEndpoint,
      {
        model: "gpt-3.5-turbo",
        prompt: search,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
          "OpenAI-Organization": "org-F1a3y0juQDJKkV2Ow0rhFSwk",
        },
      }
    );

    const result = response.data.choices[0].text;
    res.json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function Secondary(req, res) {
  const { userInput } = req?.body;

  try {
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: userInput }],
      model: "gpt-3.5-turbo", //let's stick to this model for now
    });

    console.log(completion.choices[0]);
  } catch (err) {
    console.error(err);
  }
}

module.exports = { AskGPT, Secondary };
