
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ReportCardSection } from './ReportCardSection';
import { ClassReportsSection } from './ClassReportsSection';
import { DepartmentalReportsSection } from './DepartmentalReportsSection';

interface ReportsTabsProps {
  availableTabs: Array<{ value: string; label: string }>;
  isAdmin: boolean;
  isClassTeacher: boolean;
  isDepartmentHead: boolean;
  reportCards: any[];
  setReportCards: (reports: any[]) => void;
  classReports: any[];
  setClassReports: (reports: any[]) => void;
  departmentalReports: any[];
  setDepartmentalReports: (reports: any[]) => void;
  departmentName?: string;
}

export const ReportsTabs: React.FC<ReportsTabsProps> = ({
  availableTabs,
  isAdmin,
  isClassTeacher,
  isDepartmentHead,
  reportCards,
  setReportCards,
  classReports,
  setClassReports,
  departmentalReports,
  setDepartmentalReports,
  departmentName
}) => {
  return (
    <Tabs defaultValue={availableTabs[0]?.value} className="space-y-6">
      <TabsList className={`grid w-full grid-cols-${availableTabs.length}`}>
        {availableTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

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
            departmentName={departmentName}
          />
        </TabsContent>
      )}
    </Tabs>
  );
};
