
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, ExternalLink } from 'lucide-react';

interface CommunityItem {
  name: string;
  members: string;
  link: string;
  description: string;
}

interface CommunitySectionProps {
  communityItems: CommunityItem[];
  onWhatsAppLink: (link: string) => void;
}

export const CommunitySection: React.FC<CommunitySectionProps> = ({
  communityItems,
  onWhatsAppLink
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 bg-green-50 border-green-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-center mb-3">
          <Users className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-center text-lg">Community & Support</CardTitle>
        <p className="text-sm text-gray-600 text-center">Connect with our community on WhatsApp</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {communityItems.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium">{item.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    <Users className="h-3 w-3 mr-1" />
                    {item.members}
                  </Badge>
                </div>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onWhatsAppLink(item.link)}
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
