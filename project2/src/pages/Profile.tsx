import React, { useState } from 'react';
import { Camera, Edit2, Lock, Medal, List, Calendar } from 'lucide-react';
import { MoodCalendar } from '../components/MoodCalendar';
import { MoodGraph } from '../components/MoodGraph';

interface ProfileData {
  username: string;
  bio: string;
  avatar: string;
  achievements: Achievement[];
  todos: Todo[];
  privacySettings: PrivacySettings;
}

interface Achievement {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

interface Todo {
  id: string;
  task: string;
  completed: boolean;
}

interface PrivacySettings {
  profileVisibility: 'public' | 'private' | 'friends';
  showMoodData: boolean;
  showAchievements: boolean;
}

export function Profile() {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: 'MindGrow User',
    bio: 'Welcome to my mindfulness journey!',
    avatar: '/default-avatar.png',
    achievements: [
      { id: '1', name: 'First Meditation', icon: '🧘‍♀️', description: 'Complete your first meditation session', earned: true },
      { id: '2', name: 'Mood Master', icon: '📊', description: 'Track your mood for 7 consecutive days', earned: true },
      { id: '3', name: 'Art Explorer', icon: '🎨', description: 'Create 5 artworks in SoulScript', earned: false },
    ],
    todos: [
      { id: '1', task: 'Morning meditation', completed: false },
      { id: '2', task: 'Journal entry', completed: true },
      { id: '3', task: 'Evening reflection', completed: false },
    ],
    privacySettings: {
      profileVisibility: 'public',
      showMoodData: true,
      showAchievements: true,
    },
  });

  const [editMode, setEditMode] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Profile Header */}
      <div className="gaming-card p-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={profileData.avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
            <label className="absolute bottom-0 right-0 p-2 bg-white/10 rounded-full cursor-pointer hover:bg-white/20">
              <Camera size={16} />
              <input type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
            </label>
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">
                {editMode ? (
                  <input
                    type="text"
                    value={profileData.username}
                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                    className="bg-white/10 rounded px-2 py-1"
                  />
                ) : profileData.username}
              </h1>
              <button onClick={() => setEditMode(!editMode)}>
                <Edit2 size={16} />
              </button>
            </div>
            <textarea
              value={profileData.bio}
              onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
              className="mt-2 w-full bg-white/10 rounded px-3 py-2 resize-none"
              rows={2}
              placeholder="Tell us about yourself..."
            />
          </div>
        </div>
      </div>

      {/* Mood Tracking */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="gaming-card p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar size={20} />
            Mood Calendar
          </h2>
          <MoodCalendar />
        </div>
        
        <div className="gaming-card p-6">
          <h2 className="text-xl font-bold mb-4">Mood Trends</h2>
          <MoodGraph />
        </div>
      </div>

      {/* Achievements */}
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Medal size={20} />
          Achievements
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {profileData.achievements.map(achievement => (
            <div
              key={achievement.id}
              className={`gaming-card p-4 ${achievement.earned ? 'bg-white/10' : 'opacity-50'}`}
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h3 className="font-bold">{achievement.name}</h3>
              <p className="text-sm text-white/60">{achievement.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Todo List */}
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <List size={20} />
          To-Do List
        </h2>
        <div className="space-y-2">
          {profileData.todos.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-2 gaming-card p-3"
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  setProfileData(prev => ({
                    ...prev,
                    todos: prev.todos.map(t =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t
                    ),
                  }));
                }}
                className="form-checkbox"
              />
              <span className={todo.completed ? 'line-through text-white/40' : ''}>
                {todo.task}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Settings */}
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Lock size={20} />
          Privacy & Controls
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Profile Visibility</span>
            <select
              value={profileData.privacySettings.profileVisibility}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                privacySettings: {
                  ...prev.privacySettings,
                  profileVisibility: e.target.value as 'public' | 'private' | 'friends',
                },
              }))}
              className="gaming-card px-3 py-1"
            >
              <option value="public">Public</option>
              <option value="friends">Friends Only</option>
              <option value="private">Private</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <span>Show Mood Data</span>
            <input
              type="checkbox"
              checked={profileData.privacySettings.showMoodData}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                privacySettings: {
                  ...prev.privacySettings,
                  showMoodData: e.target.checked,
                },
              }))}
              className="form-checkbox"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <span>Show Achievements</span>
            <input
              type="checkbox"
              checked={profileData.privacySettings.showAchievements}
              onChange={(e) => setProfileData(prev => ({
                ...prev,
                privacySettings: {
                  ...prev.privacySettings,
                  showAchievements: e.target.checked,
                },
              }))}
              className="form-checkbox"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 