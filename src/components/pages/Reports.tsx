
import React, { useState } from 'react';
import { useReports } from '@/hooks/useReports';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Eye, 
  Plus, 
  BarChart3, 
  Users, 
  GraduationCap,
  TrendingUp,
  Clock,
  Building
} from 'lucide-react';

const Reports = () => {
  const {
    reportCards,
    classReports,
    departmentalReports,
    isAdmin,
    isClassTeacher,
    isDepartmentHead,
    getTotalReports,
    getReadyReports,
    getProcessingReports,
    getAvailableTabs,
    profileData
  } = useReports();

  const availableTabs = getAvailableTabs();
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.value || '');

  if (availableTabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-muted-foreground">No Reports Available</h2>
          <p className="text-sm text-muted-foreground">You don't have permission to access reports.</p>
        </div>
      </div>
    );
  }

  const getIconForReportType = (type: string) => {
    switch (type.toLowerCase()) {
      case 'progressive':
      case 'final term':
        return <GraduationCap className="h-5 w-5" />;
      case 'class performance':
        return <BarChart3 className="h-5 w-5" />;
      case 'attendance':
        return <Clock className="h-5 w-5" />;
      case 'staff performance':
        return <Users className="h-5 w-5" />;
      case 'budget':
        return <Building className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const renderReportCard = (report: any) => (
    <Card key={report.id} className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              {getIconForReportType(report.type)}
            </div>
            <div>
              <CardTitle className="text-base">{report.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
            </div>
          </div>
          <Badge variant={report.status === 'Ready' ? 'default' : 'secondary'}>
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>{new Date(report.date).toLocaleDateString()}</span>
            <Badge variant="outline">{report.type}</Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Preview
            </Button>
            {report.status === 'Ready' && (
              <Button size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports Dashboard</h1>
            <p className="text-gray-600 mt-1">Generate and manage your reports efficiently</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getTotalReports()}</div>
              <div className="text-xs text-gray-500">Total Reports</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getReadyReports()}</div>
              <div className="text-xs text-gray-500">Ready</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{getProcessingReports()}</div>
              <div className="text-xs text-gray-500">Processing</div>
            </div>
          </div>
        </div>
      </div>

      {/* Report Sections */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
          {availableTabs.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center space-x-2">
              <span>{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Report Cards Tab */}
        {isAdmin && (
          <TabsContent value="report-cards" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Student Report Cards</h2>
                <p className="text-sm text-muted-foreground">Individual student academic performance reports</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>
            <div className="grid gap-4">
              {reportCards.map(renderReportCard)}
            </div>
          </TabsContent>
        )}

        {/* Class Reports Tab */}
        {isClassTeacher && (
          <TabsContent value="class-reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Class Reports</h2>
                <p className="text-sm text-muted-foreground">Class performance and attendance reports</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>
            <div className="grid gap-4">
              {classReports.map(renderReportCard)}
            </div>
          </TabsContent>
        )}

        {/* Departmental Reports Tab */}
        {isDepartmentHead && (
          <TabsContent value="departmental-reports" className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Departmental Reports</h2>
                <p className="text-sm text-muted-foreground">
                  {profileData?.headOfDepartment || profileData?.department || 'Department'} reports and analytics
                </p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Generate New Report
              </Button>
            </div>
            <div className="grid gap-4">
              {departmentalReports.map(renderReportCard)}
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export { Reports };
