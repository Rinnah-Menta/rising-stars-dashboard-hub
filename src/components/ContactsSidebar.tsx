
import { Search, MoreVertical } from "lucide-react";
import { Contact } from "./MessagingApp";
import { cn } from "@/lib/utils";

interface ContactsSidebarProps {
  contacts: Contact[];
  selectedContact: Contact | null;
  onSelectContact: (contact: Contact) => void;
}

const ContactsSidebar = ({ contacts, selectedContact, onSelectContact }: ContactsSidebarProps) => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">Messages</h1>
        <MoreVertical className="w-5 h-5 cursor-pointer hover:bg-green-700 rounded p-1" />
      </div>

      {/* Search */}
      <div className="p-3 border-b border-gray-200">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onSelectContact(contact)}
            className={cn(
              "flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100",
              selectedContact?.id === contact.id && "bg-green-50 border-green-200"
            )}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {contact.isOnline && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
              )}
            </div>
            
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-900 truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.timestamp}</span>
              </div>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
                {contact.unreadCount && (
                  <span className="bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-2">
                    {contact.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactsSidebar;
