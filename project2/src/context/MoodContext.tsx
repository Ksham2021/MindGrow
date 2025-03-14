import React, { createContext, useContext, useState } from 'react';

type MoodType = 'happy' | 'sad' | 'neutral' | undefined;

interface MoodContextType {
  mood: MoodType;
  setMood: (mood: MoodType) => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export function MoodProvider({ children }: { children: React.ReactNode }) {
  const [mood, setMood] = useState<MoodType>(undefined);

  return (
    <MoodContext.Provider value={{ mood, setMood }}>
      {children}
    </MoodContext.Provider>
  );
}

export function useMood() {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
} 