const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyAexgnOiag0siW0oS8vSVnexPK9UE5TD1A";

const gemini = async (req, res) => {
  try {
    const { search } = req?.body;

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = search;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    res.json(text);
  } catch (err) {
    res.json({ Alert: `Something went wrong ${err.status}` });
    console.error(err);
  }
};

module.exports = { gemini };
