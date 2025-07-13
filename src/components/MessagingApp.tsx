
import { useState } from "react";
import ContactsSidebar from "./ContactsSidebar";
import ChatWindow from "./ChatWindow";

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface Message {
  id: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

const MessagingApp = () => {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [contacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Hey! How are you doing?",
      timestamp: "2 min ago",
      unreadCount: 2,
      isOnline: true
    },
    {
      id: "2", 
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      lastMessage: "See you tomorrow!",
      timestamp: "1 hour ago",
      isOnline: false
    },
    {
      id: "3",
      name: "Emma Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Thanks for the help 👍",
      timestamp: "Yesterday",
      isOnline: true
    },
    {
      id: "4",
      name: "Alex Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      lastMessage: "Let's catch up soon",
      timestamp: "2 days ago",
      unreadCount: 1,
      isOnline: false
    }
  ]);

  const [messages, setMessages] = useState<{ [contactId: string]: Message[] }>({
    "1": [
      {
        id: "1",
        text: "Hey! How are you doing?",
        timestamp: "10:30 AM",
        isOwn: false,
        status: 'read'
      },
      {
        id: "2", 
        text: "I'm doing great! Just working on some projects. How about you?",
        timestamp: "10:32 AM",
        isOwn: true,
        status: 'read'
      },
      {
        id: "3",
        text: "That's awesome! I've been pretty busy too. Want to grab coffee later?",
        timestamp: "10:35 AM", 
        isOwn: false,
        status: 'read'
      }
    ],
    "2": [
      {
        id: "1",
        text: "Don't forget about our meeting tomorrow!",
        timestamp: "Yesterday",
        isOwn: false,
        status: 'read'
      },
      {
        id: "2",
        text: "Of course! See you at 2 PM",
        timestamp: "Yesterday",
        isOwn: true,
        status: 'delivered'
      },
      {
        id: "3",
        text: "See you tomorrow!",
        timestamp: "Yesterday",
        isOwn: false,
        status: 'read'
      }
    ]
  });

  const handleSendMessage = (text: string) => {
    if (!selectedContact || !text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isOwn: true,
      status: 'sent'
    };

    setMessages(prev => ({
      ...prev,
      [selectedContact.id]: [...(prev[selectedContact.id] || []), newMessage]
    }));
  };

  return (
    <div className="h-screen flex bg-gray-100">
      <ContactsSidebar 
        contacts={contacts}
        selectedContact={selectedContact}
        onSelectContact={setSelectedContact}
      />
      <ChatWindow 
        contact={selectedContact}
        messages={messages[selectedContact?.id || ""] || []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MessagingApp;
