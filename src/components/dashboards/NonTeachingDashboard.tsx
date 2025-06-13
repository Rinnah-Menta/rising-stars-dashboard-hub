import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Wrench, Calendar, CheckCircle, AlertCircle, LogOut, Bell } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';

const NonTeachingDashboard = () => {
  const { user, logout } = useAuth();
  const { profileData } = useProfile();
  
  const getTitle = () => {
    if (!profileData?.title) return '';
    return profileData.title;
  };

  const getLastName = () => {
    return profileData?.lastName || '';
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <AnimatedInView>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome back, {getTitle()} {getLastName()}!</h1>
          <p className="text-blue-100 mt-2">Here are your tasks and updates for today.</p>
        </div>
      </AnimatedInView>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Quick Stats */}
        <AnimatedInView>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5" />
                <span>Tasks Done</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15</div>
              <p className="text-blue-100">This week</p>
            </CardContent>
          </Card>
        </AnimatedInView>

        <AnimatedInView>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5" />
                <span>Pending</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-orange-100">High priority</p>
            </CardContent>
          </Card>
        </AnimatedInView>

        <AnimatedInView>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Wrench className="h-5 w-5" />
                <span>Work Orders</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-green-100">Active</p>
            </CardContent>
          </Card>
        </AnimatedInView>

        <AnimatedInView>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Scheduled</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-purple-100">This week</p>
            </CardContent>
          </Card>
        </AnimatedInView>

          {/* Today's Tasks */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today's Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 border-l-4 border-red-400 rounded">
                <div>
                  <h4 className="font-semibold text-red-800">Fix Classroom AC</h4>
                  <p className="text-sm text-red-600">Room 205 - High Priority</p>
                </div>
                <span className="text-sm font-medium text-red-700">Urgent</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                <div>
                  <h4 className="font-semibold text-yellow-800">Clean Library</h4>
                  <p className="text-sm text-yellow-600">Weekly maintenance</p>
                </div>
                <span className="text-sm font-medium text-yellow-700">Medium</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 border-l-4 border-green-400 rounded">
                <div>
                  <h4 className="font-semibold text-green-800">Garden Maintenance</h4>
                  <p className="text-sm text-green-600">Trim hedges and water plants</p>
                </div>
                <span className="text-sm font-medium text-green-700">Low</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>

          {/* Announcements */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Staff Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Safety Training Session</h4>
                <p className="text-gray-600 text-sm">Mandatory safety training this Friday at 2 PM</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">New Equipment Arrival</h4>
                <p className="text-gray-600 text-sm">New cleaning supplies delivered to storage room</p>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>

          {/* Work Order Status */}
        <AnimatedInView className="lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Work Orders</CardTitle>
              <CardDescription>Status of maintenance and facility requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Playground Equipment</h4>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Completed</span>
                  </div>
                  <p className="text-sm text-gray-600">Safety inspection and repairs</p>
                  <p className="text-xs text-gray-500 mt-2">Completed yesterday</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Cafeteria Lights</h4>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">In Progress</span>
                  </div>
                  <p className="text-sm text-gray-600">Replace flickering fluorescent bulbs</p>
                  <p className="text-xs text-gray-500 mt-2">Started today</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">Roof Leak</h4>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600">Water damage in east wing</p>
                  <p className="text-xs text-gray-500 mt-2">Reported 2 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>
        </div>
    </div>
  );
};

export default NonTeachingDashboard;
