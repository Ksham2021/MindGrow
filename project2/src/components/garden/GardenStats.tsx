import React from 'react';
import { Timer, Calendar, Trophy } from 'lucide-react';

interface GardenStatsProps {
  trees: any[];
  streak: number;
}

export function GardenStats({ trees, streak }: GardenStatsProps) {
  const calculateStats = () => {
    const totalMinutes = trees.reduce((acc, tree) => {
      switch (tree.type) {
        case 'sprout': return acc + 15;
        case 'bush': return acc + 30;
        case 'apple': return acc + 60;
        case 'rare': return acc + 120;
        default: return acc;
      }
    }, 0);

    const todayTrees = trees.filter(
      tree => tree.plantedDate.toDateString() === new Date().toDateString()
    ).length;

    return {
      totalTrees: trees.length,
      totalHours: Math.floor(totalMinutes / 60),
      todayTrees,
    };
  };

  const stats = calculateStats();

  return (
    <div className="gaming-card p-6">
      <h2 className="text-xl font-bold text-white mb-6">Daily Progress</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="gaming-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Timer className="w-5 h-5 text-blue-400" />
            <span className="text-white/60">Focus Time</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.totalHours}h
          </div>
        </div>
        <div className="gaming-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-5 h-5 text-green-400" />
            <span className="text-white/60">Today</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {stats.todayTrees} 🌱
          </div>
        </div>
        <div className="gaming-card p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-white/60">Streak</span>
          </div>
          <div className="text-2xl font-bold text-white">
            {streak}d
          </div>
        </div>
      </div>
    </div>
  );
} 