
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Phone, Mail, Book } from 'lucide-react';

interface ContactActionsProps {
  onLiveChatClick: () => void;
  onPhoneCall: () => void;
  onEmailClick: () => void;
}

export const ContactActions: React.FC<ContactActionsProps> = ({
  onLiveChatClick,
  onPhoneCall,
  onEmailClick
}) => {
  const handleUserGuideClick = () => {
    // Trigger the User Guide tab programmatically
    const userGuideTab = document.querySelector('[value="guide"]') as HTMLButtonElement;
    if (userGuideTab) {
      userGuideTab.click();
      // Scroll to the tab content after a short delay
      setTimeout(() => {
        const userGuideContent = document.querySelector('[data-state="active"][data-orientation="horizontal"]');
        if (userGuideContent) {
          userGuideContent.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
          });
        }
      }, 150);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200" onClick={onLiveChatClick}>
        <CardContent className="p-4 text-center">
          <MessageSquare className="h-8 w-8 text-blue-600 mx-auto mb-2" />
          <h3 className="font-semibold text-blue-900">Live Chat</h3>
          <p className="text-sm text-blue-700">Chat with support</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-green-50 to-green-100 border-green-200" onClick={onPhoneCall}>
        <CardContent className="p-4 text-center">
          <Phone className="h-8 w-8 text-green-600 mx-auto mb-2" />
          <h3 className="font-semibold text-green-900">Call Support</h3>
          <p className="text-sm text-green-700">+256 123 456 789</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" onClick={onEmailClick}>
        <CardContent className="p-4 text-center">
          <Mail className="h-8 w-8 text-purple-600 mx-auto mb-2" />
          <h3 className="font-semibold text-purple-900">Email Us</h3>
          <p className="text-sm text-purple-700">support@school.edu</p>
        </CardContent>
      </Card>
      
      <Card className="hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200" onClick={handleUserGuideClick}>
        <CardContent className="p-4 text-center">
          <Book className="h-8 w-8 text-orange-600 mx-auto mb-2" />
          <h3 className="font-semibold text-orange-900">User Guide</h3>
          <p className="text-sm text-orange-700">Browse tutorials</p>
        </CardContent>
      </Card>
    </div>
  );
};
