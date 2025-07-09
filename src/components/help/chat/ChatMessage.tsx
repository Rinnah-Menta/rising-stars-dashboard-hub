
import React from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'options';
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[75%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
        <div className={`rounded-2xl px-4 py-2 ${
          message.type === 'user' 
            ? 'bg-blue-500 text-white rounded-br-md' 
            : 'bg-white border rounded-bl-md shadow-sm'
        }`}>
          <div className="whitespace-pre-line text-sm">{message.content}</div>
        </div>
        <div className={`text-xs text-gray-500 mt-1 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
      {message.type === 'bot' && (
        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-2 order-0 flex-shrink-0">
          <Bot className="h-4 w-4 text-blue-600" />
        </div>
      )}
    </div>
  );
};
