
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, AlertCircle, Eye, FileText, Upload } from 'lucide-react';
import { Assignment } from '@/hooks/useAssignmentsData';
import { ConfirmationDialog } from '@/components/ui/confirmation-dialog';
import { AssignmentDetailsDialog } from './AssignmentDetailsDialog';
import { AssignmentWorkDialog } from './AssignmentWorkDialog';
import { AssignmentSubmissionDialog } from './AssignmentSubmissionDialog';
import { toast } from 'sonner';

interface AssignmentCardProps {
  assignment: Assignment;
  onStatusUpdate: (id: number, status: Assignment['status']) => void;
  onUpdate: (id: number, updates: Partial<Assignment>) => void;
}

export const AssignmentCard: React.FC<AssignmentCardProps> = ({ 
  assignment, 
  onStatusUpdate,
  onUpdate
}) => {
  const [confirmDialog, setConfirmDialog] = useState<{
    open: boolean;
    action: string;
    status?: Assignment['status'];
  }>({ open: false, action: '' });
  
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);
  const [submissionOpen, setSubmissionOpen] = useState(false);

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

  const getPriorityIcon = (priority: string) => {
    return priority === 'high' ? (
      <AlertCircle className="h-4 w-4 text-red-500" />
    ) : null;
  };

  const handleStatusChange = (newStatus: Assignment['status'], actionText: string) => {
    setConfirmDialog({
      open: true,
      action: actionText,
      status: newStatus
    });
  };

  const confirmStatusChange = () => {
    if (confirmDialog.status) {
      onStatusUpdate(assignment.id, confirmDialog.status);
      toast.success(`Assignment ${confirmDialog.action.toLowerCase()} successfully!`);
    }
    setConfirmDialog({ open: false, action: '' });
  };

  const handleWorkSave = (workContent: string) => {
    onUpdate(assignment.id, { 
      workContent,
      lastWorkedOn: new Date().toISOString().split('T')[0]
    });
    toast.success('Work saved successfully!');
  };

  const handleSubmission = (submissionData: { content: string; files: string[] }) => {
    onUpdate(assignment.id, {
      submissionContent: submissionData.content,
      submissionFiles: submissionData.files,
      submissionDate: new Date().toISOString().split('T')[0]
    });
    onStatusUpdate(assignment.id, 'submitted');
    toast.success('Assignment submitted successfully!');
  };

  return (
    <>
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                {getPriorityIcon(assignment.priority)}
                <CardTitle className="text-lg">{assignment.title}</CardTitle>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <BookOpen className="h-4 w-4" />
                <span>{assignment.subject}</span>
                <span>•</span>
                <span>{assignment.teacher}</span>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              {getStatusBadge(assignment.status)}
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{assignment.description}</p>
          
          {assignment.status === 'submitted' && assignment.grade && (
            <div className="mb-4 p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm font-medium text-green-800">Grade: {assignment.grade}</p>
              {assignment.feedback && (
                <p className="text-sm text-green-700 mt-1">{assignment.feedback}</p>
              )}
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-2">
            {assignment.status === 'pending' && (
              <Button 
                size="sm"
                onClick={() => handleStatusChange('in-progress', 'Started')}
              >
                Start Assignment
              </Button>
            )}
            
            {assignment.status === 'in-progress' && (
              <>
                <Button 
                  size="sm"
                  onClick={() => setSubmissionOpen(true)}
                >
                  <Upload className="h-4 w-4 mr-1" />
                  Submit Assignment
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setWorkOpen(true)}
                >
                  <FileText className="h-4 w-4 mr-1" />
                  Continue Work
                </Button>
              </>
            )}
            
            {assignment.status === 'submitted' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setSubmissionOpen(true)}
              >
                <Eye className="h-4 w-4 mr-1" />
                View Submission
              </Button>
            )}
            
            {assignment.status === 'overdue' && (
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => setSubmissionOpen(true)}
              >
                <Upload className="h-4 w-4 mr-1" />
                Submit Now
              </Button>
            )}
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setDetailsOpen(true)}
            >
              <Eye className="h-4 w-4 mr-1" />
              View Details
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={confirmDialog.open}
        onOpenChange={(open) => setConfirmDialog({ ...confirmDialog, open })}
        title={`Confirm ${confirmDialog.action}`}
        description={`Are you sure you want to mark this assignment as ${confirmDialog.status?.replace('-', ' ')}?`}
        confirmText={confirmDialog.action}
        onConfirm={confirmStatusChange}
        type="edit"
      />

      <AssignmentDetailsDialog
        open={detailsOpen}
        onOpenChange={setDetailsOpen}
        assignment={assignment}
      />

      <AssignmentWorkDialog
        open={workOpen}
        onOpenChange={setWorkOpen}
        assignment={assignment}
        onSave={handleWorkSave}
      />

      <AssignmentSubmissionDialog
        open={submissionOpen}
        onOpenChange={setSubmissionOpen}
        assignment={assignment}
        onSubmit={handleSubmission}
        isViewMode={assignment.status === 'submitted'}
      />
    </>
  );
};
