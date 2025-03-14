import React, { useState } from 'react';
import { X, Clock, ChevronLeft } from 'lucide-react';
import { selfCareArticles, SelfCareArticle } from '../data/selfCareArticles';

interface SelfCareArticlesProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SelfCareArticles({ isOpen, onClose }: SelfCareArticlesProps) {
  const [selectedArticle, setSelectedArticle] = useState<SelfCareArticle | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen px-4 py-8">
        <div className="max-w-4xl mx-auto bg-gray-900 rounded-2xl shadow-xl">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedArticle ? (
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                ) : null}
                <h2 className="text-2xl font-bold gaming-gradient">
                  {selectedArticle ? selectedArticle.title : 'Self-Care Articles'}
                </h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          <div className="p-6">
            {selectedArticle ? (
              <div className="space-y-6">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span className="px-3 py-1 bg-white/10 rounded-full">
                    {selectedArticle.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{selectedArticle.duration}</span>
                  </div>
                  <span>By {selectedArticle.author}</span>
                </div>
                <p className="text-lg text-white/80 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {selfCareArticles.map((article) => (
                  <button
                    key={article.id}
                    className="gaming-card p-4 text-left group cursor-pointer"
                    onClick={() => setSelectedArticle(article)}
                  >
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-40 object-cover rounded-xl mb-4"
                    />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="px-2 py-1 bg-white/10 rounded-full text-white/60">
                          {article.category}
                        </span>
                        <div className="flex items-center gap-1 text-white/60">
                          <Clock className="w-4 h-4" />
                          <span>{article.duration}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">
                        {article.title}
                      </h3>
                      <p className="text-sm text-white/60 line-clamp-2">
                        {article.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
