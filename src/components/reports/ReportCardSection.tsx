
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Download, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ProfessionalReportCard } from './ProfessionalReportCard';

interface ReportCardSectionProps {
  reportCards: any[];
  setReportCards: (reports: any[]) => void;
}

export const ReportCardSection: React.FC<ReportCardSectionProps> = ({ reportCards, setReportCards }) => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showReportCard, setShowReportCard] = useState(false);

  const classes = ['P.1', 'P.2', 'P.3', 'P.4', 'P.5', 'P.6', 'P.7'];
  const terms = ['Term 1 - 2024', 'Term 2 - 2024', 'Term 3 - 2024'];
  
  // Sample data that matches the ProfessionalReportCard interface
  const sampleData = {
    students: [
      { 
        id: "1", 
        name: 'Nakato Sarah', 
        class: 'P.5',
        dob: "2010-05-15",
        admissionNumber: "ADM2023001",
        rollNumber: "101",
        section: "A",
        houseColor: "Blue",
        fatherName: "Robert Nakato",
        motherName: "Mary Nakato", 
        address: "123 Main Street, Kampala",
        phoneNumber: "+256 701 234 567"
      },
      { 
        id: "2", 
        name: 'Musoke John', 
        class: 'P.5',
        dob: "2010-03-20",
        admissionNumber: "ADM2023002", 
        rollNumber: "102",
        section: "A",
        houseColor: "Red",
        fatherName: "James Musoke",
        motherName: "Sarah Musoke",
        address: "456 Oak Avenue, Kampala", 
        phoneNumber: "+256 702 345 678"
      },
      { 
        id: "3", 
        name: 'Namubiru Grace', 
        class: 'P.5',
        dob: "2010-07-10",
        admissionNumber: "ADM2023003",
        rollNumber: "103", 
        section: "A",
        houseColor: "Green",
        fatherName: "Michael Namubiru",
        motherName: "Linda Namubiru",
        address: "789 Pine Road, Kampala",
        phoneNumber: "+256 703 456 789"
      },
      { 
        id: "4", 
        name: 'Kasozi David', 
        class: 'P.5',
        dob: "2010-01-25",
        admissionNumber: "ADM2023004",
        rollNumber: "104",
        section: "A", 
        houseColor: "Yellow",
        fatherName: "Peter Kasozi",
        motherName: "Jane Kasozi",
        address: "321 Cedar Street, Kampala",
        phoneNumber: "+256 704 567 890"
      },
      { 
        id: "5", 
        name: 'Nalubega Mary', 
        class: 'P.5',
        dob: "2010-09-12",
        admissionNumber: "ADM2023005",
        rollNumber: "105",
        section: "A",
        houseColor: "Purple", 
        fatherName: "Andrew Nalubega",
        motherName: "Rose Nalubega",
        address: "654 Birch Lane, Kampala",
        phoneNumber: "+256 705 678 901"
      },
    ],
    grades: [
      // Sample grades for student 1 (Nakato Sarah)
      { id: 1, student_id: "1", subject: "Mathematics", grade: 85, teacher: "Mr. Brown", comment: "Shows strong analytical skills.", attendance: 95, practicalMarks: 40, theoryMarks: 45, totalMarks: 85, maxMarks: 100 },
      { id: 2, student_id: "1", subject: "English Language", grade: 90, teacher: "Ms. Green", comment: "Excellent writing abilities.", attendance: 92, practicalMarks: 45, theoryMarks: 45, totalMarks: 90, maxMarks: 100 },
      { id: 3, student_id: "1", subject: "Science", grade: 78, teacher: "Dr. Wilson", comment: "Good understanding of concepts.", attendance: 88, practicalMarks: 35, theoryMarks: 43, totalMarks: 78, maxMarks: 100 },
      { id: 4, student_id: "1", subject: "Social Studies", grade: 82, teacher: "Mrs. Davis", comment: "Excellent research skills.", attendance: 90, practicalMarks: 38, theoryMarks: 44, totalMarks: 82, maxMarks: 100 },
      // Sample grades for other students
      { id: 5, student_id: "2", subject: "Mathematics", grade: 75, teacher: "Mr. Brown", comment: "Needs more practice.", attendance: 88, practicalMarks: 35, theoryMarks: 40, totalMarks: 75, maxMarks: 100 },
      { id: 6, student_id: "2", subject: "English Language", grade: 80, teacher: "Ms. Green", comment: "Good progress.", attendance: 90, practicalMarks: 38, theoryMarks: 42, totalMarks: 80, maxMarks: 100 },
    ]
  };

  const handleGenerateReportCard = () => {
    if (!selectedClass || !selectedTerm || !selectedStudent) {
      toast({
        title: "Missing Information",
        description: "Please select class, term, and student to generate report card.",
        variant: "destructive"
      });
      return;
    }
    setShowReportCard(true);
  };

  const downloadReport = (report: any) => {
    const element = document.createElement('a');
    const file = new Blob([`Report: ${report.title}\nGenerated: ${report.date}\nType: ${report.type}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${report.title.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    
    toast({
      title: "Download Complete",
      description: `${report.title} has been downloaded successfully.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Student Report Cards</h2>
          <p className="text-sm text-muted-foreground">Individual student academic performance reports</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <GraduationCap className="h-4 w-4 mr-2" />
              Generate Report Card
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Generate Student Report Card</DialogTitle>
              <DialogDescription>
                Select a student to generate their academic performance report card.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Select Class</label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Select Term</label>
                <Select value={selectedTerm} onValueChange={setSelectedTerm}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose term" />
                  </SelectTrigger>
                  <SelectContent>
                    {terms.map((term) => (
                      <SelectItem key={term} value={term}>{term}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Select Student</label>
                <Select value={selectedStudent} onValueChange={setSelectedStudent}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose student" />
                  </SelectTrigger>
                  <SelectContent>
                    {sampleData.students.map((student) => (
                      <SelectItem key={student.id} value={student.id}>
                        {student.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleGenerateReportCard} className="w-full">
                <Printer className="h-4 w-4 mr-2" />
                Generate Report Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="space-y-4">
        {reportCards.map((report) => (
          <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.description}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-xs text-muted-foreground">Generated: {new Date(report.date).toLocaleDateString()}</span>
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                    {report.type}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                report.status === 'Ready' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
              }`}>
                {report.status}
              </span>
              {report.status === 'Ready' && (
                <Button variant="outline" size="sm" onClick={() => downloadReport(report)}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {showReportCard && selectedStudent && (
        <div className="mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Generated Report Card</h3>
            <Button 
              variant="outline" 
              onClick={() => setShowReportCard(false)}
            >
              Close
            </Button>
          </div>
          <ProfessionalReportCard 
            data={sampleData} 
            studentId={selectedStudent}
          />
        </div>
      )}
    </div>
  );
};
