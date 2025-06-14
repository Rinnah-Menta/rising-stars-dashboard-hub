
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { BarChart3, Download, FileBarChart, Clock, BookOpen, Eye, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ReportUpload } from './ReportUpload';

interface ClassReportsSectionProps {
  classReports: any[];
  setClassReports: (reports: any[]) => void;
}

export const ClassReportsSection: React.FC<ClassReportsSectionProps> = ({ classReports, setClassReports }) => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');

  const handleGenerateReport = (type: string) => {
    setSelectedReportType(type);
    setShowUpload(true);
  };

  const handleUpload = (file: File, title: string) => {
    // Store file reference and metadata, but not the actual file content
    const newClassReport = {
      id: Date.now(),
      title: title,
      description: `${selectedReportType} report uploaded`,
      date: new Date().toISOString().split('T')[0],
      type: selectedReportType,
      status: 'Ready',
      iconName: 'FileBarChart',
      category: 'class-report',
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      // Store file as data URL for preview (not ideal for large files in production)
      fileData: file.size < 2 * 1024 * 1024 ? null : null // Only store if < 2MB
    };

    // Create file data URL for smaller files
    if (file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newClassReport.fileData = e.target?.result as string;
        const updatedClassReports = [...classReports, newClassReport];
        setClassReports(updatedClassReports);
        
        // Store metadata only in localStorage
        localStorage.setItem('teacher_class_reports', JSON.stringify(updatedClassReports.map(report => ({
          ...report,
          fileData: report.fileSize < 1024 * 1024 ? report.fileData : null // Only store files < 1MB
        }))));
      };
      reader.readAsDataURL(file);
    } else {
      const updatedClassReports = [...classReports, newClassReport];
      setClassReports(updatedClassReports);
      localStorage.setItem('teacher_class_reports', JSON.stringify(updatedClassReports));
    }

    toast({
      title: "Report Uploaded",
      description: `${title} has been uploaded successfully.`,
    });
  };

  const deleteReport = (reportId: number) => {
    const updatedClassReports = classReports.filter(report => report.id !== reportId);
    setClassReports(updatedClassReports);
    localStorage.setItem('teacher_class_reports', JSON.stringify(updatedClassReports));
    
    toast({
      title: "Report Deleted",
      description: "Report has been removed successfully.",
    });
  };

  const downloadReport = (report: any) => {
    if (report.fileData) {
      // Convert data URL back to blob
      const byteCharacters = atob(report.fileData.split(',')[1]);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: report.fileType });
      
      const element = document.createElement('a');
      element.href = URL.createObjectURL(blob);
      element.download = report.fileName || `${report.title}.pdf`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    } else {
      // Fallback for reports without stored files
      const element = document.createElement('a');
      const file = new Blob([`Report: ${report.title}\nGenerated: ${report.date}\nType: ${report.type}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = `${report.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      URL.revokeObjectURL(element.href);
    }
    
    toast({
      title: "Download Complete",
      description: `${report.title} has been downloaded successfully.`,
    });
  };

  const previewReport = (report: any) => {
    if (report.fileData) {
      const newWindow = window.open();
      if (newWindow) {
        if (report.fileType.includes('pdf')) {
          newWindow.document.write(`<iframe src="${report.fileData}" style="width:100%;height:100%;border:none;"></iframe>`);
        } else {
          newWindow.document.write(`<img src="${report.fileData}" style="max-width:100%;height:auto;" />`);
        }
      }
    } else {
      toast({
        title: "Preview Not Available",
        description: "This report doesn't have a preview available. File may be too large for preview.",
      });
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
          <p className="text-sm text-muted-foreground">Upload performance summaries for your classes</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleGenerateReport('Performance')}>
            Upload Performance Report
          </Button>
          <Button variant="outline" onClick={() => handleGenerateReport('Attendance')}>
            Upload Attendance Report
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
                    <span className="text-xs text-muted-foreground">Uploaded: {new Date(report.date).toLocaleDateString()}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-50 text-purple-600">
                      {report.type}
                    </span>
                    {report.fileSize && (
                      <span className="text-xs text-muted-foreground">
                        {formatFileSize(report.fileSize)}
                      </span>
                    )}
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
                  <div className="flex gap-2">
                    {report.fileData && (
                      <Button variant="outline" size="sm" onClick={() => previewReport(report)}>
                        <Eye className="h-4 w-4 mr-2" />
                        Preview
                      </Button>
                    )}
                    <Button variant="outline" size="sm" onClick={() => downloadReport(report)}>
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => deleteReport(report.id)} className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <ReportUpload
        isOpen={showUpload}
        onClose={() => setShowUpload(false)}
        reportType={selectedReportType}
        onUpload={handleUpload}
      />
    </div>
  );
};
