
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Building, Download, FileBarChart, Users, TrendingUp, Eye, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { ReportUpload } from './ReportUpload';

interface DepartmentalReportsSectionProps {
  departmentalReports: any[];
  setDepartmentalReports: (reports: any[]) => void;
  departmentName?: string;
}

export const DepartmentalReportsSection: React.FC<DepartmentalReportsSectionProps> = ({ 
  departmentalReports, 
  setDepartmentalReports,
  departmentName = 'Department'
}) => {
  const [showUpload, setShowUpload] = useState(false);
  const [selectedReportType, setSelectedReportType] = useState('');

  const handleGenerateReport = (type: string) => {
    setSelectedReportType(type);
    setShowUpload(true);
  };

  const handleUpload = (file: File, title: string) => {
    const newDepartmentalReport = {
      id: Date.now(),
      title: title,
      description: `${selectedReportType} report for ${departmentName}`,
      date: new Date().toISOString().split('T')[0],
      type: selectedReportType,
      status: 'Ready',
      iconName: 'Building',
      category: 'departmental-report',
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      fileData: file.size < 2 * 1024 * 1024 ? null : null
    };

    if (file.size < 2 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newDepartmentalReport.fileData = e.target?.result as string;
        const updatedDepartmentalReports = [...departmentalReports, newDepartmentalReport];
        setDepartmentalReports(updatedDepartmentalReports);
        
        localStorage.setItem('departmental_reports', JSON.stringify(updatedDepartmentalReports.map(report => ({
          ...report,
          fileData: report.fileSize < 1024 * 1024 ? report.fileData : null
        }))));
      };
      reader.readAsDataURL(file);
    } else {
      const updatedDepartmentalReports = [...departmentalReports, newDepartmentalReport];
      setDepartmentalReports(updatedDepartmentalReports);
      localStorage.setItem('departmental_reports', JSON.stringify(updatedDepartmentalReports));
    }

    toast({
      title: "Departmental Report Uploaded",
      description: `${title} has been uploaded successfully.`,
    });
  };

  const deleteReport = (reportId: number) => {
    const updatedDepartmentalReports = departmentalReports.filter(report => report.id !== reportId);
    setDepartmentalReports(updatedDepartmentalReports);
    localStorage.setItem('departmental_reports', JSON.stringify(updatedDepartmentalReports));
    
    toast({
      title: "Report Deleted",
      description: "Departmental report has been removed successfully.",
    });
  };

  const downloadReport = (report: any) => {
    if (report.fileData) {
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
      Building,
      FileBarChart,
      Users,
      TrendingUp
    };
    return iconMap[iconName] || Building;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Departmental Reports</h2>
          <p className="text-sm text-muted-foreground">Upload reports for {departmentName} department</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleGenerateReport('Staff Performance')}>
            Upload Staff Report
          </Button>
          <Button variant="outline" onClick={() => handleGenerateReport('Budget')}>
            Upload Budget Report
          </Button>
        </div>
      </div>
      
      <div className="space-y-4">
        {departmentalReports.map((report) => {
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
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600">
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
