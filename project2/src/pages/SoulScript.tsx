import React, { useState, useEffect } from 'react';
import { BookHeart, Calendar, Search, Plus, Edit2, Trash2, Tag, Moon, Sun, Cloud, Star, Palette, Sparkles, Image as ImageIcon, Download, Share2 } from 'lucide-react';
import { useMood } from '../context/MoodContext';
import { DrawingBoard } from '../components/garden/DrawingBoard';

interface DiaryEntry {
  id: string;
  date: Date;
  title: string;
  content: string;
  mood: string;
  tags: string[];
}

interface ArtEntry {
  id: string;
  date: Date;
  prompt: string;
  artwork: string; // Base64 image data
  reflection: string;
  mood: string;
  theme: string;
}

export function SoulScript() {
  const [entries, setEntries] = useState<DiaryEntry[]>(() => {
    const saved = localStorage.getItem('diaryEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [showNewEntry, setShowNewEntry] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const { mood } = useMood();
  const [view, setView] = useState<'diary' | 'art'>('diary');
  const [artEntries, setArtEntries] = useState<ArtEntry[]>(() => {
    const saved = localStorage.getItem('artEntries');
    return saved ? JSON.parse(saved) : [];
  });
  const [showArtPrompt, setShowArtPrompt] = useState(false);

  useEffect(() => {
    localStorage.setItem('diaryEntries', JSON.stringify(entries));
  }, [entries]);

  const addEntry = (entry: DiaryEntry) => {
    setEntries(prev => [entry, ...prev]);
    setShowNewEntry(false);
  };

  const deleteEntry = (id: string) => {
    setEntries(prev => prev.filter(entry => entry.id !== id));
    setSelectedEntry(null);
  };

  const updateEntry = (updatedEntry: DiaryEntry) => {
    setEntries(prev => prev.map(entry => 
      entry.id === updatedEntry.id ? updatedEntry : entry
    ));
    setSelectedEntry(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 mb-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BookHeart className="w-6 h-6 text-pink-400" />
          <h1 className="text-3xl font-bold gaming-gradient">SoulScript</h1>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setView('diary')}
            className={`gaming-card px-4 py-2 flex items-center gap-2 ${
              view === 'diary' ? 'border-2 border-pink-400' : ''
            }`}
          >
            <BookHeart className="w-4 h-4" />
            <span>Diary</span>
          </button>
          <button
            onClick={() => setView('art')}
            className={`gaming-card px-4 py-2 flex items-center gap-2 ${
              view === 'art' ? 'border-2 border-pink-400' : ''
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>Art Therapy</span>
          </button>
        </div>
      </div>

      {view === 'diary' ? (
        <div className="grid md:grid-cols-3 gap-8">
          {/* Entries List */}
          <div className="gaming-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Your Entries</h2>
              <button
                onClick={() => setShowNewEntry(true)}
                className="gaming-card p-2 hover:scale-110 transition-transform"
              >
                <Plus className="w-5 h-5 text-green-400" />
              </button>
            </div>

            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="text"
                  placeholder="Search entries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
            </div>

            <div className="space-y-4">
              {entries
                .filter(entry => 
                  entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  entry.content.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map(entry => (
                  <button
                    key={entry.id}
                    onClick={() => setSelectedEntry(entry)}
                    className={`w-full gaming-card p-4 text-left hover:scale-105 transition-transform ${
                      selectedEntry?.id === entry.id ? 'border-2 border-pink-400' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{entry.title}</h3>
                      <span className="text-sm text-white/60">
                        {new Date(entry.date).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2">{entry.content}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {getMoodEmoji(entry.mood)}
                      <div className="flex gap-1">
                        {entry.tags.map(tag => (
                          <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full text-white/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </div>

          {/* Entry Editor */}
          <div className="gaming-card p-6 md:col-span-2">
            {(showNewEntry || selectedEntry) ? (
              <EntryEditor
                entry={selectedEntry}
                onSave={selectedEntry ? updateEntry : addEntry}
                onCancel={() => {
                  setShowNewEntry(false);
                  setSelectedEntry(null);
                }}
                onDelete={selectedEntry ? deleteEntry : undefined}
                currentMood={mood}
              />
            ) : (
              <div className="text-center text-white/60 py-12">
                <BookHeart className="w-12 h-12 mx-auto mb-4 text-pink-400" />
                <p>Select an entry to view or edit,</p>
                <p>or create a new one to start writing.</p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <ArtTherapy
          entries={artEntries}
          setEntries={setArtEntries}
        />
      )}
    </div>
  );
}

interface EntryEditorProps {
  entry?: DiaryEntry | null;
  onSave: (entry: DiaryEntry) => void;
  onCancel: () => void;
  onDelete?: (id: string) => void;
  currentMood: string;
}

function EntryEditor({ entry, onSave, onCancel, onDelete, currentMood }: EntryEditorProps) {
  const [title, setTitle] = useState(entry?.title || '');
  const [content, setContent] = useState(entry?.content || '');
  const [mood, setMood] = useState(entry?.mood || currentMood);
  const [tags, setTags] = useState<string[]>(entry?.tags || []);
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    onSave({
      id: entry?.id || Date.now().toString(),
      date: entry?.date || new Date(),
      title,
      content,
      mood,
      tags
    });
  };

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Entry title..."
        className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts..."
        className="w-full h-64 bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
      />

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-white/60">Mood:</span>
          <select
            value={mood}
            onChange={(e) => setMood(e.target.value)}
            className="bg-white/10 rounded-lg px-2 py-1 text-white focus:outline-none focus:ring-2 focus:ring-pink-400"
          >
            <option value="happy">Happy 😊</option>
            <option value="sad">Sad 😢</option>
            <option value="anxious">Anxious 😰</option>
            <option value="stressed">Stressed 😫</option>
            <option value="neutral">Neutral 😐</option>
          </select>
        </div>

        <div className="flex-1 flex items-center gap-2">
          <Tag className="w-4 h-4 text-white/60" />
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTag()}
            placeholder="Add tags..."
            className="flex-1 bg-white/10 rounded-lg px-2 py-1 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <span
            key={tag}
            className="bg-white/10 px-3 py-1 rounded-full text-white/60 flex items-center gap-2"
          >
            {tag}
            <button
              onClick={() => setTags(tags.filter(t => t !== tag))}
              className="hover:text-red-400"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      <div className="flex justify-end gap-4 pt-4">
        {onDelete && (
          <button
            onClick={() => onDelete(entry!.id)}
            className="gaming-card px-4 py-2 text-red-400 hover:scale-105 transition-transform"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        <button
          onClick={onCancel}
          className="gaming-card px-4 py-2 text-white/60 hover:scale-105 transition-transform"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="gaming-card px-6 py-2 text-white hover:scale-105 transition-transform"
        >
          Save Entry
        </button>
      </div>
    </div>
  );
}

function getMoodEmoji(mood: string) {
  switch (mood) {
    case 'happy': return <Sun className="w-4 h-4 text-yellow-400" />;
    case 'sad': return <Cloud className="w-4 h-4 text-blue-400" />;
    case 'anxious': return <Moon className="w-4 h-4 text-purple-400" />;
    case 'stressed': return <Star className="w-4 h-4 text-red-400" />;
    default: return <Sun className="w-4 h-4 text-white/40" />;
  }
}

interface ArtTherapyProps {
  entries: ArtEntry[];
  setEntries: React.Dispatch<React.SetStateAction<ArtEntry[]>>;
}

function ArtTherapy({ entries, setEntries }: ArtTherapyProps) {
  const [reflection, setReflection] = useState('');

  const handleSaveDrawing = (imageData: string) => {
    const newEntry: ArtEntry = {
      id: Date.now().toString(),
      date: new Date(),
      artwork: imageData,
      reflection,
      mood: 'peaceful',
      theme: 'wellness'
    };
    setEntries(prev => [newEntry, ...prev]);
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* Art Gallery */}
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Art Gallery</h2>
        <div className="grid grid-cols-2 gap-4">
          {entries.map(entry => (
            <div key={entry.id} className="gaming-card p-2">
              <img src={entry.artwork} alt="Artwork" className="rounded-lg w-full" />
              <p className="mt-2 text-sm text-white/60">{entry.reflection}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Art Creation Space */}
      <div className="gaming-card p-6">
        <h2 className="text-xl font-bold text-white mb-6">Creative Space</h2>
        
        <div className="space-y-6">
          {/* Drawing Board */}
          <DrawingBoard onSave={handleSaveDrawing} />

          {/* Reflection Section */}
          <div>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Reflect on your artwork..."
              className="w-full h-32 bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
} 