import React from 'react';
import { Home, Book, Flower2, Users, User } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  return (
    <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">MindGrow</span>
          </div>
          
          <div className="flex space-x-4">
            <button
              onClick={() => setCurrentPage('soulscript')}
              className={`nav-link ${currentPage === 'soulscript' ? 'active' : ''}`}
            >
              <Book size={20} />
              <span>SoulScript</span>
            </button>

            <button
              onClick={() => setCurrentPage('garden')}
              className={`nav-link ${currentPage === 'garden' ? 'active' : ''}`}
            >
              <Flower2 size={20} />
              <span>Garden</span>
            </button>

            <button
              onClick={() => setCurrentPage('community')}
              className={`nav-link ${currentPage === 'community' ? 'active' : ''}`}
            >
              <Users size={20} />
              <span>Community</span>
            </button>

            <button
              onClick={() => setCurrentPage('profile')}
              className={`nav-link ${currentPage === 'profile' ? 'active' : ''}`}
            >
              <User size={20} />
              <span>Profile</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}