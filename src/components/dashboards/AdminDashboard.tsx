import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Users, BookOpen, TrendingUp, DollarSign, LogOut, Bell, School, Shield } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';
import { AdminControlPanel } from '@/components/admin/AdminControlPanel';

const AnimatedProgress = ({ value, colorClass }: { value: number; colorClass: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-32 bg-gray-200 rounded-full h-2">
      <div 
        className={`${colorClass} h-2 rounded-full transition-all duration-700 ease-out`} 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { profileData } = useProfile();
  const [activeView, setActiveView] = useState('overview');
  
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
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome back, {getTitle()} {getLastName()}!</h1>
              <p className="text-blue-100 mt-2">Complete oversight and control of the entire school system.</p>
            </div>
            <div className="flex space-x-2">
              <Button 
                variant={activeView === 'overview' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => setActiveView('overview')}
                className="text-white border-white hover:bg-white/20"
              >
                Overview
              </Button>
              <Button 
                variant={activeView === 'control' ? 'secondary' : 'outline'} 
                size="sm"
                onClick={() => setActiveView('control')}
                className="text-white border-white hover:bg-white/20"
              >
                <Shield className="h-4 w-4 mr-2" />
                Control Panel
              </Button>
            </div>
          </div>
        </div>
      </AnimatedInView>

      {activeView === 'overview' ? (
        <>
          {/* Main Content - Keep existing overview content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Quick Stats */}
            <AnimatedInView>
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
            </AnimatedInView>

            <AnimatedInView>
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
            </AnimatedInView>

            <AnimatedInView>
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
            </AnimatedInView>

            <AnimatedInView>
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
            </AnimatedInView>

            {/* School Overview */}
            <AnimatedInView className="lg:col-span-2">
              <Card>
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
            </AnimatedInView>

            {/* Recent Activities */}
            <AnimatedInView className="lg:col-span-2">
              <Card>
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
            </AnimatedInView>

            {/* Grade Distribution */}
            <AnimatedInView className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Grade Distribution</CardTitle>
                  <CardDescription>Overall school performance by grade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Grade A</span>
                      <div className="flex items-center space-x-2">
                        <AnimatedProgress value={35} colorClass="bg-green-600" />
                        <span className="text-sm text-gray-600">35%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Grade B</span>
                      <div className="flex items-center space-x-2">
                        <AnimatedProgress value={40} colorClass="bg-blue-600" />
                        <span className="text-sm text-gray-600">40%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Grade C</span>
                      <div className="flex items-center space-x-2">
                        <AnimatedProgress value={20} colorClass="bg-orange-600" />
                        <span className="text-sm text-gray-600">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Below C</span>
                      <div className="flex items-center space-x-2">
                        <AnimatedProgress value={5} colorClass="bg-red-600" />
                        <span className="text-sm text-gray-600">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedInView>

            {/* Updated Quick Actions with Admin Controls */}
            <AnimatedInView className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-3">
                  <Button className="h-auto p-4 flex-col space-y-2">
                    <Users className="h-6 w-6" />
                    <span className="text-sm">Manage Users</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2" onClick={() => setActiveView('control')}>
                    <Shield className="h-6 w-6" />
                    <span className="text-sm">System Control</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <BookOpen className="h-6 w-6" />
                    <span className="text-sm">All Reports</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <Bell className="h-6 w-6" />
                    <span className="text-sm">Notifications</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <School className="h-6 w-6" />
                    <span className="text-sm">School Settings</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex-col space-y-2">
                    <DollarSign className="h-6 w-6" />
                    <span className="text-sm">Financial Control</span>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedInView>
          </div>
        </>
      ) : (
        <AdminControlPanel />
      )}
    </div>
  );
};

export default AdminDashboard;
