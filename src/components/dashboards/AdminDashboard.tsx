
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Users, BookOpen, TrendingUp, DollarSign, LogOut, Bell, School } from 'lucide-react';

const AdminDashboard = () => {
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
          <h2 className="text-3xl font-bold text-gray-900">Administrator Dashboard</h2>
          <p className="text-gray-600">Department: {user?.department}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Key Metrics */}
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Total Students</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">342</div>
              <p className="text-blue-100">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <School className="h-5 w-5" />
                <span>Staff Members</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45</div>
              <p className="text-orange-100">Teaching & Non-teaching</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Avg Performance</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87%</div>
              <p className="text-green-100">School average</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <DollarSign className="h-5 w-5" />
                <span>Revenue</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$85K</div>
              <p className="text-purple-100">This month</p>
            </CardContent>
          </Card>

          {/* School Overview */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>School Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-blue-900">Classes</h4>
                  <div className="text-2xl font-bold text-blue-600">18</div>
                  <p className="text-sm text-blue-600">Active classes</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <h4 className="font-semibold text-orange-900">Subjects</h4>
                  <div className="text-2xl font-bold text-orange-600">12</div>
                  <p className="text-sm text-orange-600">Core subjects</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <h4 className="font-semibold text-green-900">Attendance</h4>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <p className="text-sm text-green-600">Average rate</p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-900">Events</h4>
                  <div className="text-2xl font-bold text-purple-600">8</div>
                  <p className="text-sm text-purple-600">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activities */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="h-5 w-5" />
                <span>Recent Activities</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-semibold">New Student Enrollment</h4>
                <p className="text-gray-600 text-sm">5 new students enrolled in Grade 3</p>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Staff Meeting Completed</h4>
                <p className="text-gray-600 text-sm">Monthly department meeting concluded</p>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-semibold">Budget Approval</h4>
                <p className="text-gray-600 text-sm">Q2 budget approved by board</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
            </CardContent>
          </Card>

          {/* Grade Distribution */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Grade Distribution</CardTitle>
              <CardDescription>Overall school performance by grade</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Grade A</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{width: '35%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">35%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Grade B</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{width: '40%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">40%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Grade C</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-600 h-2 rounded-full" style={{width: '20%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">20%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Below C</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{width: '5%'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button className="h-auto p-4 flex-col space-y-2">
                <Users className="h-6 w-6" />
                <span className="text-sm">Manage Staff</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">View Reports</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <School className="h-6 w-6" />
                <span className="text-sm">School Settings</span>
              </Button>
              <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                <DollarSign className="h-6 w-6" />
                <span className="text-sm">Financial Reports</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
