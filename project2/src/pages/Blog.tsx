import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, Heart, MessageCircle, Share2, Filter } from 'lucide-react';
import { blogPosts as initialBlogPosts } from '../data/blogData';
import type { BlogPost } from '../types/blog';

export function Blog() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Update blogs every hour
  useEffect(() => {
    const updateBlogs = () => {
      setBlogPosts(prevPosts => 
        prevPosts.map(post => ({
          ...post,
          date: new Date().toISOString(),
          likes: post.likes + Math.floor(Math.random() * 10),
          comments: post.comments + Math.floor(Math.random() * 3)
        }))
      );
    };

    const interval = setInterval(updateBlogs, 3600000); // 1 hour in milliseconds
    return () => clearInterval(interval);
  }, []);

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];
  
  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return 'Yesterday';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-blue-400" />
          <h1 className="text-3xl font-bold gaming-gradient">Mental Health Blog</h1>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-white/60" />
          <select 
            className="bg-white/10 text-white px-3 py-2 rounded-lg"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article key={post.id} className="gaming-card group cursor-pointer">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                <span className="px-2 py-1 bg-white/10 rounded-full">{post.category}</span>
                <span>•</span>
                <span>{formatDate(post.date)}</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-white/60 mb-4 line-clamp-2">{post.excerpt}</p>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1 text-white/60">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-pink-400">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>
                <button className="text-white/60 hover:text-white transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}