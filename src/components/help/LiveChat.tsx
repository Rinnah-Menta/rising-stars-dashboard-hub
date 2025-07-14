
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { ChatHeader } from './chat/ChatHeader';
import { ChatMessage } from './chat/ChatMessage';
import { ChatInput } from './chat/ChatInput';
import { ChatTypingIndicator } from './chat/ChatTypingIndicator';
import { chatFlows } from './chat/chatFlows';
import { Message } from './chat/types';

interface LiveChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveChat: React.FC<LiveChatProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentFlow, setCurrentFlow] = useState('welcome');
  const [currentOptions, setCurrentOptions] = useState<Array<{ id: string; text: string; nextFlow: string }>>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasStarted) {
      setHasStarted(true);
      setMessages([]);
      setCurrentFlow('welcome');
      setCurrentOptions([]);
      
      setTimeout(() => {
        addBotMessage('welcome');
      }, 1000);
    }
  }, [isOpen, hasStarted]);

  const addBotMessage = (flowKey: string) => {
    const flow = chatFlows[flowKey];
    if (!flow) return;

    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'bot',
        content: flow.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newMessage]);
      
      if (flow.options && !flow.isEnd) {
        setCurrentOptions(flow.options);
        
        // Add options display message
        setTimeout(() => {
          const optionsText = flow.options!.map(option => `${option.id}. ${option.text}`).join('\n');
          const optionsMessage: Message = {
            id: (Date.now() + 1).toString(),
            type: 'bot',
            content: `Please type the number of your choice:\n\n${optionsText}`,
            timestamp: new Date()
          };
          setMessages(prev => [...prev, optionsMessage]);
        }, 500);
      } else {
        setCurrentOptions([]);
      }
    }, 1500 + Math.random() * 1000);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);

    // Check if the message is a valid option number
    const optionNumber = inputMessage.trim();
    const selectedOption = currentOptions.find(option => option.id === optionNumber);

    if (selectedOption) {
      setCurrentFlow(selectedOption.nextFlow);
      setCurrentOptions([]);
      
      setTimeout(() => {
        addBotMessage(selectedOption.nextFlow);
      }, 500);
    } else if (currentOptions.length > 0) {
      // Invalid option
      setTimeout(() => {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: `Sorry, "${optionNumber}" is not a valid option. Please choose from the available numbers (${currentOptions.map(opt => opt.id).join(', ')}).`,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }, 500);
    } else {
      // No current options, general response
      setTimeout(() => {
        const generalMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'bot',
          content: "I'm here to help! To get started, please type 'help' or 'start' to see the available options.",
          timestamp: new Date()
        };
        setMessages(prev => [...prev, generalMessage]);
        
        // Reset to welcome flow
        setTimeout(() => {
          addBotMessage('welcome');
        }, 1000);
      }, 500);
    }

    setInputMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleClose = () => {
    setMessages([]);
    setHasStarted(false);
    setIsTyping(false);
    setCurrentOptions([]);
    setInputMessage('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-sm w-full h-[500px] flex flex-col p-0 mx-auto my-auto">
        <ChatHeader onClose={handleClose} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}

          {isTyping && <ChatTypingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput 
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          onSendMessage={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      </DialogContent>
    </Dialog>
  );
};
