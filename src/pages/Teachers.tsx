import { useState } from "react";
import { Search, Plus, Filter, MoreHorizontal, Mail, Phone, GraduationCap, BookOpen } from "lucide-react";
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

interface Teacher {
  id: string;
  name: string;
  email: string;
  subject: string;
  department: string;
  status: "active" | "inactive" | "on-leave";
  phone: string;
  experience: string;
  classes: number;
}

const mockTeachers: Teacher[] = [
  {
    id: "1",
    name: "Dr. Sarah Peterson",
    email: "sarah.peterson@school.edu",
    subject: "Mathematics",
    department: "Science & Math",
    status: "active",
    phone: "(555) 111-2222",
    experience: "8 years",
    classes: 4
  },
  {
    id: "2",
    name: "Mr. David Thompson",
    email: "david.thompson@school.edu",
    subject: "English Literature",
    department: "Languages",
    status: "active",
    phone: "(555) 333-4444",
    experience: "12 years",
    classes: 5
  },
  {
    id: "3",
    name: "Ms. Maria Garcia",
    email: "maria.garcia@school.edu",
    subject: "Chemistry",
    department: "Science & Math",
    status: "active",
    phone: "(555) 555-6666",
    experience: "6 years",
    classes: 3
  },
  {
    id: "4",
    name: "Mr. Robert Kim",
    email: "robert.kim@school.edu",
    subject: "History",
    department: "Social Studies",
    status: "on-leave",
    phone: "(555) 777-8888",
    experience: "15 years",
    classes: 0
  }
];

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [teachers] = useState<Teacher[]>(mockTeachers);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    teacher.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: Teacher["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "on-leave":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Teachers</h1>
          <p className="text-muted-foreground">Manage faculty and staff information</p>
        </div>
        <Button className="flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Teacher</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teachers by name, subject, or department..."
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

      {/* Teachers Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredTeachers.map((teacher, index) => (
          <Card key={teacher.id} className="hover:shadow-elegant transition-all duration-200 animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{teacher.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{teacher.subject}</p>
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
                    <DropdownMenuItem>Edit Teacher</DropdownMenuItem>
                    <DropdownMenuItem>View Schedule</DropdownMenuItem>
                    <DropdownMenuItem>Assign Classes</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{teacher.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{teacher.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <BookOpen className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">{teacher.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(teacher.status)}>
                  {teacher.status.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Badge>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Experience</div>
                  <div className="text-sm font-medium">{teacher.experience}</div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-sm text-muted-foreground">Active Classes</span>
                <span className="text-sm font-medium">{teacher.classes}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTeachers.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No teachers found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or add a new teacher.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}