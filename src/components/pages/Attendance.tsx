
import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, Users, BookOpen, ChevronRight, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import AnimatedInView from '@/components/AnimatedInView';
import { exportAttendanceToCSV } from '@/utils/attendanceExport';
import { AttendanceStats } from '@/components/attendance/AttendanceStats';
import { AttendanceFilters } from '@/components/attendance/AttendanceFilters';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import { useAttendanceData } from '@/hooks/useAttendanceData';
import { LoadingClassGrid, LoadingStatsCards, LoadingTable } from '@/components/ui/loading-skeleton';
import { LoadingProgress } from '@/components/ui/loading-progress';
import { ColorfulSpinner } from '@/components/ui/colorful-spinner';
import { format } from 'date-fns';
import { localStudentDatabase } from '@/data/studentdata';

export const Attendance = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State declarations first
  const [selectedClass, setSelectedClass] = useState<string>('');
  
  // Hook that depends on selectedClass
  const { attendanceRecords, loading, updateAttendanceStatus, bulkUpdateAttendance } = useAttendanceData(selectedClass);
  
  // Get available classes from student database with student counts
  const classesWithCounts = useMemo(() => {
    const studentsData = localStudentDatabase.users.filter(user => user.role === 'pupil');
    const classCounts: Record<string, number> = {};
    
    studentsData.forEach(student => {
      classCounts[student.class] = (classCounts[student.class] || 0) + 1;
    });
    
    return Object.entries(classCounts)
      .map(([className, count]) => ({ name: className, count }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [showClassSelection, setShowClassSelection] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(false);

  const handleQuickAttendance = (studentId: string, status: 'present' | 'absent') => {
    updateAttendanceStatus(studentId, status);
    
    const student = attendanceRecords.find(r => r.studentId === studentId);
    toast({
      title: 'Attendance Updated',
      description: `${student?.studentName} marked as ${status}`,
    });
  };

  const handleBulkAttendance = (status: 'present' | 'absent') => {
    if (selectedStudents.length === 0) {
      toast({
        title: 'No Students Selected',
        description: 'Please select students to update attendance.',
        variant: 'destructive',
      });
      return;
    }

    bulkUpdateAttendance(selectedStudents, status);
    setSelectedStudents([]);
    
    toast({
      title: 'Bulk Attendance Updated',
      description: `${selectedStudents.length} students marked as ${status}`,
    });
  };

  const handleSelectAll = () => {
    if (selectedStudents.length === filteredRecords.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredRecords.map(record => record.studentId));
    }
  };

  const handleExport = () => {
    const filteredData = filteredRecords;
    
    if (filteredData.length === 0) {
      toast({
        title: 'No Data to Export',
        description: 'No attendance records match your current filters.',
        variant: 'destructive',
      });
      return;
    }

    exportAttendanceToCSV(filteredData);
    
    toast({
      title: 'Export Successful',
      description: `Exported ${filteredData.length} attendance records to CSV.`,
    });
  };

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.studentId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === '' || record.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const canManageAttendance = user?.role === 'admin' || user?.role === 'teacher';

  const handleClassSelect = (className: string) => {
    setSelectedClass(className);
    setShowClassSelection(false);
    setSelectedStudents([]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <AnimatedInView>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Attendance Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Track and manage student attendance
            </p>
          </div>
          {canManageAttendance && !showClassSelection && (
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          )}
        </div>
      </AnimatedInView>

      {/* Class Selection Overview */}
      {showClassSelection && (
        <AnimatedInView>
          {loading ? (
            <ColorfulSpinner 
              type="attendance" 
              message="Loading classes..."
              size="lg"
            />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <BookOpen className="h-5 w-5" />
                  Select Class for Attendance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                  {classesWithCounts.map((classInfo) => (
                    <Card 
                      key={classInfo.name}
                      className="hover:shadow-md transition-all duration-200 cursor-pointer border-2 hover:border-primary hover:scale-[1.02]"
                      onClick={() => handleClassSelect(classInfo.name)}
                    >
                      <CardContent className="p-3 sm:p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Users className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-sm sm:text-base">{classInfo.name}</h3>
                              <p className="text-xs sm:text-sm text-muted-foreground">{classInfo.count} students</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </AnimatedInView>
      )}


      {/* Current Selection & Stats */}
      {!showClassSelection && (
        <>
          <AnimatedInView>
            <Card>
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <Badge variant="secondary" className="text-sm sm:text-base px-2 sm:px-3 py-1 w-fit">
                      {selectedClass}
                    </Badge>
                    <span className="text-sm sm:text-base text-muted-foreground">
                      {filteredRecords.length} students
                    </span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setShowClassSelection(true)}
                    className="w-full sm:w-auto"
                  >
                    Change Class
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedInView>

          {/* Stats Cards */}
          <AnimatedInView>
            {loading ? (
              <ColorfulSpinner 
                type="attendance" 
                message="Loading attendance stats..."
                size="md"
              />
            ) : (
              <AttendanceStats records={filteredRecords} />
            )}
          </AnimatedInView>
        </>
      )}

      {/* Search Filter */}
      {!showClassSelection && (
        <AnimatedInView>
          <Card>
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search students by name or ID..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>
      )}

      {/* Attendance Table */}
      {!showClassSelection && (
        <AnimatedInView>
          {loading ? (
            <ColorfulSpinner 
              type="attendance" 
              message="Loading student attendance..."
              size="lg"
            />
          ) : (
            <AttendanceTable
              records={filteredRecords}
              canManageAttendance={canManageAttendance}
              onStatusChange={handleQuickAttendance}
              selectedStudents={selectedStudents}
              onStudentSelect={(studentId) => {
                setSelectedStudents(prev => 
                  prev.includes(studentId) 
                    ? prev.filter(id => id !== studentId)
                    : [...prev, studentId]
                );
              }}
              onSelectAll={handleSelectAll}
              onBulkAttendance={handleBulkAttendance}
            />
          )}
        </AnimatedInView>
      )}
    </div>
  );
};
