
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Download, Printer, Save, Plus, Trash2 } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  registrationNumber: string;
  marks: number;
  grade: string;
  remarks: string;
}

interface MarksheetData {
  schoolName: string;
  schoolAddress: string;
  className: string;
  subject: string;
  term: string;
  year: string;
  teacherName: string;
  students: Student[];
}

interface MarksheetGeneratorProps {
  onBack: () => void;
  onSave: (data: MarksheetData) => void;
  existingReport?: any;
}

export const MarksheetGenerator: React.FC<MarksheetGeneratorProps> = ({
  onBack,
  onSave,
  existingReport
}) => {
  const printRef = useRef<HTMLDivElement>(null);
  
  const [marksheetData, setMarksheetData] = useState<MarksheetData>({
    schoolName: 'Kampala Primary School',
    schoolAddress: 'Plot 123, Kampala Road, Kampala, Uganda',
    className: existingReport?.classId || 'P5A',
    subject: existingReport?.subject || 'Mathematics',
    term: existingReport?.term || 'Term 2',
    year: '2024',
    teacherName: 'Mr. John Mukasa',
    students: [
      {
        id: '1',
        name: 'Nakato Sarah',
        registrationNumber: 'KPS/2024/001',
        marks: 85,
        grade: 'A',
        remarks: 'Excellent performance'
      },
      {
        id: '2',
        name: 'Ssemakula David',
        registrationNumber: 'KPS/2024/002',
        marks: 78,
        grade: 'B+',
        remarks: 'Good work'
      },
      {
        id: '3',
        name: 'Namukasa Grace',
        registrationNumber: 'KPS/2024/003',
        marks: 92,
        grade: 'A',
        remarks: 'Outstanding'
      },
      {
        id: '4',
        name: 'Kato Michael',
        registrationNumber: 'KPS/2024/004',
        marks: 65,
        grade: 'C+',
        remarks: 'Satisfactory'
      },
      {
        id: '5',
        name: 'Namatovu Ruth',
        registrationNumber: 'KPS/2024/005',
        marks: 88,
        grade: 'A',
        remarks: 'Very good'
      }
    ]
  });

  const getGrade = (marks: number): string => {
    if (marks >= 90) return 'A';
    if (marks >= 80) return 'B+';
    if (marks >= 70) return 'B';
    if (marks >= 60) return 'C+';
    if (marks >= 50) return 'C';
    if (marks >= 40) return 'D';
    return 'F';
  };

  const updateStudent = (index: number, field: keyof Student, value: string | number) => {
    const updatedStudents = [...marksheetData.students];
    updatedStudents[index] = {
      ...updatedStudents[index],
      [field]: value
    };
    
    // Auto-calculate grade when marks change
    if (field === 'marks') {
      updatedStudents[index].grade = getGrade(Number(value));
    }
    
    setMarksheetData({
      ...marksheetData,
      students: updatedStudents
    });
  };

  const addStudent = () => {
    const newStudent: Student = {
      id: Date.now().toString(),
      name: '',
      registrationNumber: '',
      marks: 0,
      grade: 'F',
      remarks: ''
    };
    
    setMarksheetData({
      ...marksheetData,
      students: [...marksheetData.students, newStudent]
    });
  };

  const removeStudent = (index: number) => {
    const updatedStudents = marksheetData.students.filter((_, i) => i !== index);
    setMarksheetData({
      ...marksheetData,
      students: updatedStudents
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // In a real application, this would generate a PDF
    console.log('Downloading marksheet as PDF...');
    alert('PDF download functionality would be implemented here');
  };

  const handleSave = () => {
    onSave(marksheetData);
  };

  const calculateStats = () => {
    const marks = marksheetData.students.map(s => s.marks);
    const total = marks.length;
    const passed = marks.filter(m => m >= 50).length;
    const average = marks.reduce((sum, mark) => sum + mark, 0) / total;
    
    return {
      total,
      passed,
      failed: total - passed,
      average: average.toFixed(1),
      highest: Math.max(...marks),
      lowest: Math.min(...marks)
    };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Reports
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
        </div>
      </div>

      {/* Configuration Panel */}
      <Card>
        <CardHeader>
          <CardTitle>Marksheet Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="className">Class</Label>
              <Select 
                value={marksheetData.className} 
                onValueChange={(value) => setMarksheetData({...marksheetData, className: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="P1A">Primary 1A</SelectItem>
                  <SelectItem value="P1B">Primary 1B</SelectItem>
                  <SelectItem value="P2A">Primary 2A</SelectItem>
                  <SelectItem value="P3A">Primary 3A</SelectItem>
                  <SelectItem value="P4A">Primary 4A</SelectItem>
                  <SelectItem value="P5A">Primary 5A</SelectItem>
                  <SelectItem value="P6A">Primary 6A</SelectItem>
                  <SelectItem value="P7A">Primary 7A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Select 
                value={marksheetData.subject} 
                onValueChange={(value) => setMarksheetData({...marksheetData, subject: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="English">English Language</SelectItem>
                  <SelectItem value="Science">Science</SelectItem>
                  <SelectItem value="Social Studies">Social Studies</SelectItem>
                  <SelectItem value="Religious Education">Religious Education</SelectItem>
                  <SelectItem value="Physical Education">Physical Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="term">Term</Label>
              <Select 
                value={marksheetData.term} 
                onValueChange={(value) => setMarksheetData({...marksheetData, term: value})}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Term 1">Term 1</SelectItem>
                  <SelectItem value="Term 2">Term 2</SelectItem>
                  <SelectItem value="Term 3">Term 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Total Students</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">{stats.passed}</div>
            <p className="text-xs text-muted-foreground">Passed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">{stats.failed}</div>
            <p className="text-xs text-muted-foreground">Failed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">{stats.average}%</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-purple-600">{stats.highest}%</div>
            <p className="text-xs text-muted-foreground">Highest</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-orange-600">{stats.lowest}%</div>
            <p className="text-xs text-muted-foreground">Lowest</p>
          </CardContent>
        </Card>
      </div>

      {/* Printable Marksheet */}
      <div ref={printRef} className="print:shadow-none">
        <Card className="relative overflow-hidden">
          {/* Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none z-0">
            <div className="text-9xl font-bold transform rotate-45 text-primary">
              {marksheetData.schoolName.split(' ')[0]}
            </div>
          </div>
          
          <CardContent className="relative z-10 p-8">
            {/* School Header */}
            <div className="text-center mb-8 border-b-2 border-primary pb-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">KPS</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-primary">{marksheetData.schoolName}</h1>
                  <p className="text-muted-foreground">{marksheetData.schoolAddress}</p>
                  <p className="text-sm font-medium mt-1">Phone: +256 700 123 456 | Email: info@kampalaprimary.ac.ug</p>
                </div>
              </div>
              <h2 className="text-xl font-semibold bg-primary text-white px-4 py-2 rounded inline-block">
                ACADEMIC MARKSHEET - {marksheetData.term} {marksheetData.year}
              </h2>
            </div>

            {/* Marksheet Details */}
            <div className="grid grid-cols-2 gap-8 mb-6">
              <div className="space-y-2">
                <p><strong>Class:</strong> {marksheetData.className}</p>
                <p><strong>Subject:</strong> {marksheetData.subject}</p>
                <p><strong>Term:</strong> {marksheetData.term}</p>
              </div>
              <div className="space-y-2">
                <p><strong>Year:</strong> {marksheetData.year}</p>
                <p><strong>Teacher:</strong> {marksheetData.teacherName}</p>
                <p><strong>Date:</strong> {new Date().toLocaleDateString()}</p>
              </div>
            </div>

            {/* Students Table */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Student Results</h3>
                <Button onClick={addStudent} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="bg-primary/10">
                    <TableHead className="font-bold">S/N</TableHead>
                    <TableHead className="font-bold">Student Name</TableHead>
                    <TableHead className="font-bold">Reg. Number</TableHead>
                    <TableHead className="font-bold">Marks (%)</TableHead>
                    <TableHead className="font-bold">Grade</TableHead>
                    <TableHead className="font-bold">Remarks</TableHead>
                    <TableHead className="font-bold print:hidden">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {marksheetData.students.map((student, index) => (
                    <TableRow key={student.id} className="hover:bg-accent/50">
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <Input
                          value={student.name}
                          onChange={(e) => updateStudent(index, 'name', e.target.value)}
                          className="border-0 bg-transparent p-0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={student.registrationNumber}
                          onChange={(e) => updateStudent(index, 'registrationNumber', e.target.value)}
                          className="border-0 bg-transparent p-0"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={student.marks}
                          onChange={(e) => updateStudent(index, 'marks', Number(e.target.value))}
                          className="border-0 bg-transparent p-0 w-20"
                        />
                      </TableCell>
                      <TableCell>
                        <span className={`font-bold ${
                          student.grade === 'A' ? 'text-green-600' :
                          student.grade.startsWith('B') ? 'text-blue-600' :
                          student.grade.startsWith('C') ? 'text-yellow-600' :
                          'text-red-600'
                        }`}>
                          {student.grade}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Input
                          value={student.remarks}
                          onChange={(e) => updateStudent(index, 'remarks', e.target.value)}
                          className="border-0 bg-transparent p-0"
                        />
                      </TableCell>
                      <TableCell className="print:hidden">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStudent(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Summary Section */}
            <div className="mt-8 p-4 bg-accent/20 rounded-lg">
              <h3 className="font-semibold mb-2">Class Summary</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>Total Students: <strong>{stats.total}</strong></div>
                <div>Passed: <strong className="text-green-600">{stats.passed}</strong></div>
                <div>Failed: <strong className="text-red-600">{stats.failed}</strong></div>
                <div>Class Average: <strong>{stats.average}%</strong></div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t">
              <div className="grid grid-cols-3 gap-8 text-center">
                <div>
                  <div className="border-t border-primary mt-12 pt-2">
                    <p className="font-semibold">Class Teacher</p>
                    <p className="text-sm text-muted-foreground">{marksheetData.teacherName}</p>
                  </div>
                </div>
                <div>
                  <div className="border-t border-primary mt-12 pt-2">
                    <p className="font-semibold">Head Teacher</p>
                    <p className="text-sm text-muted-foreground">Mrs. Jane Nakato</p>
                  </div>
                </div>
                <div>
                  <div className="border-t border-primary mt-12 pt-2">
                    <p className="font-semibold">Date</p>
                    <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
