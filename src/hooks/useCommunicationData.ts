
import { useState, useEffect } from 'react';

export interface Message {
  id: string;
  type: 'announcement' | 'message' | 'urgent';
  title: string;
  content: string;
  sender: string;
  recipients: string[];
  date: string;
  status: 'draft' | 'sent' | 'scheduled';
  priority: 'low' | 'medium' | 'high';
  scheduledDate?: string;
}

export interface Contact {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  department: string;
  status: 'active' | 'inactive';
}

const MESSAGES_STORAGE_KEY = 'communication_messages';
const CONTACTS_STORAGE_KEY = 'communication_contacts';

const defaultMessages: Message[] = [
  {
    id: '1',
    type: 'announcement',
    title: 'School Reopening Notice',
    content: 'School will reopen on Monday, January 15th. Please ensure all students report by 8:00 AM.',
    sender: 'Admin Office',
    recipients: ['all'],
    date: new Date().toISOString(),
    status: 'sent',
    priority: 'high'
  }
];

const defaultContacts: Contact[] = [
  {
    id: '1',
    name: 'Sarah Nakato',
    role: 'Parent',
    email: 'sarah.nakato@email.com',
    phone: '+256 701 234 567',
    department: 'P.7A',
    status: 'active'
  }
];

export const useCommunicationData = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(MESSAGES_STORAGE_KEY);
    const savedContacts = localStorage.getItem(CONTACTS_STORAGE_KEY);
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages(defaultMessages);
      }
    } else {
      setMessages(defaultMessages);
    }
    
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts));
      } catch (error) {
        console.error('Error loading contacts:', error);
        setContacts(defaultContacts);
      }
    } else {
      setContacts(defaultContacts);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    }
  }, [messages]);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
    }
  }, [contacts]);

  const addMessage = (messageData: Omit<Message, 'id' | 'date'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  const updateMessage = (id: string, messageData: Partial<Message>) => {
    setMessages(prev => prev.map(msg => 
      msg.id === id ? { ...msg, ...messageData } : msg
    ));
  };

  const deleteMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  const addContact = (contactData: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contactData,
      id: Date.now().toString()
    };
    setContacts(prev => [newContact, ...prev]);
  };

  const updateContact = (id: string, contactData: Partial<Contact>) => {
    setContacts(prev => prev.map(contact => 
      contact.id === id ? { ...contact, ...contactData } : contact
    ));
  };

  const deleteContact = (id: string) => {
    setContacts(prev => prev.filter(contact => contact.id !== id));
  };

  return {
    messages,
    contacts,
    addMessage,
    updateMessage,
    deleteMessage,
    addContact,
    updateContact,
    deleteContact
  };
};
