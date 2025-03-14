import React from 'react';
import { Trophy, Star, Target, Clock } from 'lucide-react';

interface GardenAchievementsProps {
  trees: any[];
  streak: number;
}

export function GardenAchievements({ trees, streak }: GardenAchievementsProps) {
  const achievements = [
    {
      title: "Green Thumb",
      description: "Plant your first tree",
      icon: <Trophy className="w-6 h-6 text-yellow-400" />,
      progress: trees.length > 0 ? 100 : 0,
      completed: trees.length > 0
    },
    {
      title: "Focus Master",
      description: "Complete a 2-hour focus session",
      icon: <Clock className="w-6 h-6 text-blue-400" />,
      progress: trees.filter(t => t.type === 'rare').length > 0 ? 100 : 0,
      completed: trees.filter(t => t.type === 'rare').length > 0
    },
    {
      title: "Consistency King",
      description: "Maintain a 7-day focus streak",
      icon: <Star className="w-6 h-6 text-purple-400" />,
      progress: Math.min((streak / 7) * 100, 100),
      completed: streak >= 7
    },
    {
      title: "Forest Guardian",
      description: "Plant 10 trees",
      icon: <Target className="w-6 h-6 text-green-400" />,
      progress: Math.min((trees.length / 10) * 100, 100),
      completed: trees.length >= 10
    }
  ];

  return (
    <div className="space-y-6">
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Achievements</h2>
        <div className="grid gap-4">
          {achievements.map((achievement, index) => (
            <div key={index} className="gaming-card p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-white/10">
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">
                    {achievement.title}
                    {achievement.completed && " ✨"}
                  </h3>
                  <p className="text-sm text-white/60">{achievement.description}</p>
                  <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    />
                  </div>
                </div>
                <div className="text-white/60">
                  {achievement.progress}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Stats */}
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Weekly Progress</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="gaming-card p-4">
            <div className="text-white/60 mb-2">Trees Planted</div>
            <div className="text-2xl font-bold text-white">{trees.length}</div>
          </div>
          <div className="gaming-card p-4">
            <div className="text-white/60 mb-2">Current Streak</div>
            <div className="text-2xl font-bold text-white">{streak} days</div>
          </div>
          <div className="gaming-card p-4">
            <div className="text-white/60 mb-2">Rare Trees</div>
            <div className="text-2xl font-bold text-white">
              {trees.filter(t => t.type === 'rare').length}
            </div>
          </div>
          <div className="gaming-card p-4">
            <div className="text-white/60 mb-2">Focus Hours</div>
            <div className="text-2xl font-bold text-white">
              {Math.round(trees.reduce((acc, tree) => {
                const duration = tree.type === 'rare' ? 120 : 
                               tree.type === 'apple' ? 60 :
                               tree.type === 'bush' ? 30 : 15;
                return acc + duration;
              }, 0) / 60)}h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 