
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ReportCard } from "./ReportCard";
import { toast } from "sonner";

interface StudentGrades {
  studentId: string;
  studentName: string;
  class: string;
  section: string;
  rollNumber: string;
  subjects: {
    name: string;
    marks: number;
    maxMarks: number;
    grade: string;
  }[];
  term: string;
  totalMarks: number;
  maxTotalMarks: number;
  percentage: number;
  overallGrade: string;
}

export const ReportCardGenerator = () => {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [reportData, setReportData] = useState<StudentGrades | null>(null);

  // Sample data - in real app, this would come from your grades state
  const sampleGrades: StudentGrades[] = [
    {
      studentId: "STU001",
      studentName: "John Smith",
      class: "10th",
      section: "A",
      rollNumber: "101",
      subjects: [
        { name: "Mathematics", marks: 85, maxMarks: 100, grade: "A" },
        { name: "Science", marks: 92, maxMarks: 100, grade: "A+" },
        { name: "English", marks: 78, maxMarks: 100, grade: "B+" },
        { name: "History", marks: 80, maxMarks: 100, grade: "A" },
        { name: "Geography", marks: 88, maxMarks: 100, grade: "A" }
      ],
      term: "Term 1",
      totalMarks: 423,
      maxTotalMarks: 500,
      percentage: 84.6,
      overallGrade: "A"
    },
    {
      studentId: "STU002",
      studentName: "Emma Johnson",
      class: "10th",
      section: "A",
      rollNumber: "102",
      subjects: [
        { name: "Mathematics", marks: 78, maxMarks: 100, grade: "B+" },
        { name: "Science", marks: 85, maxMarks: 100, grade: "A" },
        { name: "English", marks: 90, maxMarks: 100, grade: "A+" },
        { name: "History", marks: 82, maxMarks: 100, grade: "A" },
        { name: "Geography", marks: 75, maxMarks: 100, grade: "B+" }
      ],
      term: "Term 1",
      totalMarks: 410,
      maxTotalMarks: 500,
      percentage: 82.0,
      overallGrade: "A"
    }
  ];

  const students = ["STU001 - John Smith", "STU002 - Emma Johnson"];
  const terms = ["Term 1", "Term 2", "Final"];

  const generateReportCard = () => {
    if (!selectedStudent || !selectedTerm) {
      toast("Please select both student and term");
      return;
    }

    const studentId = selectedStudent.split(" - ")[0];
    const studentData = sampleGrades.find(
      grade => grade.studentId === studentId && grade.term === selectedTerm
    );

    if (studentData) {
      setReportData(studentData);
      toast("Report card generated successfully!");
    } else {
      toast("No grades found for selected student and term");
    }
  };

  const printReportCard = () => {
    window.print();
  };

  const downloadReportCard = () => {
    // In a real app, you would generate and download a PDF
    toast("PDF download feature would be implemented here");
  };

  return (
    <div className="space-y-6">
      {/* Report Generation Controls */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-lg">
          <CardTitle>Generate Report Card</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="student">Select Student</Label>
              <Select onValueChange={setSelectedStudent}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose student" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
                    <SelectItem key={student} value={student}>{student}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="term">Select Term</Label>
              <Select onValueChange={setSelectedTerm}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Choose term" />
                </SelectTrigger>
                <SelectContent>
                  {terms.map((term) => (
                    <SelectItem key={term} value={term}>{term}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button 
                onClick={generateReportCard}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Generate Report
              </Button>
            </div>
          </div>

          {reportData && (
            <div className="mt-6 flex space-x-4">
              <Button onClick={printReportCard} variant="outline" className="flex-1">
                Print Report Card
              </Button>
              <Button onClick={downloadReportCard} variant="outline" className="flex-1">
                Download PDF
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Generated Report Card */}
      {reportData && <ReportCard data={reportData} />}
    </div>
  );
};
