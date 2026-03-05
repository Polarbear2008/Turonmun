import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/country-ai', async (req, res) => {
  try {
    const { countryCode, countryName } = req.body;

    const prompt = `You are a Model United Nations assistant. Given a country, return ONLY valid JSON with this exact shape:\n\n{
  "keyFacts": [
    { "title": "Population", "value": "...", "description": "short note" },
    { "title": "GDP", "value": "...", "description": "short note" },
    { "title": "UN Membership", "value": "...", "description": "short note" },
    { "title": "Region", "value": "...", "description": "short note" }
  ],
  "recentPositions": [
    { "date": "YYYY-MM-DD", "issue": "...", "position": "...", "impact": "High|Medium|Low" }
  ],
  "topicGuidance": [
    {
      "title": "Committee Topic 1",
      "stance": "Short stance label",
      "keyPoints": ["point 1", "point 2"],
      "challenges": ["challenge 1", "challenge 2"]
    }
  ]
}\n\nCountry: ${countryName} (${countryCode}). Do not add any text before or after the JSON.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const json = JSON.parse(raw);
    res.json(json);
  } catch (err) {
    console.error('country-ai error', err);
    res.status(500).json({ error: 'country-ai failed' });
  }
});

app.post('/api/assistant-chat', async (req, res) => {
  try {
    const { question, countryCode, countryName } = req.body;

    const prompt = `You are a MUN delegate coach for ${countryName} (${countryCode}). Answer the user's question clearly.\n\nReturn ONLY valid JSON with this shape:\n\n{
  "answer": "multi-paragraph answer in plain text",
  "bulletPoints": ["short bullet 1", "short bullet 2"],
  "followUpQuestions": ["question 1", "question 2"]
}\n\nUser question: "${question}"`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.5,
    });

    const raw = completion.choices[0]?.message?.content || '{}';
    const json = JSON.parse(raw);
    res.json(json);
  } catch (err) {
    console.error('assistant-chat error', err);
    res.status(500).json({ error: 'assistant-chat failed' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`AI server listening on port ${PORT}`);
});
