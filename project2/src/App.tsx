import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Home } from './pages/Home';
import { Garden } from './pages/Garden';
import { Community } from './pages/Community';
import { Profile } from './pages/Profile';
import { Blog } from './pages/Blog';
import { SoulScript } from './pages/SoulScript';
import { MoodProvider } from './context/MoodContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'garden':
        return <Garden />;
      case 'community':
        return <Community />;
      case 'profile':
        return <Profile />;
      case 'blog':
        return <Blog />;
      case 'soulscript':
        return <SoulScript />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {renderPage()}
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <MoodProvider>
        <AppContent />
      </MoodProvider>
    </ThemeProvider>
  );
}