
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Calendar, Download } from 'lucide-react';
import { LibraryDocument, extractFileName } from '@/data/libraryData';

interface LibraryDocumentCardProps {
  document: LibraryDocument;
  onView: (document: LibraryDocument) => void;
}

export const LibraryDocumentCard: React.FC<LibraryDocumentCardProps> = ({
  document,
  onView
}) => {
  const getTypeColor = (type: string) => {
    const colors = {
      'lesson-notes': 'bg-blue-100 text-blue-800',
      'past-papers': 'bg-green-100 text-green-800',
      'schemes-of-work': 'bg-purple-100 text-purple-800',
      'textbooks': 'bg-orange-100 text-orange-800',
      'holiday-packages': 'bg-pink-100 text-pink-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      'lesson-notes': 'Lesson Notes',
      'past-papers': 'Past Papers',
      'schemes-of-work': 'Schemes of Work',
      'textbooks': 'Textbooks',
      'holiday-packages': 'Holiday Packages'
    };
    return labels[type as keyof typeof labels] || type;
  };

  return (
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <Badge className={getTypeColor(document.type)}>
              {getTypeLabel(document.type)}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-base line-clamp-2">
          {document.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="text-sm text-gray-600 space-y-1">
          <div className="flex justify-between">
            <span>Class:</span>
            <span className="font-medium">{document.class}</span>
          </div>
          <div className="flex justify-between">
            <span>Subject:</span>
            <span className="font-medium">{document.subject}</span>
          </div>
          {document.fileSize && (
            <div className="flex justify-between">
              <span>Size:</span>
              <span className="font-medium">{document.fileSize}</span>
            </div>
          )}
        </div>

        <div className="flex items-center text-xs text-gray-500">
          <Calendar className="h-3 w-3 mr-1" />
          <span>Uploaded: {new Date(document.uploadedDate).toLocaleDateString()}</span>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            size="sm" 
            className="flex-1"
            onClick={() => onView(document)}
          >
            <FileText className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            size="sm" 
            variant="outline"
            onClick={() => window.open(document.url, '_blank')}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
