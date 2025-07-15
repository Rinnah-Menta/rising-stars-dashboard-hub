
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  FileText, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Download,
  Clock,
  TrendingUp,
  Shield,
  Settings
} from 'lucide-react';
import { useAdminReports } from '@/hooks/useAdminReports';
import { toast } from '@/hooks/use-toast';

export const AdminControlPanel = () => {
  const { 
    allReports, 
    userActivities, 
    systemStats, 
    isLoading, 
    approveActivity, 
    rejectActivity 
  } = useAdminReports();

  const [selectedTab, setSelectedTab] = useState('overview');

  const handleApprove = (activityId: number) => {
    approveActivity(activityId);
    toast({
      title: "Activity Approved",
      description: "The activity has been approved successfully.",
    });
  };

  const handleReject = (activityId: number) => {
    rejectActivity(activityId);
    toast({
      title: "Activity Rejected",
      description: "The activity has been rejected.",
      variant: "destructive"
    });
  };

  const downloadReport = (report: any) => {
    const element = document.createElement('a');
    const file = new Blob([`Report: ${report.title}\nSource: ${report.source}\nGenerated: ${report.date}`], {type: 'text/plain'});
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'report_upload': return FileText;
      case 'grade_update': return TrendingUp;
      case 'budget_submission': return FileText;
      case 'assignment_creation': return FileText;
      default: return Activity;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50';
      case 'approved': return 'text-green-600 bg-green-50';
      case 'pending_approval': return 'text-yellow-600 bg-yellow-50';
      case 'rejected': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Skeleton Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Skeleton className="h-5 w-5" />
                  <div>
                    <Skeleton className="h-8 w-12 mb-1" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Skeleton Tabs */}
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-32" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Skeleton className="h-5 w-5" />
                    <div>
                      <Skeleton className="h-4 w-32 mb-1" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-16" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* System Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
                <div className="text-sm text-muted-foreground">Total Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-green-600" />
              <div>
                <div className="text-2xl font-bold">{systemStats.activeUsers}</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-600" />
              <div>
                <div className="text-2xl font-bold">{systemStats.totalReports}</div>
                <div className="text-sm text-muted-foreground">Total Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-600" />
              <div>
                <div className="text-2xl font-bold">{systemStats.pendingApprovals}</div>
                <div className="text-sm text-muted-foreground">Pending Approvals</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-600" />
              <div>
                <div className="text-2xl font-bold">{systemStats.systemAlerts}</div>
                <div className="text-sm text-muted-foreground">System Alerts</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Control Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="reports">All Reports</TabsTrigger>
          <TabsTrigger value="activities">User Activities</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent System Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userActivities.slice(0, 5).map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50">
                        <IconComponent className="h-4 w-4 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm font-medium">{activity.action}</div>
                          <div className="text-xs text-muted-foreground">by {activity.user}</div>
                        </div>
                        <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                          {activity.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">User Engagement</span>
                    <span className="text-sm font-medium text-green-600">Excellent</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Performance</span>
                    <span className="text-sm font-medium text-green-600">Optimal</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Data Integrity</span>
                    <span className="text-sm font-medium text-green-600">Secure</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Backup Status</span>
                    <span className="text-sm font-medium text-yellow-600">Scheduled</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All System Reports</CardTitle>
              <p className="text-sm text-muted-foreground">Reports from all users across the system</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {allReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-muted-foreground">
                            Generated: {new Date(report.date).toLocaleDateString()}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {report.source}
                          </Badge>
                          <Badge className="text-xs bg-blue-50 text-blue-600">
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        report.status === 'Ready' ? 'text-green-600 bg-green-50' : 'text-yellow-600 bg-yellow-50'
                      }`}>
                        {report.status}
                      </span>
                      <Button variant="outline" size="sm" onClick={() => downloadReport(report)}>
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Activities & Approvals</CardTitle>
              <p className="text-sm text-muted-foreground">Monitor and approve user actions</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userActivities.map((activity) => {
                  const IconComponent = getActivityIcon(activity.type);
                  return (
                    <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                        <div className="flex-1">
                          <h3 className="font-semibold">{activity.action}</h3>
                          <p className="text-sm text-muted-foreground">by {activity.user}</p>
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(activity.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                          {activity.status.replace('_', ' ')}
                        </Badge>
                        {activity.status === 'pending_approval' && (
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-green-600 hover:text-green-700"
                              onClick={() => handleApprove(activity.id)}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="text-red-600 hover:text-red-700"
                              onClick={() => handleReject(activity.id)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
