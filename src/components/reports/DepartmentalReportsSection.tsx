
import React from 'react';
import { Button } from '@/components/ui/button';
import { Building, Download, FileBarChart, Users, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

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
  const generateDepartmentalReport = (type: string) => {
    const newDepartmentalReport = {
      id: Date.now(),
      title: `${departmentName} ${type} Report`,
      description: `Generated ${type.toLowerCase()} report for ${departmentName}`,
      date: new Date().toISOString().split('T')[0],
      type: type,
      status: 'Processing',
      iconName: 'Building',
      category: 'departmental-report'
    };

    const updatedDepartmentalReports = [...departmentalReports, newDepartmentalReport];
    setDepartmentalReports(updatedDepartmentalReports);
    localStorage.setItem('departmental_reports', JSON.stringify(updatedDepartmentalReports));

    setTimeout(() => {
      const processedDepartmentalReports = updatedDepartmentalReports.map(report => 
        report.id === newDepartmentalReport.id ? { ...report, status: 'Ready' } : report
      );
      setDepartmentalReports(processedDepartmentalReports);
      localStorage.setItem('departmental_reports', JSON.stringify(processedDepartmentalReports));
      toast({
        title: "Departmental Report Generated",
        description: `${type} departmental report has been generated successfully.`,
      });
    }, 3000);

    toast({
      title: "Departmental Report Generation Started",
      description: `Generating ${type.toLowerCase()} departmental report...`,
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
          <p className="text-sm text-muted-foreground">Reports for {departmentName} department</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => generateDepartmentalReport('Staff Performance')}>
            Generate Staff Report
          </Button>
          <Button variant="outline" onClick={() => generateDepartmentalReport('Budget')}>
            Generate Budget Report
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
                    <span className="text-xs text-muted-foreground">Generated: {new Date(report.date).toLocaleDateString()}</span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-50 text-orange-600">
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
