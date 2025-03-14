import React, { useState } from 'react';
import { Palette, Sparkles, ImageIcon, Download, Share2, Wand2 } from 'lucide-react';

interface AIGenerationProps {
  prompt: string;
  onImageGenerated: (imageUrl: string) => void;
}

function AIImageGeneration({ prompt, onImageGenerated }: AIGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async () => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const data = await response.json();
      onImageGenerated(data.imageUrl);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Image generation error:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="gaming-card p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-white">AI Art Assistant</h3>
        <button
          onClick={generateImage}
          disabled={isGenerating}
          className={`gaming-card px-4 py-2 flex items-center gap-2 ${
            isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
          }`}
        >
          <Wand2 className="w-4 h-4" />
          <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
        </button>
      </div>

      {error && (
        <div className="text-red-400 text-sm mb-4">{error}</div>
      )}

      <p className="text-white/60 text-sm">
        Let AI help you visualize your mental wellness journey
      </p>
    </div>
  );
}

// In your ArtTherapy component:
function ArtTherapy({ entries, setEntries, showPrompt, setShowPrompt }: ArtTherapyProps) {
  // ... existing code ...

  const [aiGeneratedImage, setAiGeneratedImage] = useState<string | null>(null);

  const handleImageGenerated = (imageUrl: string) => {
    setAiGeneratedImage(imageUrl);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* ... existing gallery code ... */}

      {showPrompt && (
        <div className="gaming-card p-6">
          <h2 className="text-xl font-bold text-white mb-6">Creative Prompt</h2>
          
          <div className="space-y-6">
            {/* ... existing prompt sections ... */}

            <AIImageGeneration
              prompt={selectedPrompt}
              onImageGenerated={handleImageGenerated}
            />

            {aiGeneratedImage && (
              <div className="gaming-card p-4">
                <img
                  src={aiGeneratedImage}
                  alt="AI Generated Art"
                  className="w-full rounded-lg mb-2"
                />
                <button
                  onClick={() => {
                    // Save the AI-generated image as an art entry
                    const newEntry: ArtEntry = {
                      id: Date.now().toString(),
                      date: new Date(),
                      prompt: selectedPrompt,
                      artwork: aiGeneratedImage,
                      reflection,
                      mood: 'peaceful',
                      theme: 'wellness'
                    };
                    setEntries(prev => [newEntry, ...prev]);
                  }}
                  className="gaming-card px-4 py-2 w-full mt-2 hover:scale-105 transition-transform"
                >
                  Save to Gallery
                </button>
              </div>
            )}

            {/* ... existing buttons ... */}
          </div>
        </div>
      )}
    </div>
  );
} 