
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Calendar, BookOpen, User, AlertCircle, Clock } from 'lucide-react';
import { Assignment } from '@/hooks/useAssignmentsData';

interface AssignmentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  assignment: Assignment;
}

export const AssignmentDetailsDialog: React.FC<AssignmentDetailsDialogProps> = ({
  open,
  onOpenChange,
  assignment,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline">Pending</Badge>;
      case 'submitted':
        return <Badge className="bg-green-500">Submitted</Badge>;
      case 'in-progress':
        return <Badge className="bg-yellow-500">In Progress</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium Priority</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Normal</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {assignment.priority === 'high' && <AlertCircle className="h-5 w-5 text-red-500" />}
            {assignment.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="flex flex-wrap gap-2">
            {getStatusBadge(assignment.status)}
            {getPriorityBadge(assignment.priority)}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Subject:</span>
                <span>{assignment.subject}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Teacher:</span>
                <span>{assignment.teacher}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Due Date:</span>
                <span>{new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>

              {assignment.lastWorkedOn && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">Last Worked:</span>
                  <span>{new Date(assignment.lastWorkedOn).toLocaleDateString()}</span>
                </div>
              )}
            </div>

            {assignment.status === 'submitted' && (
              <div className="space-y-3">
                {assignment.submissionDate && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-green-500" />
                    <span className="font-medium">Submitted:</span>
                    <span>{new Date(assignment.submissionDate).toLocaleDateString()}</span>
                  </div>
                )}
                
                {assignment.grade && (
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Grade:</span>
                    <span className="text-green-600 font-semibold">{assignment.grade}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{assignment.description}</p>
          </div>

          {assignment.feedback && (
            <div>
              <h3 className="font-medium mb-2">Teacher Feedback</h3>
              <p className="text-gray-700 bg-green-50 p-3 rounded-lg border border-green-200">
                {assignment.feedback}
              </p>
            </div>
          )}

          {assignment.workContent && (
            <div>
              <h3 className="font-medium mb-2">Your Work</h3>
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <p className="whitespace-pre-wrap">{assignment.workContent}</p>
              </div>
            </div>
          )}

          {assignment.submissionContent && (
            <div>
              <h3 className="font-medium mb-2">Submission</h3>
              <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                <p className="whitespace-pre-wrap">{assignment.submissionContent}</p>
                {assignment.submissionFiles && assignment.submissionFiles.length > 0 && (
                  <div className="mt-2">
                    <span className="text-sm font-medium">Attached Files:</span>
                    <ul className="text-sm text-gray-600 mt-1">
                      {assignment.submissionFiles.map((file, index) => (
                        <li key={index}>• {file}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
