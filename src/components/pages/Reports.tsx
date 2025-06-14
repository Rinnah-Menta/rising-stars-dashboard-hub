
import React from 'react';
import { useReports } from '@/hooks/useReports';
import { ReportsStatistics } from '@/components/reports/ReportsStatistics';
import { ReportsTabs } from '@/components/reports/ReportsTabs';

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
    getReadyReports,
    getProcessingReports,
    getAvailableTabs,
    profileData
  } = useReports();

  const availableTabs = getAvailableTabs();

  if (availableTabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-muted-foreground">No Reports Available</h2>
          <p className="text-sm text-muted-foreground">You don't have permission to access reports.</p>
        </div>
      </div>
    );
  }

  const totalReports = getTotalReports();
  const readyReports = getReadyReports();
  const processingReports = getProcessingReports();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Generate and manage reports based on your role and responsibilities</p>
        </div>
      </div>

      <ReportsStatistics
        totalReports={totalReports}
        readyReports={readyReports}
        processingReports={processingReports}
      />

      <ReportsTabs
        availableTabs={availableTabs}
        isAdmin={isAdmin}
        isClassTeacher={isClassTeacher}
        isDepartmentHead={isDepartmentHead}
        reportCards={reportCards}
        setReportCards={setReportCards}
        classReports={classReports}
        setClassReports={setClassReports}
        departmentalReports={departmentalReports}
        setDepartmentalReports={setDepartmentalReports}
        departmentName={profileData?.headOfDepartment || profileData?.department || 'Department'}
      />
    </div>
  );
};

export { Reports };
