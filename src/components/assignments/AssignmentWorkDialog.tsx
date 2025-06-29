
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Assignment } from '@/hooks/useAssignmentsData';
import { Save, FileText } from 'lucide-react';

interface AssignmentWorkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: Assignment;
  onSave: (content: string) => void;
}

export const AssignmentWorkDialog: React.FC<AssignmentWorkDialogProps> = ({
  open,
  onOpenChange,
  assignment,
  onSave,
}) => {
  const [workContent, setWorkContent] = useState('');

  useEffect(() => {
    if (open) {
      setWorkContent(assignment.workContent || '');
    }
  }, [open, assignment.workContent]);

  const handleSave = () => {
    onSave(workContent);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Work on: {assignment.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 space-y-4 overflow-y-auto">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h3 className="font-medium mb-1">Assignment Description</h3>
            <p className="text-sm text-gray-700">{assignment.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="work-content">Your Work</Label>
            <Textarea
              id="work-content"
              value={workContent}
              onChange={(e) => setWorkContent(e.target.value)}
              placeholder="Start working on your assignment here..."
              className="min-h-[300px] resize-none"
            />
          </div>

          <div className="text-sm text-gray-500">
            <p>• Your work is automatically saved when you click Save</p>
            <p>• You can come back and continue working anytime</p>
            <p>• Submit your assignment when you're ready</p>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save Work
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
