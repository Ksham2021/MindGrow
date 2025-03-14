import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';

interface MoodEntry {
  date: Date;
  mood: string;
}

interface MoodEmoji {
  mood: string;
  emoji: string;
  color: string;
}

export function MoodCalendar() {
  const [currentDate] = useState(new Date());
  const [moodEntries] = useState<MoodEntry[]>([]); // Initialize with empty array

  const moodEmojis: MoodEmoji[] = [
    { mood: 'happy', emoji: '😊', color: 'bg-green-500/20' },
    { mood: 'neutral', emoji: '😐', color: 'bg-blue-500/20' },
    { mood: 'sad', emoji: '😢', color: 'bg-purple-500/20' }
  ];

  const getMoodEmoji = (date: Date): MoodEmoji | undefined => {
    const entry = moodEntries.find(entry => 
      entry && entry.date && isSameDay(new Date(entry.date), date)
    );
    
    if (!entry) return undefined;
    
    return moodEmojis.find(emoji => emoji.mood === entry.mood);
  };

  const renderCalendar = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    // Create week rows
    const weeks: Date[][] = [];
    let currentWeek: Date[] = [];

    // Add empty days for the first week
    const firstDayOfMonth = monthStart.getDay();
    for (let i = 0; i < firstDayOfMonth; i++) {
      currentWeek.push(null as unknown as Date);
    }

    days.forEach(day => {
      if (currentWeek.length === 7) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(day);
    });

    // Add empty days for the last week
    while (currentWeek.length < 7) {
      currentWeek.push(null as unknown as Date);
    }
    weeks.push(currentWeek);

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Week day headers */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium py-2">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {weeks.map((week, weekIndex) => (
          week.map((day, dayIndex) => {
            if (!day) {
              return (
                <div
                  key={`empty-${weekIndex}-${dayIndex}`}
                  className="aspect-square bg-white/5 rounded-lg"
                />
              );
            }

            const moodForDay = getMoodEmoji(day);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={day.toString()}
                className={`
                  aspect-square p-1 rounded-lg flex flex-col items-center justify-center
                  ${moodForDay?.color || 'bg-white/5'}
                  ${isToday ? 'ring-2 ring-white/20' : ''}
                `}
              >
                <span className="text-xs">{format(day, 'd')}</span>
                {moodForDay && (
                  <span className="text-lg">{moodForDay.emoji}</span>
                )}
              </div>
            );
          })
        ))}
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          {format(currentDate, 'MMMM yyyy')}
        </h2>
      </div>
      {renderCalendar()}
    </div>
  );
}