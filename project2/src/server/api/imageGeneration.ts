import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateImage(prompt: string) {
  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
    });

    return response.data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
} 