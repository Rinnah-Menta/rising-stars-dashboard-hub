
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LibraryDocument } from '@/data/libraryData';
import { FileText, Download, ExternalLink, Calendar } from 'lucide-react';

interface DocumentViewDialogProps {
  document: LibraryDocument | null;
  isOpen: boolean;
  onClose: () => void;
}

export const DocumentViewDialog: React.FC<DocumentViewDialogProps> = ({
  document,
  isOpen,
  onClose
}) => {
  if (!document) return null;

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center space-x-2 mb-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <Badge className={getTypeColor(document.type)}>
              {getTypeLabel(document.type)}
            </Badge>
          </div>
          <DialogTitle className="text-xl">{document.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="text-sm text-gray-600">Class:</span>
              <p className="font-medium">{document.class}</p>
            </div>
            <div>
              <span className="text-sm text-gray-600">Subject:</span>
              <p className="font-medium">{document.subject}</p>
            </div>
            {document.fileSize && (
              <div>
                <span className="text-sm text-gray-600">File Size:</span>
                <p className="font-medium">{document.fileSize}</p>
              </div>
            )}
            <div>
              <span className="text-sm text-gray-600">Uploaded:</span>
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                <p className="font-medium">{new Date(document.uploadedDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-2">Document Preview</h3>
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">Document preview not available</p>
              <div className="flex justify-center gap-2">
                <Button onClick={() => window.open(document.url, '_blank')}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </Button>
                <Button variant="outline" onClick={() => window.open(document.url, '_blank')}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
