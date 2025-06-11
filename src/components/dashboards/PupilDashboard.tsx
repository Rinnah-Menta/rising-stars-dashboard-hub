
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { BookOpen, Calendar, Users, Award, LogOut, Bell } from 'lucide-react';

const PupilDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-blue-900">Rising Stars Junior School</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
              <span className="text-lg">{user?.avatar}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Student Dashboard</h2>
          <p className="text-gray-600">Class: {user?.class}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Quick Stats */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Award className="h-5 w-5" />
                <span>Overall Grade</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">A-</div>
              <p className="text-blue-100">Great progress!</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Subjects</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
              <p className="text-orange-100">Active subjects</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Attendance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">95%</div>
              <p className="text-green-100">This month</p>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Science Fair Next Week</h4>
                <p className="text-gray-600 text-sm">Don't forget to prepare your project for the annual science fair!</p>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Parent-Teacher Conference</h4>
                <p className="text-gray-600 text-sm">Meetings scheduled for next Friday. Check with your parents!</p>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Classes */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-2 bg-blue-50 rounded">
                <span className="font-medium">Mathematics</span>
                <span className="text-sm text-gray-600">9:00 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-orange-50 rounded">
                <span className="font-medium">Science</span>
                <span className="text-sm text-gray-600">10:30 AM</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                <span className="font-medium">English</span>
                <span className="text-sm text-gray-600">1:00 PM</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Grades */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Grades</CardTitle>
              <CardDescription>Your latest assessment results</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Mathematics Test</h4>
                  <div className="text-2xl font-bold text-green-600">A</div>
                  <p className="text-sm text-gray-600">Excellent work on fractions!</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Science Project</h4>
                  <div className="text-2xl font-bold text-blue-600">B+</div>
                  <p className="text-sm text-gray-600">Creative volcano model</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">English Essay</h4>
                  <div className="text-2xl font-bold text-orange-600">A-</div>
                  <p className="text-sm text-gray-600">Great storytelling skills</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PupilDashboard;
