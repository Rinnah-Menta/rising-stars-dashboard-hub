
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { BookOpen, Users, Clock, MapPin, Plus, Search, Filter, Edit, Trash2, UserPlus, Eye } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';
import { ClassDialog } from '@/components/classes/ClassDialog';
import { ClassDetailsDialog } from '@/components/classes/ClassDetailsDialog';
import { localStudentDatabase } from '@/data/studentdata';

interface ClassData {
  id: string;
  name: string;
  teacher: string;
  students: number;
  room: string;
  schedule: string;
  subjects: string[];
  level: string;
  capacity: number;
  academicYear: string;
}

export const Classes = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLevel, setFilterLevel] = useState('all');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [editingClass, setEditingClass] = useState<ClassData | null>(null);
  const [viewingClass, setViewingClass] = useState<ClassData | null>(null);

  // Generate classes from real student database
  const generateClassesFromStudentData = (): ClassData[] => {
    const classesData: ClassData[] = [];
    
    Object.entries(localStudentDatabase.studentsByClass).forEach(([className, students]) => {
      const formattedClassName = className.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
      const studentCount = students.length;
      
      // Determine class level and subjects based on class name
      let level = '';
      let subjects: string[] = [];
      let capacity = 35;
      
      if (className.includes('JUNIOR')) {
        level = formattedClassName;
        subjects = ['Mathematics', 'English', 'Science', 'Social Studies'];
        if (className.includes('THREE') || className.includes('FOUR')) {
          subjects.push('Art', 'Computer');
        }
      } else if (className.includes('PRE_PRIMARY')) {
        level = 'Pre-Primary';
        subjects = ['Reading Readiness', 'Number Work', 'Art & Craft', 'Physical Education'];
        capacity = 25;
      } else if (className.includes('HEADSTART')) {
        level = 'Headstart';
        subjects = ['Pre-Reading', 'Pre-Math', 'Creative Play', 'Physical Development'];
        capacity = 20;
      } else if (className.includes('BEGINNER')) {
        level = 'Beginner';
        subjects = ['Letter Recognition', 'Number Recognition', 'Art', 'Music & Movement'];
        capacity = 20;
      } else if (className.includes('RECEPTION')) {
        level = 'Reception';
        subjects = ['Phonics', 'Basic Math', 'Art', 'Physical Education'];
        capacity = 25;
      }
      
      classesData.push({
        id: className,
        name: formattedClassName,
        teacher: 'Class Teacher',
        students: studentCount,
        room: `Room ${className.split('_').slice(-1)[0] || 'A'}`,
        schedule: 'Mon-Fri 8:00 AM - 3:30 PM',
        subjects,
        level,
        capacity,
        academicYear: '2024'
      });
    });
    
    return classesData.sort((a, b) => a.name.localeCompare(b.name));
  };

  const [classes, setClasses] = useState<ClassData[]>(generateClassesFromStudentData());

  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         classItem.room.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterLevel === 'all' || classItem.level === filterLevel;
    return matchesSearch && matchesFilter;
  });

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);
  const avgStudentsPerClass = Math.round(totalStudents / classes.length);
  const classLevels = [...new Set(classes.map(cls => cls.level))];

  const handleCreateClass = () => {
    setEditingClass(null);
    setShowCreateForm(true);
  };

  const handleEditClass = (classItem: ClassData) => {
    setEditingClass(classItem);
    setShowCreateForm(true);
  };

  const handleViewClass = (classItem: ClassData) => {
    setViewingClass(classItem);
    setShowDetailsDialog(true);
  };

  const handleSaveClass = (classData: ClassData) => {
    if (editingClass) {
      setClasses(classes.map(cls => cls.id === editingClass.id ? classData : cls));
      toast({
        title: "Class Updated",
        description: `${classData.name} has been updated successfully.`,
      });
    } else {
      setClasses([...classes, { ...classData, students: 0 }]);
      toast({
        title: "Class Created",
        description: `${classData.name} has been created successfully.`,
      });
    }
  };

  const handleDeleteClass = (classId: string) => {
    setClasses(classes.filter(cls => cls.id !== classId));
    toast({
      title: "Class Deleted",
      description: "The class has been successfully removed.",
    });
  };

  const handleManageStudents = (classItem: ClassData) => {
    toast({
      title: "Manage Students",
      description: `Opening student management for ${classItem.name}`,
    });
    // This would typically navigate to student management with class filter
  };

  const getUtilizationColor = (students: number, capacity: number) => {
    const percentage = (students / capacity) * 100;
    if (percentage >= 95) return 'text-red-600';
    if (percentage >= 85) return 'text-orange-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Class Management</h1>
          <p className="text-gray-600">Manage classes, teachers, and student enrollment</p>
        </div>
        {(user?.role === 'admin' || user?.role === 'teacher') && (
          <Button onClick={handleCreateClass}>
            <Plus className="h-4 w-4 mr-2" />
            Create New Class
          </Button>
        )}
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search classes, teachers, or rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterLevel} onValueChange={setFilterLevel}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            {classLevels.map(level => (
              <SelectItem key={level} value={level}>{level}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{classes.length}</div>
            <p className="text-xs text-gray-600">Total Classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
            <p className="text-xs text-gray-600">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{avgStudentsPerClass}</div>
            <p className="text-xs text-gray-600">Avg Students per Class</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{classLevels.length}</div>
            <p className="text-xs text-gray-600">Grade Levels</p>
          </CardContent>
        </Card>
      </div>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((classItem) => (
          <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{classItem.name}</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  {(user?.role === 'admin' || user?.role === 'teacher') && (
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleViewClass(classItem)}>
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleEditClass(classItem)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Class</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete "{classItem.name}"? This action cannot be undone and will remove all associated data.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteClass(classItem.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      <strong className={getUtilizationColor(classItem.students, classItem.capacity)}>
                        {classItem.students}
                      </strong>
                      /{classItem.capacity} students
                    </span>
                  </div>
                  <div className={`text-xs px-2 py-1 rounded-full ${
                    classItem.students >= classItem.capacity * 0.95 ? 'bg-red-100 text-red-800' :
                    classItem.students >= classItem.capacity * 0.85 ? 'bg-orange-100 text-orange-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {Math.round((classItem.students / classItem.capacity) * 100)}% capacity
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{classItem.room}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">{classItem.schedule}</span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Class Teacher</h4>
                <p className="text-sm text-gray-600">{classItem.teacher}</p>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Subjects ({classItem.subjects.length})</h4>
                <div className="flex flex-wrap gap-1">
                  {classItem.subjects.slice(0, 3).map((subject) => (
                    <span key={subject} className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                      {subject}
                    </span>
                  ))}
                  {classItem.subjects.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full">
                      +{classItem.subjects.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button variant="outline" size="sm" className="flex-1" onClick={() => handleViewClass(classItem)}>
                  View Details
                </Button>
                {(user?.role === 'admin' || user?.role === 'teacher') && (
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => handleManageStudents(classItem)}>
                    <UserPlus className="h-4 w-4 mr-1" />
                    Manage Students
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredClasses.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Classes Found</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || filterLevel !== 'all' 
                ? 'Try adjusting your search or filter criteria.' 
                : 'Get started by creating your first class.'}
            </p>
            {(user?.role === 'admin' || user?.role === 'teacher') && (
              <Button onClick={handleCreateClass}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Class
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Dialogs */}
      <ClassDialog
        open={showCreateForm}
        onOpenChange={setShowCreateForm}
        classData={editingClass}
        onSave={handleSaveClass}
      />

      <ClassDetailsDialog
        open={showDetailsDialog}
        onOpenChange={setShowDetailsDialog}
        classData={viewingClass}
        onEdit={(classData) => {
          setShowDetailsDialog(false);
          handleEditClass(classData);
        }}
        onManageStudents={handleManageStudents}
      />
    </div>
  );
};
