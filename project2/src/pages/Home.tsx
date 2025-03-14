import React from 'react';
import { useMood } from '../context/MoodContext';
import { ChatBot } from '../components/ChatBot';
import { MoodCalendar } from '../components/MoodCalendar';
import { Community } from '../components/Community';

export function Home() {
  const { mood, setMood } = useMood();

  const getMoodContent = () => {
    switch (mood) {
      case 'happy':
        return {
          greeting: "It's great to see you in high spirits!",
          suggestion: "Why not channel this energy into something creative?"
        };
      case 'neutral':
        return {
          greeting: "Welcome back!",
          suggestion: "How about trying something new today?"
        };
      case 'sad':
        return {
          greeting: "We're here to support you.",
          suggestion: "Would you like to try some calming exercises?"
        };
      default:
        return {
          greeting: "Welcome to MindGrow!",
          suggestion: "How are you feeling today?"
        };
    }
  };

  const content = getMoodContent();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Welcome Section */}
          <div className="gaming-card p-6">
            <h1 className="text-2xl font-bold mb-2">{content.greeting}</h1>
            <p className="text-gray-300">{content.suggestion}</p>
          </div>

          {/* Mood Tracker */}
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">How are you feeling today?</h2>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setMood('happy')}
                className={`p-4 rounded-lg transition ${
                  mood === 'happy' ? 'bg-green-500/20' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                😊 Happy
              </button>
              <button
                onClick={() => setMood('neutral')}
                className={`p-4 rounded-lg transition ${
                  mood === 'neutral' ? 'bg-blue-500/20' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                😐 Neutral
              </button>
              <button
                onClick={() => setMood('sad')}
                className={`p-4 rounded-lg transition ${
                  mood === 'sad' ? 'bg-purple-500/20' : 'bg-white/5 hover:bg-white/10'
                }`}
              >
                😢 Sad
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="gaming-button p-4">
                <span className="block text-lg mb-1">🧘‍♀️ Meditate</span>
                <span className="text-sm text-gray-400">5 min session</span>
              </button>
              <button className="gaming-button p-4">
                <span className="block text-lg mb-1">📝 Journal</span>
                <span className="text-sm text-gray-400">Write your thoughts</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Mood Calendar */}
          <div className="gaming-card p-6 col-span-2">
            <h2 className="text-xl font-bold mb-4">Your Mood Calendar</h2>
            <MoodCalendar />
          </div>

          {/* Daily Quote */}
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Daily Inspiration</h2>
            <blockquote className="text-lg italic text-gray-300">
              "The only way to do great work is to love what you do."
            </blockquote>
            <p className="text-right text-gray-400 mt-2">- Steve Jobs</p>
          </div>

          {/* Progress Stats */}
          <div className="gaming-card p-6">
            <h2 className="text-xl font-bold mb-4">Your Progress</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <h3 className="font-medium mb-2">Mindfulness Streak</h3>
                <p className="text-2xl font-bold">7 Days 🔥</p>
              </div>
              <div className="text-center">
                <h3 className="font-medium mb-2">Monthly Goal</h3>
                <p className="text-2xl font-bold">15/30 Days ⭐</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Assistant */}
      <div className="mt-6">
        <ChatBot />
      </div>
    </div>
  );
} 