
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
  BarChart3, 
  Users, 
  GraduationCap,
  Clock,
  Building,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { ReportCardSection } from '@/components/reports/ReportCardSection';
import { ClassReportsSection } from '@/components/reports/ClassReportsSection';
import { DepartmentalReportsSection } from '@/components/reports/DepartmentalReportsSection';

const Reports = () => {
  const {
    reportCards,
    setReportCards,
    classReports,
    setClassReports,
    departmentalReports,
    setDepartmentalReports,
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Modern Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports Dashboard</h1>
              <p className="text-gray-600 mt-2">View, upload and download reports</p>
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

          {isLoading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {isAdmin && (
                <TabsContent value="report-cards" className="space-y-4">
                  <ReportCardSection 
                    reportCards={reportCards} 
                    setReportCards={setReportCards} 
                  />
                </TabsContent>
              )}

              {isClassTeacher && (
                <TabsContent value="class-reports" className="space-y-4">
                  <ClassReportsSection 
                    classReports={classReports} 
                    setClassReports={setClassReports} 
                  />
                </TabsContent>
              )}

              {isDepartmentHead && (
                <TabsContent value="departmental-reports" className="space-y-4">
                  <DepartmentalReportsSection 
                    departmentalReports={departmentalReports} 
                    setDepartmentalReports={setDepartmentalReports}
                    departmentName={profileData?.headOfDepartment || profileData?.department || 'Department'}
                  />
                </TabsContent>
              )}
            </>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export { Reports };
