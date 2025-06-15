
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, UserPlus, Download, Filter, RefreshCw } from 'lucide-react';
import { useStudents, Student } from '@/hooks/useStudents';
import { StudentsStats } from '@/components/students/StudentsStats';
import { StudentsTable } from '@/components/students/StudentsTable';
import { StudentDialog } from '@/components/students/StudentDialog';
import { StudentDetailsDialog } from '@/components/students/StudentDetailsDialog';
import { useToast } from '@/hooks/use-toast';
import AnimatedInView from '@/components/AnimatedInView';

export const Students = () => {
  const {
    students,
    loading,
    searchTerm,
    setSearchTerm,
    filterStatus,
    setFilterStatus,
    stats,
    addStudent,
    updateStudent,
    deleteStudent,
    refreshStudents
  } = useStudents();

  const { toast } = useToast();
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const handleAddStudent = (studentData: Omit<Student, 'id'>) => {
    addStudent(studentData);
  };

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student);
    setShowAddDialog(true);
  };

  const handleUpdateStudent = (studentData: Student) => {
    updateStudent(studentData.id, studentData);
    setEditingStudent(null);
  };

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setShowDetailsDialog(true);
  };

  const handleExport = () => {
    const csvContent = [
      ['Student ID', 'Name', 'Class', 'Age', 'Parent/Guardian', 'Contact', 'Fees Status'],
      ...students.map(student => [
        student.id,
        student.name,
        student.class,
        student.age.toString(),
        student.parent,
        student.phone,
        student.fees
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'students.csv';
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: "Students data has been exported to CSV.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedInView>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Students Management</h1>
            <p className="text-gray-600 mt-1">Manage student information and track fees</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={() => setShowAddDialog(true)} className="bg-blue-600 hover:bg-blue-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" onClick={refreshStudents} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </AnimatedInView>

      {/* Statistics */}
      <StudentsStats stats={stats} />

      {/* Students List */}
      <AnimatedInView>
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <CardTitle>Student List ({students.length})</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search students..." 
                    className="pl-10 w-full sm:w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-40">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder="Filter by fees" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Students</SelectItem>
                    <SelectItem value="Paid">Paid</SelectItem>
                    <SelectItem value="Pending">Pending</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                <span className="ml-2 text-gray-600">Loading students...</span>
              </div>
            ) : (
              <StudentsTable
                students={students}
                onEdit={handleEditStudent}
                onDelete={deleteStudent}
                onView={handleViewStudent}
              />
            )}
          </CardContent>
        </Card>
      </AnimatedInView>

      {/* Dialogs */}
      <StudentDialog
        open={showAddDialog}
        onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) setEditingStudent(null);
        }}
        student={editingStudent}
        onSave={editingStudent ? handleUpdateStudent : handleAddStudent}
      />

      <StudentDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        student={selectedStudent}
        onEdit={handleEditStudent}
      />
    </div>
  );
};
