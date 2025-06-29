
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
import { Input } from '@/components/ui/input';
import { Assignment } from '@/hooks/useAssignmentsData';
import { Upload, Eye, X, Plus } from 'lucide-react';

interface AssignmentSubmissionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: Assignment;
  onSubmit: (data: { content: string; files: string[] }) => void;
  isViewMode?: boolean;
}

export const AssignmentSubmissionDialog: React.FC<AssignmentSubmissionDialogProps> = ({
  open,
  onOpenChange,
  assignment,
  onSubmit,
  isViewMode = false,
}) => {
  const [submissionContent, setSubmissionContent] = useState('');
  const [files, setFiles] = useState<string[]>([]);
  const [newFileName, setNewFileName] = useState('');

  useEffect(() => {
    if (open) {
      setSubmissionContent(assignment.submissionContent || assignment.workContent || '');
      setFiles(assignment.submissionFiles || []);
    }
  }, [open, assignment]);

  const handleAddFile = () => {
    if (newFileName.trim() && !files.includes(newFileName.trim())) {
      setFiles([...files, newFileName.trim()]);
      setNewFileName('');
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!submissionContent.trim()) {
      return;
    }
    
    onSubmit({
      content: submissionContent,
      files: files,
    });
    onOpenChange(false);
  };

  const canSubmit = submissionContent.trim().length > 0;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {isViewMode ? <Eye className="h-5 w-5" /> : <Upload className="h-5 w-5" />}
            {isViewMode ? 'View Submission:' : 'Submit:'} {assignment.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 space-y-4 overflow-y-auto">
          <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
            <h3 className="font-medium mb-1">Assignment Description</h3>
            <p className="text-sm text-gray-700">{assignment.description}</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="submission-content">
              {isViewMode ? 'Submitted Work' : 'Your Submission'}
            </Label>
            <Textarea
              id="submission-content"
              value={submissionContent}
              onChange={(e) => setSubmissionContent(e.target.value)}
              placeholder={isViewMode ? "No submission content" : "Write your final submission here..."}
              className="min-h-[200px] resize-none"
              readOnly={isViewMode}
            />
          </div>

          <div className="space-y-2">
            <Label>Attached Files</Label>
            
            {!isViewMode && (
              <div className="flex gap-2">
                <Input
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  placeholder="File name (e.g., document.pdf, image.jpg)"
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFile()}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="sm"
                  onClick={handleAddFile}
                  disabled={!newFileName.trim()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            )}

            {files.length > 0 ? (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">{file}</span>
                    {!isViewMode && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 italic">No files attached</p>
            )}
          </div>

          {assignment.status === 'submitted' && assignment.submissionDate && (
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <p className="text-sm text-green-800">
                <strong>Submitted on:</strong> {new Date(assignment.submissionDate).toLocaleDateString()}
              </p>
              {assignment.grade && (
                <p className="text-sm text-green-800 mt-1">
                  <strong>Grade:</strong> {assignment.grade}
                </p>
              )}
            </div>
          )}

          {!isViewMode && (
            <div className="text-sm text-gray-500">
              <p>• Make sure your submission is complete before submitting</p>
              <p>• You can attach file names to indicate what you're submitting</p>
              <p>• Once submitted, you can view but not edit your submission</p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {isViewMode ? 'Close' : 'Cancel'}
          </Button>
          {!isViewMode && (
            <Button 
              onClick={handleSubmit} 
              disabled={!canSubmit}
              className={assignment.status === 'overdue' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              <Upload className="h-4 w-4 mr-2" />
              {assignment.status === 'overdue' ? 'Submit Late' : 'Submit Assignment'}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
