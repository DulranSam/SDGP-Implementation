const { GoogleGenerativeAI } = require("@google/generative-ai");
const apiKey = "AIzaSyCal6hluCgU3UZHc3Nd2XPabnrj2kKpDIo";
const fs = require("fs");

const gemini = async (req, res) => {
  try {
    const { search } = req?.body;

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = ` ${search} , give the answer as a maths bot`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const lastData = []; //save array to file
    const split = res.json({ Data: text }); //divide
    lastData.push(split);
  } catch (err) {
    res.json({ Alert: `Something went wrong ${err.status}` });
    console.error(err);
  }
};

const imageWise = async (req, res) => {
  const { search, image } = req?.body;
};

module.exports = { gemini };
