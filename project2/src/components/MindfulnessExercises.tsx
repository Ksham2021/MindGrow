import React, { useState } from 'react';
import { Sun, X, Heart, Brain, Smile, Wind, Coffee } from 'lucide-react';

interface Exercise {
  title: string;
  description: string;
  duration: string;
  icon: JSX.Element;
  steps: string[];
  benefits: string[];
}

const exercises: Record<string, Exercise> = {
  stressed: {
    title: "Deep Breathing Exercise",
    description: "A calming breathing technique to reduce stress",
    duration: "5 minutes",
    icon: <Wind className="w-6 h-6 text-blue-400" />,
    steps: [
      "Find a comfortable sitting position",
      "Inhale deeply for 4 seconds",
      "Hold your breath for 4 seconds",
      "Exhale slowly for 4 seconds",
      "Repeat 10 times"
    ],
    benefits: [
      "Reduces stress hormones",
      "Lowers blood pressure",
      "Improves focus",
      "Calms the mind"
    ]
  },
  anxious: {
    title: "5-4-3-2-1 Grounding",
    description: "A mindful awareness exercise to reduce anxiety",
    duration: "7 minutes",
    icon: <Brain className="w-6 h-6 text-purple-400" />,
    steps: [
      "Name 5 things you can see",
      "Touch 4 things around you",
      "Listen for 3 distinct sounds",
      "Identify 2 things you can smell",
      "Notice 1 thing you can taste"
    ],
    benefits: [
      "Reduces anxiety",
      "Increases present awareness",
      "Breaks negative thought patterns",
      "Centers your mind"
    ]
  },
  happy: {
    title: "Gratitude Meditation",
    description: "Enhance your positive mood with gratitude",
    duration: "10 minutes",
    icon: <Heart className="w-6 h-6 text-pink-400" />,
    steps: [
      "Close your eyes and take a deep breath",
      "Think of three things you're grateful for",
      "Visualize each one in detail",
      "Feel the positive emotions",
      "Send loving thoughts to others"
    ],
    benefits: [
      "Amplifies positive emotions",
      "Builds emotional resilience",
      "Improves relationships",
      "Increases happiness"
    ]
  },
  sad: {
    title: "Self-Compassion Practice",
    description: "Gentle exercise for emotional healing",
    duration: "8 minutes",
    icon: <Smile className="w-6 h-6 text-yellow-400" />,
    steps: [
      "Place a hand on your heart",
      "Acknowledge your feelings without judgment",
      "Speak to yourself with kindness",
      "Imagine supporting a friend in your situation",
      "Send yourself loving thoughts"
    ],
    benefits: [
      "Reduces negative self-talk",
      "Builds self-compassion",
      "Promotes emotional healing",
      "Increases self-worth"
    ]
  },
  tired: {
    title: "Energizing Mindfulness",
    description: "Gentle exercise to boost energy",
    duration: "6 minutes",
    icon: <Coffee className="w-6 h-6 text-orange-400" />,
    steps: [
      "Sit up straight and roll your shoulders",
      "Take three energizing deep breaths",
      "Gently stretch your arms and neck",
      "Focus on points of energy in your body",
      "Set an intention for the day"
    ],
    benefits: [
      "Increases energy naturally",
      "Improves posture",
      "Enhances mental clarity",
      "Reduces mental fatigue"
    ]
  }
};

interface MindfulnessExercisesProps {
  isOpen: boolean;
  onClose: () => void;
  currentMood: string;
}

export function MindfulnessExercises({ isOpen, onClose, currentMood }: MindfulnessExercisesProps) {
  const [selectedMood, setSelectedMood] = useState(currentMood);
  const [isExerciseComplete, setIsExerciseComplete] = useState(false);

  if (!isOpen) return null;

  const exercise = exercises[selectedMood];

  const handleComplete = () => {
    setIsExerciseComplete(true);
    // Add any reward logic here
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">Mindfulness Exercise</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Mood Selection */}
          <div className="grid grid-cols-3 gap-4">
            {Object.entries(exercises).map(([mood, data]) => (
              <button
                key={mood}
                onClick={() => setSelectedMood(mood)}
                className={`gaming-card p-4 hover:scale-105 transition-transform ${
                  selectedMood === mood ? 'border-2 border-green-400' : ''
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  {data.icon}
                  <span className="text-white capitalize">{mood}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Exercise Display */}
          {exercise && (
            <div className="gaming-card p-6 space-y-6">
              <div className="flex items-center gap-4">
                {exercise.icon}
                <div>
                  <h3 className="text-xl font-bold text-white">{exercise.title}</h3>
                  <p className="text-white/60">{exercise.description}</p>
                </div>
                <span className="ml-auto text-white/60">{exercise.duration}</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-white">Steps:</h4>
                  <div className="space-y-2">
                    {exercise.steps.map((step, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-sm">
                          {index + 1}
                        </div>
                        <span className="text-white/80">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-white">Benefits:</h4>
                  <div className="space-y-2">
                    {exercise.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="text-green-400">•</div>
                        <span className="text-white/80">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <button
                onClick={handleComplete}
                disabled={isExerciseComplete}
                className={`w-full gaming-card py-3 mt-4 ${
                  isExerciseComplete 
                    ? 'bg-green-500/20 cursor-not-allowed' 
                    : 'hover:scale-105 transition-transform'
                }`}
              >
                {isExerciseComplete ? 'Exercise Completed ✨' : 'Complete Exercise'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 