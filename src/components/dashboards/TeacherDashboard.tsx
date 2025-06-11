
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, Calendar, ClipboardList, LogOut, Bell } from 'lucide-react';

const TeacherDashboard = () => {
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
          <h2 className="text-3xl font-bold text-gray-900">Teacher Dashboard</h2>
          <p className="text-gray-600">Subject: {user?.subject} | Department: {user?.department}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Quick Stats */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>My Students</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <p className="text-blue-100">Active students</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Classes</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-orange-100">This week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ClipboardList className="h-5 w-5" />
                <span>Assignments</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-green-100">To grade</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5" />
                <span>Events</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3</div>
              <p className="text-purple-100">This month</p>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Grade 5A - Mathematics</h4>
                  <p className="text-sm text-gray-600">Classroom 201</p>
                </div>
                <span className="text-sm font-medium">9:00 - 10:00</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Grade 4B - Mathematics</h4>
                  <p className="text-sm text-gray-600">Classroom 201</p>
                </div>
                <span className="text-sm font-medium">10:30 - 11:30</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Grade 6A - Mathematics</h4>
                  <p className="text-sm text-gray-600">Classroom 201</p>
                </div>
                <span className="text-sm font-medium">1:00 - 2:00</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent Announcements */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>School Announcements</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">Staff Meeting Tomorrow</h4>
                <p className="text-gray-600 text-sm">Department meeting at 3:30 PM in the main conference room</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Science Fair Preparation</h4>
                <p className="text-gray-600 text-sm">Reminder to help students with their science fair projects</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Student Performance Overview */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Class Performance Overview</CardTitle>
              <CardDescription>Average grades by class</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Grade 5A</h4>
                  <div className="text-2xl font-bold text-green-600">B+</div>
                  <p className="text-sm text-gray-600">28 students • 85% avg</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Grade 4B</h4>
                  <div className="text-2xl font-bold text-blue-600">B</div>
                  <p className="text-sm text-gray-600">26 students • 80% avg</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{width: '80%'}}></div>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Grade 6A</h4>
                  <div className="text-2xl font-bold text-orange-600">A-</div>
                  <p className="text-sm text-gray-600">24 students • 88% avg</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div className="bg-orange-600 h-2 rounded-full" style={{width: '88%'}}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TeacherDashboard;
