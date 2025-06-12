
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Download, TrendingUp, Users, BookOpen, Clock } from 'lucide-react';

export const Reports = () => {
  const { user } = useAuth();

  const reports = [
    {
      id: 1,
      title: 'Academic Performance Report',
      description: 'Detailed analysis of student academic performance for Term 2',
      date: '2024-06-10',
      type: 'Academic',
      status: 'Ready',
      icon: TrendingUp
    },
    {
      id: 2,
      title: 'Attendance Report',
      description: 'Student attendance summary for the current term',
      date: '2024-06-08',
      type: 'Attendance',
      status: 'Ready',
      icon: Clock
    },
    {
      id: 3,
      title: 'Fee Collection Report',
      description: 'Overview of fee payments and outstanding balances',
      date: '2024-06-05',
      type: 'Financial',
      status: 'Ready',
      icon: FileText
    },
    {
      id: 4,
      title: 'Class Performance Analysis',
      description: 'Comparative analysis of class performance across subjects',
      date: '2024-06-03',
      type: 'Academic',
      status: 'Processing',
      icon: BookOpen
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready': return 'text-green-600 bg-green-50';
      case 'Processing': return 'text-yellow-600 bg-yellow-50';
      case 'Error': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold">Reports & Analytics</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Generate New Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">Total Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-gray-600">Ready Reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">3</div>
            <p className="text-xs text-gray-600">Processing</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">245</div>
            <p className="text-xs text-gray-600">Downloads This Month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Available Reports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reports.map((report) => {
              const IconComponent = report.icon;
              return (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <IconComponent className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{report.title}</h3>
                      <p className="text-sm text-gray-600">{report.description}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-xs text-gray-500">Generated: {new Date(report.date).toLocaleDateString()}</span>
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-50 text-blue-600">{report.type}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    {report.status === 'Ready' && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
