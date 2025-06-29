
import React from 'react';
import { useAssignmentsData } from '@/hooks/useAssignmentsData';
import { AssignmentsHeader } from '@/components/assignments/AssignmentsHeader';
import { AssignmentCard } from '@/components/assignments/AssignmentCard';

export const Assignments = () => {
  const { assignments, loading, updateAssignmentStatus, updateAssignment, getStats } = useAssignmentsData();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading assignments...</div>
      </div>
    );
  }

  const stats = getStats();

  return (
    <div className="space-y-4 sm:space-y-6">
      <AssignmentsHeader stats={stats} />

      <div className="grid gap-4 sm:gap-6">
        {assignments.map((assignment) => (
          <AssignmentCard
            key={assignment.id}
            assignment={assignment}
            onStatusUpdate={updateAssignmentStatus}
            onUpdate={updateAssignment}
          />
        ))}
      </div>

      {assignments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No assignments found</p>
        </div>
      )}
    </div>
  );
};
