import React, { useState, useEffect } from 'react';
import { Brain, ArrowRight, Award, X } from 'lucide-react';

interface QuizProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (score: number) => void;
  currentMood: string;
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

export function MentalHealthQuiz({ isOpen, onClose, onComplete, currentMood }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    // Select questions based on user's mood
    setQuestions(getQuestionsForMood(currentMood));
  }, [currentMood]);

  const getQuestionsForMood = (mood: string): Question[] => {
    const questionSets = {
      anxious: [
        {
          id: 1,
          text: "When feeling anxious, which breathing technique is most effective?",
          options: [
            "Holding breath as long as possible",
            "Quick, shallow breaths",
            "4-7-8 breathing technique",
            "Normal breathing"
          ],
          correctAnswer: 2
        },
        {
          id: 2,
          text: "What's the first step in managing an anxiety attack?",
          options: [
            "Recognize and acknowledge the feeling",
            "Try to fight it immediately",
            "Call someone right away",
            "Go to sleep"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "Which activity can help reduce anxiety in the moment?",
          options: [
            "Scrolling social media",
            "Grounding exercises (5-4-3-2-1)",
            "Drinking coffee",
            "Watching TV"
          ],
          correctAnswer: 1
        }
      ],
      sad: [
        {
          id: 1,
          text: "Which activity is most recommended when feeling down?",
          options: [
            "Staying in bed all day",
            "Light exercise or walking",
            "Eating comfort food",
            "Watching sad movies"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What's a healthy way to express sadness?",
          options: [
            "Keeping it to yourself",
            "Journaling or talking to someone",
            "Sleeping it off",
            "Ignoring it"
          ],
          correctAnswer: 1
        },
        {
          id: 3,
          text: "Which thought pattern helps combat sadness?",
          options: [
            "This will last forever",
            "I deserve to feel this way",
            "This feeling will pass",
            "Nothing will help"
          ],
          correctAnswer: 2
        }
      ],
      stressed: [
        {
          id: 1,
          text: "What's the best first step to manage overwhelming stress?",
          options: [
            "Push through it",
            "Take a break and assess priorities",
            "Ignore it",
            "Work harder"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "Which stress-management technique is most effective long-term?",
          options: [
            "Regular exercise and meditation",
            "Working overtime",
            "Caffeine intake",
            "Avoiding stressful situations"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "How can you better organize tasks when stressed?",
          options: [
            "Do everything at once",
            "Avoid making lists",
            "Break tasks into smaller steps",
            "Leave it for later"
          ],
          correctAnswer: 2
        }
      ],
      happy: [
        {
          id: 1,
          text: "How can you maintain positive momentum?",
          options: [
            "Keep it to yourself",
            "Share your joy with others",
            "Worry about it ending",
            "Stop all activities"
          ],
          correctAnswer: 1
        },
        {
          id: 2,
          text: "What's the best way to build on positive feelings?",
          options: [
            "Set new goals",
            "Stay in comfort zone",
            "Avoid challenges",
            "Keep things the same"
          ],
          correctAnswer: 0
        },
        {
          id: 3,
          text: "How can you spread positivity to others?",
          options: [
            "Keep your success private",
            "Show off achievements",
            "Offer support and encouragement",
            "Stay isolated"
          ],
          correctAnswer: 2
        }
      ]
    };

    return questionSets[mood as keyof typeof questionSets] || questionSets.happy;
  };

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      onComplete(score);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="gaming-card w-full max-w-2xl p-6 m-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold gaming-gradient">Mental Health Quiz</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        {!showResults ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between text-white/60">
              <span>Question {currentQuestion + 1} of {questions.length}</span>
              <span>Score: {score}</span>
            </div>

            <div className="gaming-card p-4">
              <h3 className="text-xl text-white mb-4">{questions[currentQuestion]?.text}</h3>
              <div className="space-y-3">
                {questions[currentQuestion]?.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="w-full gaming-card p-4 text-left hover:scale-105 transition-transform"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="gaming-card p-8 inline-block rounded-full">
              <Award className="w-16 h-16 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Quiz Complete!
              </h3>
              <p className="text-white/60">
                You scored {score} out of {questions.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="gaming-card px-6 py-3 hover:scale-105 transition-transform"
            >
              Close Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 