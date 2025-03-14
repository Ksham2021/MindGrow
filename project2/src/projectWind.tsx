import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Tree } from './components/Tree';
import { CoinDisplay } from './components/CoinDisplay';
import { Brain, Heart, Smile, Sun, Trophy, Sparkles, Calendar, UserCircle } from 'lucide-react';
import { PiggyBankIcon } from './components/PiggyBankIcon';
import { Blog } from './pages/Blog';
import { Community } from './pages/Community';
import { MoodCheckPopup } from './components/MoodCheckPopup';
import { ExitMoodCheckPopup } from './components/ExitMoodCheckPopup';
import { MoodCalendar } from './components/MoodCalendar';
import { ChatBot } from './components/ChatBot';
import { SelfCareArticles } from './components/SelfCareArticles';
import type { TreeState } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [showExitMoodCheck, setShowExitMoodCheck] = useState(false);
  const [moodHistory, setMoodHistory] = useState<Array<{ date: string; mood: string }>>([]);
  const [treeState] = useState<TreeState>({
    health: 0.8,
    level: 1,
    color: 'text-green-500',
    size: 0.5
  });
  const [showSelfCareArticles, setShowSelfCareArticles] = useState(false);

  useEffect(() => {
    // Show initial mood check popup after a short delay
    const timer = setTimeout(() => {
      setShowMoodCheck(true);
    }, 1000);

    // Setup exit mood check
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!showExitMoodCheck) {
        e.preventDefault();
        e.returnValue = '';
        setShowExitMoodCheck(true);
        return '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [showExitMoodCheck]);

  const handleInitialMoodSelect = (mood: string) => {
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => [...prev, { date: today, mood }]);
  };

  const handleExitMoodSelect = (mood: string) => {
    const today = new Date().toISOString().split('T')[0];
    setMoodHistory(prev => [...prev, { date: today, mood }]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'blog':
        return <Blog />;
      case 'community':
        return <Community />;
      default:
        return (
          <main className="max-w-7xl mx-auto px-4 py-8">
            <section className="text-center mb-12 animate-float">
              <h2 className="text-4xl font-bold gaming-gradient mb-4">
                Level Up Your Mind
              </h2>
              <p className="text-white/80 dark:text-white/60 max-w-2xl mx-auto text-lg">
                Embark on an epic journey to strengthen your mental well-being through quests, 
                achievements, and powerful allies.
              </p>
            </section>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="gaming-card p-6">
                <Tree state={treeState} />
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Trophy className="w-5 h-5 text-yellow-400" />
                    <h3 className="font-bold text-white">Level {treeState.level} Mind Tree</h3>
                  </div>
                  <p className="text-sm text-white/60">Your mental strength grows with every challenge!</p>
                </div>
              </div>

              <MoodCalendar moodData={moodHistory} />
            </div>

            <div className="space-y-4 mb-12">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Brain className="w-6 h-6 text-blue-400" />
                Daily Quests
              </h3>
              
              {[
                { icon: <Brain className="text-blue-400" />, title: 'Complete Daily Quiz', reward: 50, progress: 75 },
                { 
                  icon: <Heart className="text-pink-400" />, 
                  title: 'Read About Self-Care', 
                  reward: 30, 
                  progress: 40,
                  onClick: () => setShowSelfCareArticles(true)
                },
                { icon: <Smile className="text-yellow-400" />, title: 'Join Group Session', reward: 100, progress: 20 },
                { icon: <Sun className="text-orange-400" />, title: 'Practice Mindfulness', reward: 40, progress: 90 },
              ].map((activity, index) => (
                <button
                  key={index}
                  className="gaming-card w-full p-4 group"
                  onClick={activity.onClick}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-white/10 group-hover:scale-110 transition-transform">
                        {activity.icon}
                      </div>
                      <div>
                        <span className="font-medium text-white block">{activity.title}</span>
                        <div className="w-32 h-2 bg-white/20 rounded-full mt-2">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{ width: `${activity.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
                      <PiggyBankIcon size={16} className="text-pink-400" />
                      <span className="text-sm font-medium text-white">+{activity.reward}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <section className="grid md:grid-cols-3 gap-6">
              {[
                { title: 'Depression', description: 'Master the darkness within', level: 'Beginner' },
                { title: 'Anxiety', description: 'Face your fears head-on', level: 'Intermediate' },
                { title: 'Stress Management', description: 'Build your resilience', level: 'Advanced' }
              ].map((topic, index) => (
                <div key={index} className="gaming-card p-6 group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white text-lg">{topic.title}</h3>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/60">
                      {topic.level}
                    </span>
                  </div>
                  <p className="text-sm text-white/60 mb-4">
                    {topic.description}
                  </p>
                  <button className="neon-border w-full py-2 px-4 rounded-lg text-white font-medium 
                                   hover:scale-105 transition-transform">
                    Start Quest →
                  </button>
                </div>
              ))}
            </section>
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <div className="fixed inset-0 bg-gradient-to-br from-blue-400 via-violet-400 to-fuchsia-400 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900 -z-10" />
      <header>
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-yellow-400 animate-float" />
            <h1 className="text-2xl font-bold gaming-gradient">MindGrow</h1>
          </div>
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
              <Calendar className="w-5 h-5" />
              <span>Calendar</span>
            </button>
            <CoinDisplay amount={150} />
            <div className="flex items-center gap-3">
              <button className="px-4 py-2 text-white hover:text-white/80 transition-colors">Sign In</button>
              <button className="px-4 py-2 bg-white/10 rounded-lg text-white hover:bg-white/20 transition-colors">Sign Up</button>
            </div>
          </div>
        </div>
      </header>

      {renderPage()}

      <Navigation onPageChange={setCurrentPage} currentPage={currentPage} />

      <MoodCheckPopup 
        isOpen={showMoodCheck}
        onClose={() => setShowMoodCheck(false)}
        onMoodSelect={handleInitialMoodSelect}
      />

      {showExitMoodCheck && (
        <ExitMoodCheckPopup onClose={() => setShowExitMoodCheck(false)} />
      )}
      <ChatBot />
      <SelfCareArticles 
        isOpen={showSelfCareArticles}
        onClose={() => setShowSelfCareArticles(false)}
      />
    </div>
  );
}

export default App;