import type { NextApiRequest, NextApiResponse } from 'next';
import { generateImage } from '../../server/api/imageGeneration';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;
    const imageUrl = await generateImage(prompt);
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('API error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
} 