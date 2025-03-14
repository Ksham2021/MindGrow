import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, X } from 'lucide-react';

interface FocusTimerProps {
  isActive: boolean;
  setIsActive: (active: boolean) => void;
  onComplete: (duration: number) => void;
}

export function FocusTimer({ isActive, setIsActive, onComplete }: FocusTimerProps) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onComplete(selectedDuration);
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (minutes: number) => {
    setSelectedDuration(minutes);
    setTimeLeft(minutes * 60);
    setIsActive(true);
  };

  return (
    <div className="gaming-card p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Timer className="w-5 h-5 text-blue-400" />
        Focus Timer
      </h2>

      {!isActive ? (
        <div className="grid grid-cols-2 gap-4">
          {[15, 30, 60, 120].map((duration) => (
            <button
              key={duration}
              onClick={() => startTimer(duration)}
              className="gaming-card p-4 hover:scale-105 transition-transform"
            >
              <div className="text-2xl mb-2">
                {duration >= 120 ? '🌳' : duration >= 60 ? '🍏' : duration >= 30 ? '🌿' : '🌱'}
              </div>
              <div className="text-white font-medium">
                {duration >= 60 ? `${duration/60}h` : `${duration}m`}
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <div className="text-4xl font-bold gaming-gradient mb-6">
            {formatTime(timeLeft)}
          </div>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className="gaming-card p-3 hover:scale-105 transition-transform"
            >
              {isActive ? (
                <Pause className="w-6 h-6 text-yellow-400" />
              ) : (
                <Play className="w-6 h-6 text-green-400" />
              )}
            </button>
            <button
              onClick={() => {
                setIsActive(false);
                setTimeLeft(0);
              }}
              className="gaming-card p-3 hover:scale-105 transition-transform"
            >
              <X className="w-6 h-6 text-red-400" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 