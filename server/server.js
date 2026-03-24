import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

  const FlowSchema = new mongoose.Schema({
  prompt: String,
  response: String,
});

const Flow = mongoose.model("Flow", FlowSchema);

const app = express();

app.use(cors({
  origin: [
    process.env.CLIENT_URL,
    "http://localhost:5173"
  ]
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running");
});

app.post("/api/ask-ai", async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-oss-20b:free",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.CLIENT_URL || "http://localhost:5173",
          "X-Title": "ai-flow-task",
        },
      }
    );

    const result =
      response.data.choices[0].message.content;

    res.json({ result });

  } catch (err) {
    console.log(err.response?.data || err);
    res.status(500).send("Error");
  }
});

app.post("/api/save", async (req, res) => {
  try {
    const { prompt, response } = req.body;

    const flow = new Flow({
      prompt,
      response,
    });

    await flow.save();

    res.json({ success: true });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error");
  }
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});