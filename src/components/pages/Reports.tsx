
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
  Building,
  Filter,
  Search
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
  const [searchTerm, setSearchTerm] = useState('');

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
        return <GraduationCap className="h-4 w-4" />;
      case 'class performance':
        return <BarChart3 className="h-4 w-4" />;
      case 'attendance':
        return <Clock className="h-4 w-4" />;
      case 'staff performance':
        return <Users className="h-4 w-4" />;
      case 'budget':
        return <Building className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderReportCard = (report: any) => (
    <Card key={report.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3 flex-1">
            <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
              {getIconForReportType(report.type)}
            </div>
            <div className="min-w-0 flex-1">
              <CardTitle className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                {report.title}
              </CardTitle>
              <p className="text-xs text-gray-500 mt-1 line-clamp-2">{report.description}</p>
              <div className="flex items-center space-x-3 mt-2">
                <Badge variant="outline" className="text-xs">
                  {getIconForReportType(report.type)}
                  <span className="ml-1">{report.type}</span>
                </Badge>
                <span className="text-xs text-gray-400">
                  {new Date(report.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <Badge 
            variant={report.status === 'Ready' ? 'default' : 'secondary'}
            className="shrink-0"
          >
            {report.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="sm" className="h-8">
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          {report.status === 'Ready' && (
            <Button size="sm" className="h-8">
              <Download className="h-3 w-3 mr-1" />
              Download
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const renderReportSection = (reports: any[], title: string, description: string) => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Report
          </Button>
        </div>
      </div>
      
      {reports.length === 0 ? (
        <Card className="p-12 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-500 mb-2">No Reports Found</h3>
          <p className="text-sm text-gray-400 mb-4">Get started by creating your first report</p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Report
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4">
          {reports
            .filter(report => 
              searchTerm === '' || 
              report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              report.type.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(renderReportCard)}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
              <p className="text-gray-600 mt-2">Manage and generate reports efficiently</p>
            </div>
            
            {/* Statistics Cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 rounded-xl px-4 py-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold text-blue-600">{getTotalReports()}</div>
                <div className="text-xs text-blue-600/70 font-medium">Total</div>
              </div>
              <div className="bg-green-50 rounded-xl px-4 py-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold text-green-600">{getReadyReports()}</div>
                <div className="text-xs text-green-600/70 font-medium">Ready</div>
              </div>
              <div className="bg-orange-50 rounded-xl px-4 py-3 text-center min-w-[100px]">
                <div className="text-2xl font-bold text-orange-600">{getProcessingReports()}</div>
                <div className="text-xs text-orange-600/70 font-medium">Processing</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-md mx-auto" style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}>
            {availableTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} className="flex items-center justify-center px-4">
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Report Cards Tab */}
          {isAdmin && (
            <TabsContent value="report-cards">
              {renderReportSection(
                reportCards,
                "Student Report Cards",
                "Individual student academic performance reports and progress tracking"
              )}
            </TabsContent>
          )}

          {/* Class Reports Tab */}
          {isClassTeacher && (
            <TabsContent value="class-reports">
              {renderReportSection(
                classReports,
                "Class Reports",
                "Class performance analytics, attendance summaries, and behavioral reports"
              )}
            </TabsContent>
          )}

          {/* Departmental Reports Tab */}
          {isDepartmentHead && (
            <TabsContent value="departmental-reports">
              {renderReportSection(
                departmentalReports,
                "Departmental Reports",
                `${profileData?.headOfDepartment || profileData?.department || 'Department'} analytics, staff performance, and budget reports`
              )}
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export { Reports };
