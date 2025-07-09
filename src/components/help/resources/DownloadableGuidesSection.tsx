
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download } from 'lucide-react';

interface GuideItem {
  name: string;
  size: string;
  filename: string;
}

interface DownloadableGuidesSectionProps {
  guides: GuideItem[];
  onDownload: (filename: string, itemName: string) => void;
}

export const DownloadableGuidesSection: React.FC<DownloadableGuidesSectionProps> = ({
  guides,
  onDownload
}) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-200 bg-green-50 border-green-200">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-center mb-3">
          <FileText className="h-8 w-8 text-green-600" />
        </div>
        <CardTitle className="text-center text-lg">Downloadable Guides</CardTitle>
        <p className="text-sm text-gray-600 text-center">Comprehensive PDF documentation</p>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {guides.map((guide, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium">{guide.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-xs">
                    <FileText className="h-3 w-3 mr-1" />
                    {guide.size}
                  </Badge>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => onDownload(guide.filename, guide.name)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
