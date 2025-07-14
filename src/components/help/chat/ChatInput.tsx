
import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send, Bot } from 'lucide-react';

interface ChatInputProps {
  inputMessage: string;
  setInputMessage: (message: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  inputMessage,
  setInputMessage,
  onSendMessage,
  onKeyPress
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-3 border-t bg-white">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={onKeyPress}
            placeholder="Type a message..."
            className="rounded-full border-gray-300 focus:border-blue-500"
          />
        </div>
        <Button 
          onClick={onSendMessage}
          disabled={!inputMessage.trim()}
          size="sm"
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-9 h-9 p-0"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <div className="flex items-center gap-2 text-xs text-gray-500 mt-2">
        <Bot className="h-3 w-3" />
        <span>Powered by Springing Stars AI Assistant</span>
      </div>
    </div>
  );
};
