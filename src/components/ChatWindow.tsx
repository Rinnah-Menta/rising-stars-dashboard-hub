
import { useState } from "react";
import { Send, Phone, Video, MoreVertical, Smile } from "lucide-react";
import { Contact, Message } from "./MessagingApp";
import MessageBubble from "./MessageBubble";

interface ChatWindowProps {
  contact: Contact | null;
  messages: Message[];
  onSendMessage: (text: string) => void;
}

const ChatWindow = ({ contact, messages, onSendMessage }: ChatWindowProps) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!contact) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Send className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Welcome to Messages</h2>
          <p className="text-gray-500">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative">
            <img
              src={contact.avatar}
              alt={contact.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {contact.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            )}
          </div>
          <div className="ml-3">
            <h2 className="font-semibold text-gray-900">{contact.name}</h2>
            <p className="text-sm text-gray-500">
              {contact.isOnline ? "Online" : "Last seen recently"}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Phone className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
          <Video className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
          <MoreVertical className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600 transition-colors" />
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-end space-x-3">
          <Smile className="w-6 h-6 text-gray-500 cursor-pointer hover:text-green-600 transition-colors mb-2" />
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent max-h-24"
              rows={1}
            />
          </div>
          
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="bg-green-600 text-white p-3 rounded-full hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
