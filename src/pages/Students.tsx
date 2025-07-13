import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  class: string;
  status: "active" | "inactive" | "graduated";
  phone: string;
  enrollmentDate: string;
}

const mockStudents: Student[] = [
  {
    id: "1",
    name: "Emma Johnson",
    email: "emma.johnson@email.com",
    grade: "10th",
    class: "A",
    status: "active",
    phone: "(555) 123-4567",
    enrollmentDate: "2023-08-15"
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@email.com",
    grade: "11th",
    class: "B",
    status: "active",
    phone: "(555) 234-5678",
    enrollmentDate: "2022-08-20"
  },
  {
    id: "3",
    name: "Sophia Rodriguez",
    email: "sophia.rodriguez@email.com",
    grade: "9th",
    class: "A",
    status: "active",
    phone: "(555) 345-6789",
    enrollmentDate: "2024-01-10"
  },
  {
    id: "4",
    name: "James Wilson",
    email: "james.wilson@email.com",
    grade: "12th",
    class: "C",
    status: "graduated",
    phone: "(555) 456-7890",
    enrollmentDate: "2021-08-25"
  }
];

export default function Students() {
  const [searchTerm, setSearchTerm] = useState("");
  const [students] = useState<Student[]>(mockStudents);

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.grade.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "graduated":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Students</h1>
          <p className="text-muted-foreground">Manage student information and records</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Student</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search students by name, email, or grade..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Students Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStudents.map((student, index) => (
          <Card key={student.id} className="hover:shadow-elegant transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{student.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">Grade {student.grade} - Class {student.class}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Edit Student</DropdownMenuItem>
                    <DropdownMenuItem>View Grades</DropdownMenuItem>
                    <DropdownMenuItem>Contact Parent</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{student.phone}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(student.status)}>
                  {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                </Badge>
                <span className="text-xs text-muted-foreground">
                  Enrolled: {new Date(student.enrollmentDate).toLocaleDateString()}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No students found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or add a new student.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}