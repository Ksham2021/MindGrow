import React, { useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatGPTResponse {
  content: string;
}

interface ChatGPTError {
  error: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isBot: true }
  ]);
  const [inputText, setInputText] = useState("");

  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    // Add user message
    setMessages(prev => [...prev, { text: inputText, isBot: false }]);
    const userMessage = inputText;
    setInputText("");

    try {
      // Show loading state
      setMessages(prev => [...prev, { text: "...", isBot: true }]);

      const response = await fetch('/api/chat', {  // Create this endpoint on your backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data: ChatGPTResponse = await response.json();

      // Replace loading message with actual response
      setMessages(prev => [
        ...prev.slice(0, -1),
        { text: data.content, isBot: true }
      ]);

    } catch (error) {
      // Handle error gracefully
      setMessages(prev => [
        ...prev.slice(0, -1),
        { text: "I'm sorry, I'm having trouble connecting right now. Please try again later.", isBot: true }
      ]);
      console.error('Chat error:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl flex flex-col z-50">
      {/* Header */}
      <div className="p-4 bg-blue-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">AI Assistant</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="hover:bg-blue-700 p-1 rounded-full transition-colors"
          aria-label="Close chat"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 dark:bg-gray-700'
                  : 'bg-blue-600 text-white'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t dark:border-gray-700">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 p-2 border dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Send message"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
