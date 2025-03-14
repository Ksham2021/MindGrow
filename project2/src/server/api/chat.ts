import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function handleChat(req, res) {
  try {
    const { message } = req.body;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful mental health assistant." },
        { role: "user", content: message }
      ],
      max_tokens: 150,
      temperature: 0.7,
    });

    res.json({ content: completion.data.choices[0].message?.content });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ error: 'Failed to get AI response' });
  }
} 