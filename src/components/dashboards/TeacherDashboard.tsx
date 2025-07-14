import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Users, BookOpen, Calendar, ClipboardList, Bell } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';

const AnimatedProgress = ({ value, colorClass }: { value: number; colorClass: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
      <div 
        className={`${colorClass} h-2 rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  
  const getTitle = () => {
    if (!profileData?.title) return '';
    const title = profileData.title.toLowerCase();
    if (title === 'teacher') return 'Tr.';
    if (title === 'mr') return 'Mr.';
    if (title === 'mrs') return 'Mrs.';
    if (title === 'ms') return 'Ms.';
    if (title === 'dr') return 'Dr.';
    return profileData.title.charAt(0).toUpperCase() + profileData.title.slice(1).toLowerCase();
  };

  const getLastName = () => {
    const lastName = profileData?.lastName || '';
    return lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <AnimatedInView>
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome back, {getTitle()} {getLastName()}!</h1>
          <p className="text-blue-100 mt-2">Here's what's happening in your classes today.</p>
        </div>
      </AnimatedInView>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Quick Stats */}
        <AnimatedInView>
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
        </AnimatedInView>

        <AnimatedInView>
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
        </AnimatedInView>

        <AnimatedInView>
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
        </AnimatedInView>

        <AnimatedInView>
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
        </AnimatedInView>

        {/* Today's Schedule */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
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
        </AnimatedInView>

        {/* Recent Announcements */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
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
        </AnimatedInView>

        {/* Student Performance Overview */}
        <AnimatedInView className="lg:col-span-4">
          <Card>
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
                  <AnimatedProgress value={85} colorClass="bg-green-600" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Grade 4B</h4>
                  <div className="text-2xl font-bold text-blue-600">B</div>
                  <p className="text-sm text-gray-600">26 students • 80% avg</p>
                  <AnimatedProgress value={80} colorClass="bg-blue-600" />
                </div>
                <div className="p-4 border rounded-lg">
                  <h4 className="font-semibold">Grade 6A</h4>
                  <div className="text-2xl font-bold text-orange-600">A-</div>
                  <p className="text-sm text-gray-600">24 students • 88% avg</p>
                  <AnimatedProgress value={88} colorClass="bg-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>
      </div>
    </div>
  );
};

export default TeacherDashboard;
