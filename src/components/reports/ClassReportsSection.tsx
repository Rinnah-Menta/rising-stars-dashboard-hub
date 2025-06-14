
import React from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, FileBarChart, Clock, BookOpen } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ClassReportsSectionProps {
  classReports: any[];
  setClassReports: (reports: any[]) => void;
}

export const ClassReportsSection: React.FC<ClassReportsSectionProps> = ({ classReports, setClassReports }) => {
  const generateClassReport = (type: string) => {
    const newClassReport = {
      id: Date.now(),
      title: `${type} Class Report`,
      description: `Generated ${type.toLowerCase()} summary report`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      status: 'Processing',
      iconName: 'FileBarChart',
      category: 'class-report'
    };

    const updatedClassReports = [...classReports, newClassReport];
    setClassReports(updatedClassReports);
    localStorage.setItem('teacher_class_reports', JSON.stringify(updatedClassReports));

    setTimeout(() => {
      const processedClassReports = updatedClassReports.map(report => 
        report.id === newClassReport.id ? { ...report, status: 'Ready' } : report
      );
      setClassReports(processedClassReports);
      localStorage.setItem('teacher_class_reports', JSON.stringify(processedClassReports));
      toast({
        title: "Class Report Generated",
        description: `${type} class report has been generated successfully.`,
      });
    }, 3000);

    toast({
      title: "Class Report Generation Started",
      description: `Generating ${type.toLowerCase()} class report...`,
    });
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

  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: any } = {
      BarChart3,
      FileBarChart,
      Clock,
      BookOpen
    };
    return iconMap[iconName] || FileBarChart;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Class Reports</h2>
          <p className="text-sm text-muted-foreground">Performance summaries for your classes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => generateClassReport('Performance')}>
            Generate Performance
          </Button>
          <Button variant="outline" onClick={() => generateClassReport('Attendance')}>
            Generate Attendance
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {classReports.map((report) => {
          const IconComponent = getIconComponent(report.iconName);
          return (
            <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <IconComponent className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{report.title}</h3>
                  <p className="text-sm text-muted-foreground">{report.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <span className="text-xs text-muted-foreground">Generated: {new Date(report.date).toLocaleDateString()}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 text-purple-600">
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
          );
        })}
      </div>
    </div>
  );
};
