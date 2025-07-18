import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { User, BookOpen, Calendar, MessageCircle, LogOut, Bell } from 'lucide-react';
import AnimatedInView from '../AnimatedInView';

const ParentDashboard = () => {
  const { user, logout } = useAuth();
  const { profileData } = useProfile();
  
  const getTitle = () => {
    if (!profileData?.title) return '';
    const title = profileData.title.toLowerCase();
    if (title === 'mr') return 'Mr.';
    if (title === 'mrs') return 'Mrs.';
    if (title === 'ms') return 'Ms.';
    if (title === 'dr') return 'Dr.';
    if (title === 'teacher') return 'Tr.';
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
          <p className="text-blue-100 mt-2">Here's a summary of your child's progress.</p>
        </div>
      </AnimatedInView>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Quick Stats */}
        <AnimatedInView>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="h-5 w-5" />
                <span>Children</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{user?.children?.length || 0}</div>
              <p className="text-blue-100">Enrolled</p>
            </CardContent>
          </Card>
        </AnimatedInView>

        <AnimatedInView>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="h-5 w-5" />
                <span>Avg Grade</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">A-</div>
              <p className="text-orange-100">Excellent work!</p>
            </CardContent>
          </Card>
        </AnimatedInView>

        <AnimatedInView>
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
        </AnimatedInView>

        <AnimatedInView>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>Messages</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2</div>
              <p className="text-purple-100">Unread</p>
            </CardContent>
          </Card>
        </AnimatedInView>

          {/* Child Progress */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Child Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-gray-600">Grade 5A</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">A-</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Mathematics</span>
                    <span className="font-medium">A</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Science</span>
                    <span className="font-medium">B+</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>English</span>
                    <span className="font-medium">A-</span>
                  </div>
                </div>
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
                <h4 className="font-semibold">Parent-Teacher Conference</h4>
                <p className="text-gray-600 text-sm">Schedule your meeting for next Friday</p>
                <span className="text-xs text-gray-500">3 days ago</span>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold">Science Fair Reminder</h4>
                <p className="text-gray-600 text-sm">Help your child prepare their project</p>
                <span className="text-xs text-gray-500">1 week ago</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>

          {/* Upcoming Events */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Science Fair</h4>
                  <p className="text-sm text-gray-600">Annual student exhibition</p>
                </div>
                <span className="text-sm font-medium">Mar 15</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Sports Day</h4>
                  <p className="text-sm text-gray-600">Athletic competitions</p>
                </div>
                <span className="text-sm font-medium">Mar 22</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold">Spring Break</h4>
                  <p className="text-sm text-gray-600">One week holiday</p>
                </div>
                <span className="text-sm font-medium">Apr 1-5</span>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>

          {/* Teacher Messages */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Messages</CardTitle>
              <CardDescription>Communication from teachers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border-l-4 border-blue-500 bg-blue-50 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Ms. Jane Wilson</h4>
                  <span className="text-xs text-gray-500">2 days ago</span>
                </div>
                <p className="text-sm text-gray-600">John showed excellent progress in mathematics this week. Keep up the great work!</p>
              </div>
              <div className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">Mr. Robert Brown</h4>
                  <span className="text-xs text-gray-500">1 week ago</span>
                </div>
                <p className="text-sm text-gray-600">Please ensure John brings his science textbook tomorrow for the experiment.</p>
              </div>
            </CardContent>
          </Card>
        </AnimatedInView>
        </div>
    </div>
  );
};

export default ParentDashboard;
