
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface Grade {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
  term: string;
}

export const GradeManager = () => {
  const [grades, setGrades] = useState<Grade[]>([
    {
      id: "1",
      studentId: "STU001",
      studentName: "John Smith",
      subject: "Mathematics",
      marks: 85,
      maxMarks: 100,
      grade: "A",
      term: "Term 1"
    },
    {
      id: "2",
      studentId: "STU001",
      studentName: "John Smith",
      subject: "Science",
      marks: 92,
      maxMarks: 100,
      grade: "A+",
      term: "Term 1"
    },
    {
      id: "3",
      studentId: "STU002",
      studentName: "Emma Johnson",
      subject: "Mathematics",
      marks: 78,
      maxMarks: 100,
      grade: "B+",
      term: "Term 1"
    }
  ]);

  const [formData, setFormData] = useState({
    studentId: "",
    studentName: "",
    subject: "",
    marks: "",
    maxMarks: "100",
    term: ""
  });

  const subjects = ["Mathematics", "Science", "English", "History", "Geography", "Physics", "Chemistry", "Biology"];
  const terms = ["Term 1", "Term 2", "Final"];

  const calculateGrade = (marks: number, maxMarks: number): string => {
    const percentage = (marks / maxMarks) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const marks = parseInt(formData.marks);
    const maxMarks = parseInt(formData.maxMarks);
    const grade = calculateGrade(marks, maxMarks);

    const newGrade: Grade = {
      id: Date.now().toString(),
      studentId: formData.studentId,
      studentName: formData.studentName,
      subject: formData.subject,
      marks,
      maxMarks,
      grade,
      term: formData.term
    };

    setGrades([...grades, newGrade]);
    toast("Grade added successfully!");

    setFormData({
      studentId: "",
      studentName: "",
      subject: "",
      marks: "",
      maxMarks: "100",
      term: ""
    });
  };

  const handleDelete = (id: string) => {
    setGrades(grades.filter(grade => grade.id !== id));
    toast("Grade deleted successfully!");
  };

  const getGradeColor = (grade: string): string => {
    switch (grade) {
      case "A+": return "bg-green-100 text-green-800";
      case "A": return "bg-blue-100 text-blue-800";
      case "B+": return "bg-yellow-100 text-yellow-800";
      case "B": return "bg-orange-100 text-orange-800";
      case "C": return "bg-purple-100 text-purple-800";
      case "F": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add Grade Form */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-t-lg">
            <CardTitle>Add New Grade</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="studentId">Student ID</Label>
                  <Input
                    id="studentId"
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    placeholder="STU001"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="studentName">Student Name</Label>
                  <Input
                    id="studentName"
                    value={formData.studentName}
                    onChange={(e) => setFormData({...formData, studentName: e.target.value})}
                    placeholder="John Smith"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="marks">Marks Obtained</Label>
                  <Input
                    id="marks"
                    type="number"
                    value={formData.marks}
                    onChange={(e) => setFormData({...formData, marks: e.target.value})}
                    min="0"
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="maxMarks">Maximum Marks</Label>
                  <Input
                    id="maxMarks"
                    type="number"
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({...formData, maxMarks: e.target.value})}
                    min="1"
                    required
                    className="mt-1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="term">Term</Label>
                <Select onValueChange={(value) => setFormData({...formData, term: value})}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term} value={term}>{term}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
                Add Grade
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Grades Summary */}
        <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
            <CardTitle>Grade Statistics</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{grades.length}</div>
                <div className="text-sm text-gray-600">Total Grades</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {Math.round(grades.reduce((acc, grade) => acc + (grade.marks / grade.maxMarks * 100), 0) / grades.length || 0)}%
                </div>
                <div className="text-sm text-gray-600">Average Score</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades List */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-lg">
          <CardTitle>All Grades</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2">Student</th>
                  <th className="text-left py-2">Subject</th>
                  <th className="text-left py-2">Marks</th>
                  <th className="text-left py-2">Grade</th>
                  <th className="text-left py-2">Term</th>
                  <th className="text-left py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {grades.map((grade) => (
                  <tr key={grade.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">
                      <div>
                        <div className="font-medium text-gray-900">{grade.studentName}</div>
                        <div className="text-sm text-gray-500">{grade.studentId}</div>
                      </div>
                    </td>
                    <td className="py-3">{grade.subject}</td>
                    <td className="py-3">{grade.marks}/{grade.maxMarks}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGradeColor(grade.grade)}`}>
                        {grade.grade}
                      </span>
                    </td>
                    <td className="py-3">{grade.term}</td>
                    <td className="py-3">
                      <Button size="sm" variant="destructive" onClick={() => handleDelete(grade.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
