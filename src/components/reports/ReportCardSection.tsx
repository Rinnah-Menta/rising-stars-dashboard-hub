
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { GraduationCap, Download, Printer } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ReportCardGenerator } from './ReportCardGenerator';

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
  const students = [
    { id: 1, name: 'Nakato Sarah', class: 'P.5' },
    { id: 2, name: 'Musoke John', class: 'P.5' },
    { id: 3, name: 'Namubiru Grace', class: 'P.5' },
    { id: 4, name: 'Kasozi David', class: 'P.5' },
    { id: 5, name: 'Nalubega Mary', class: 'P.5' },
  ];

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

  const selectedStudentData = students.find(s => s.id.toString() === selectedStudent);

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
                    {students.map((student) => (
                      <SelectItem key={student.id} value={student.id.toString()}>
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

      {showReportCard && selectedStudentData && (
        <ReportCardGenerator
          student={selectedStudentData}
          term={selectedTerm}
          class={selectedClass}
          onClose={() => setShowReportCard(false)}
        />
      )}
    </div>
  );
};
