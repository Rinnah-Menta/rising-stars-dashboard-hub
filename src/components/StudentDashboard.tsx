
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface Student {
  id: string;
  name: string;
  studentId: string;
  class: string;
  section: string;
  rollNumber: string;
  email: string;
  phone: string;
}

export const StudentDashboard = () => {
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "John Smith",
      studentId: "STU001",
      class: "10th",
      section: "A",
      rollNumber: "101",
      email: "john.smith@email.com",
      phone: "+1234567890"
    },
    {
      id: "2",
      name: "Emma Johnson",
      studentId: "STU002",
      class: "10th",
      section: "A",
      rollNumber: "102",
      email: "emma.johnson@email.com",
      phone: "+1234567891"
    }
  ]);

  const [formData, setFormData] = useState({
    name: "",
    studentId: "",
    class: "",
    section: "",
    rollNumber: "",
    email: "",
    phone: ""
  });

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      setStudents(students.map(student => 
        student.id === editingId 
          ? { ...formData, id: editingId }
          : student
      ));
      setEditingId(null);
      toast("Student updated successfully!");
    } else {
      const newStudent: Student = {
        ...formData,
        id: Date.now().toString()
      };
      setStudents([...students, newStudent]);
      toast("Student added successfully!");
    }

    setFormData({
      name: "",
      studentId: "",
      class: "",
      section: "",
      rollNumber: "",
      email: "",
      phone: ""
    });
  };

  const handleEdit = (student: Student) => {
    setFormData(student);
    setEditingId(student.id);
  };

  const handleDelete = (id: string) => {
    setStudents(students.filter(student => student.id !== id));
    toast("Student deleted successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add/Edit Student Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
            <CardTitle>{editingId ? "Edit Student" : "Add New Student"}</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="class">Class</Label>
                  <Input
                    id="class"
                    value={formData.class}
                    onChange={(e) => setFormData({...formData, class: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="section">Section</Label>
                  <Input
                    id="section"
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({...formData, rollNumber: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  required
                  className="mt-1"
                />
              </div>

              <div className="flex space-x-2">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  {editingId ? "Update Student" : "Add Student"}
                </Button>
                {editingId && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => {
                      setEditingId(null);
                      setFormData({
                        name: "",
                        studentId: "",
                        class: "",
                        section: "",
                        rollNumber: "",
                        email: "",
                        phone: ""
                      });
                    }}
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Students List */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg">
            <CardTitle>Students List ({students.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {students.map((student) => (
                <div key={student.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      <p className="text-sm text-gray-600">ID: {student.studentId}</p>
                      <p className="text-sm text-gray-600">Class: {student.class}-{student.section}, Roll: {student.rollNumber}</p>
                      <p className="text-sm text-gray-600">{student.email}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(student)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(student.id)}>
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
