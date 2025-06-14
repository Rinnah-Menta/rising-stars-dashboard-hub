
import React, { useState, useMemo } from 'react';
import { useReports } from '@/hooks/useReports';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Download, 
  Eye, 
  BarChart3, 
  Users, 
  GraduationCap,
  Clock,
  Building,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';

// Type definitions for better type safety
type Report = {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
};

const Reports = () => {
  const {
    reportCards,
    classReports,
    departmentalReports,
    isAdmin,
    isClassTeacher,
    isDepartmentHead,
    getTotalReports,
    getAvailableTabs,
    profileData,
    isLoading
  } = useReports();

  const availableTabs = getAvailableTabs();
  const [activeTab, setActiveTab] = useState(availableTabs[0]?.value || '');
  const [searchTerm, setSearchTerm] = useState('');

  // Memoized filtered reports for better performance
  const filteredReports = useMemo(() => {
    const reports = 
      activeTab === 'report-cards' ? reportCards :
      activeTab === 'class-reports' ? classReports :
      departmentalReports;

    return reports.filter(report => 
      searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [activeTab, reportCards, classReports, departmentalReports, searchTerm]);

  const getIconForReportType = (type: string) => {
    const icons: Record<string, JSX.Element> = {
      'progressive': <GraduationCap className="h-4 w-4" />,
      'final term': <GraduationCap className="h-4 w-4" />,
      'class performance': <BarChart3 className="h-4 w-4" />,
      'attendance': <Clock className="h-4 w-4" />,
      'staff performance': <Users className="h-4 w-4" />,
      'budget': <Building className="h-4 w-4" />,
      'default': <FileText className="h-4 w-4" />
    };

    return icons[type.toLowerCase()] || icons['default'];
  };

  const ReportCard = ({ report }: { report: Report }) => (
    <Card 
      key={report.id} 
      className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-primary/20 hover:border-l-primary"
      data-testid={`report-card-${report.id}`}
    >
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
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-end space-x-2">
          <Button variant="ghost" size="sm" className="h-8">
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button size="sm" className="h-8">
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const ReportSectionHeader = ({ 
    title, 
    description 
  }: { 
    title: string; 
    description: string 
  }) => (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-[200px] sm:w-[250px]"
          />
        </div>
      </div>
    </div>
  );

  const EmptyState = ({ searchActive }: { searchActive: boolean }) => (
    <Card className="p-12 text-center">
      <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-500 mb-2">
        {searchActive ? 'No Reports Match Your Search' : 'No Reports Available'}
      </h3>
      <p className="text-sm text-gray-400 mb-4">
        {searchActive 
          ? 'Try adjusting your search terms or clear the search to see all reports'
          : 'Reports will appear here when they become available'
        }
      </p>
      {searchActive && (
        <Button variant="outline" onClick={() => setSearchTerm('')}>
          Clear Search
        </Button>
      )}
    </Card>
  );

  const LoadingSkeleton = () => (
    <div className="grid gap-4">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3 flex-1">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <div className="min-w-0 flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <Skeleton className="h-8 w-20 rounded-md" />
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
        </Card>
      ))}
    </div>
  );

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

  const getActiveTabData = () => {
    switch (activeTab) {
      case 'report-cards':
        return {
          title: "Student Report Cards",
          description: "Individual student academic performance reports and progress tracking"
        };
      case 'class-reports':
        return {
          title: "Class Reports",
          description: "Class performance analytics, attendance summaries, and behavioral reports"
        };
      case 'departmental-reports':
        return {
          title: "Departmental Reports",
          description: `${profileData?.headOfDepartment || profileData?.department || 'Department'} analytics, staff performance, and budget reports`
        };
      default:
        return { title: "", description: "" };
    }
  };

  const { title, description } = getActiveTabData();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
              <p className="text-gray-600 mt-2">View and download available reports</p>
            </div>
            
            {/* Simple Statistics */}
            <div className="bg-blue-50 rounded-xl px-6 py-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{getTotalReports()}</div>
              <div className="text-sm text-blue-600/70 font-medium">Available Reports</div>
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

          <TabsContent value={activeTab}>
            <div className="space-y-4">
              <ReportSectionHeader title={title} description={description} />
              
              {isLoading ? (
                <LoadingSkeleton />
              ) : filteredReports.length === 0 ? (
                <EmptyState searchActive={searchTerm.length > 0} />
              ) : (
                <div className="grid gap-4">
                  {filteredReports.map((report) => (
                    <ReportCard key={report.id} report={report} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export { Reports };
