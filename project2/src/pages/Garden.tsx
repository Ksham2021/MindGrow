import React, { useState, useEffect } from 'react';
import { Sprout, Timer, Trophy, Calendar, Store, Layout, Users } from 'lucide-react';
import { FocusTimer } from '../components/garden/FocusTimer';
import { GardenGrid } from '../components/garden/GardenGrid';
import { GardenStats } from '../components/garden/GardenStats';
import { TreeStore } from '../components/garden/TreeStore';
import { GardenAchievements } from '../components/garden/GardenAchievements';

interface Tree {
  id: string;
  type: 'sprout' | 'bush' | 'apple' | 'rare' | 'cherry';
  emoji: string;
  name: string;
  plantedDate: Date;
  source: 'focus' | 'quiz' | 'article' | 'store';
}

export function Garden() {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [focusStreak, setFocusStreak] = useState(0);
  const [activeView, setActiveView] = useState<'garden' | 'store' | 'stats'>('garden');
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [coins, setCoins] = useState(100);

  useEffect(() => {
    // Check and update streak daily
    const lastPlantDate = localStorage.getItem('lastPlantDate');
    const today = new Date().toDateString();
    
    if (lastPlantDate === today) {
      setFocusStreak(prev => prev + 1);
    } else if (lastPlantDate && new Date(lastPlantDate).getTime() < new Date(today).getTime() - 86400000) {
      setFocusStreak(0);
    }
  }, []);

  const handleTimerComplete = (duration: number) => {
    const newTree = generateTree(duration, 'focus');
    setTrees(prev => [...prev, newTree]);
    updateStreak();
    awardCoins(duration);
  };

  const generateTree = (duration: number, source: Tree['source']): Tree => {
    const types = {
      15: { emoji: '🌱', type: 'sprout' },
      30: { emoji: '🌿', type: 'bush' },
      60: { emoji: '🍏', type: 'apple' },
      120: { emoji: '🌳', type: 'rare' },
      special: { emoji: '🌸', type: 'cherry' }
    };
    
    return {
      id: Date.now().toString(),
      ...types[duration as keyof typeof types],
      name: `Tree #${trees.length + 1}`,
      plantedDate: new Date(),
      source
    };
  };

  const updateStreak = () => {
    localStorage.setItem('lastPlantDate', new Date().toDateString());
    setFocusStreak(prev => prev + 1);
  };

  const awardCoins = (duration: number) => {
    const reward = Math.floor(duration / 5); // 3 coins per 15 minutes
    setCoins(prev => prev + reward);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Sprout className="w-6 h-6 text-green-400" />
          <h1 className="text-3xl font-bold gaming-gradient">Your Garden</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-white">{focusStreak} Day Streak</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
            <span className="text-yellow-400">🪙</span>
            <span className="text-white">{coins}</span>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => setActiveView('garden')}
          className={`flex-1 gaming-card p-4 ${activeView === 'garden' ? 'border-2 border-green-400' : ''}`}
        >
          <Layout className="w-5 h-5 text-green-400 mb-2" />
          <span className="text-white font-medium">Garden View</span>
        </button>
        <button
          onClick={() => setActiveView('store')}
          className={`flex-1 gaming-card p-4 ${activeView === 'store' ? 'border-2 border-green-400' : ''}`}
        >
          <Store className="w-5 h-5 text-green-400 mb-2" />
          <span className="text-white font-medium">Tree Store</span>
        </button>
        <button
          onClick={() => setActiveView('stats')}
          className={`flex-1 gaming-card p-4 ${activeView === 'stats' ? 'border-2 border-green-400' : ''}`}
        >
          <Trophy className="w-5 h-5 text-green-400 mb-2" />
          <span className="text-white font-medium">Achievements</span>
        </button>
      </div>

      {activeView === 'garden' && (
        <>
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <FocusTimer 
              isActive={isTimerActive}
              setIsActive={setIsTimerActive}
              onComplete={handleTimerComplete}
            />
            <GardenStats trees={trees} streak={focusStreak} />
          </div>
          <GardenGrid trees={trees} setTrees={setTrees} />
        </>
      )}

      {activeView === 'store' && (
        <TreeStore setTrees={setTrees} coins={coins} setCoins={setCoins} />
      )}

      {activeView === 'stats' && (
        <GardenAchievements trees={trees} streak={focusStreak} />
      )}

      {isTimerActive && (
        <div className="fixed bottom-20 left-0 right-0 bg-red-500/80 text-white py-2 text-center">
          <div className="flex items-center justify-center gap-2">
            <Timer className="w-5 h-5" />
            <span>Focus session in progress - Don't leave the page!</span>
          </div>
        </div>
      )}
    </div>
  );
} 