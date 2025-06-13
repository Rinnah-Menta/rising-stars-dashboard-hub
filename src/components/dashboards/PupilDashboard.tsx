import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { 
  BookOpen, 
  Calendar, 
  Award, 
  Clock, 
  AlertCircle,
  TrendingUp,
  Users,
  FileText
} from 'lucide-react';
import AnimatedInView from '../AnimatedInView';
import { motion } from 'framer-motion';

const AnimatedProgress = ({ value }: { value: number }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    // Animate from 0 to the target value
    const timeout = setTimeout(() => setAnimatedValue(value), 100); // slight delay
    return () => clearTimeout(timeout);
  }, [value]);

  return <Progress value={animatedValue} className="mt-2 h-2" />;
};

const PupilDashboard = () => {
  const { user } = useAuth();
  const { profileData } = useProfile();
  const getLastName = () => profileData?.lastName || '';

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Welcome Section */}
      <AnimatedInView>
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 sm:p-6 rounded-lg">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Welcome back, {getLastName()}!</h1>
        <p className="text-blue-100 mt-2">Ready for another great day of learning?</p>
      </div>
      </AnimatedInView>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <AnimatedInView>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Subjects</p>
                <p className="text-lg sm:text-xl font-bold">6</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>
        
        <AnimatedInView>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Assignments</p>
                <p className="text-lg sm:text-xl font-bold">3</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>
        
        <AnimatedInView>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Award className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Average</p>
                <p className="text-lg sm:text-xl font-bold">82%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>
        
        <AnimatedInView>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-xs sm:text-sm text-gray-600">Position</p>
                <p className="text-lg sm:text-xl font-bold">8th</p>
              </div>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Today's Schedule */}
        <AnimatedInView className="lg:col-span-2">
          <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Today's Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div>
                  <p className="font-semibold">Mathematics</p>
                  <p className="text-sm text-gray-600">Ms. Nakato • Room 12</p>
                </div>
                <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                  <Clock className="h-4 w-4 inline mr-1" />
                  8:00 - 8:40 AM
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold">English</p>
                  <p className="text-sm text-gray-600">Mr. Okello • Room 8</p>
                </div>
                <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                  <Clock className="h-4 w-4 inline mr-1" />
                  8:40 - 9:20 AM
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div>
                  <p className="font-semibold">Science</p>
                  <p className="text-sm text-gray-600">Ms. Apio • Lab 1</p>
                </div>
                <div className="text-sm text-gray-600 mt-2 sm:mt-0">
                  <Clock className="h-4 w-4 inline mr-1" />
                  9:20 - 10:00 AM
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View Full Timetable
              </Button>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>

        {/* Upcoming Assignments */}
        <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Math Fractions</p>
                    <p className="text-xs text-gray-600">Due: June 15</p>
                  </div>
                  <Badge variant="destructive" className="text-xs">High</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Creative Writing</p>
                    <p className="text-xs text-gray-600">Due: June 18</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Medium</Badge>
                </div>
              </div>
              
              <div className="p-3 border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Science Project</p>
                    <p className="text-xs text-gray-600">Due: June 20</p>
                  </div>
                  <Badge variant="outline" className="text-xs">Medium</Badge>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View All Assignments
              </Button>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>
      </div>

      {/* Recent Grades */}
      <AnimatedInView>
      <Card>
        <CardHeader>
          <CardTitle>Recent Grades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Mathematics</p>
                  <p className="text-sm text-gray-600">Unit Test</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">85%</p>
                  <Badge className="bg-green-500 text-xs">A</Badge>
                </div>
              </div>
                <AnimatedProgress value={85} />
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">English</p>
                  <p className="text-sm text-gray-600">Essay</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-600">76%</p>
                  <Badge className="bg-blue-500 text-xs">B+</Badge>
                </div>
              </div>
                <AnimatedProgress value={76} />
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Science</p>
                  <p className="text-sm text-gray-600">Lab Report</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-600">82%</p>
                  <Badge className="bg-purple-500 text-xs">A-</Badge>
                </div>
              </div>
                <AnimatedProgress value={82} />
            </div>
          </div>
          
          <Button variant="outline" className="w-full mt-4">
            View Detailed Results
          </Button>
        </CardContent>
      </Card>
      </AnimatedInView>

      {/* Class Information */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Class Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Class:</span>
                <span className="font-semibold">Primary 5 - Blue</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Class Teacher:</span>
                <span className="font-semibold">Ms. Nakato</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Students:</span>
                <span className="font-semibold">32</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Term:</span>
                <span className="font-semibold">Term 2, 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>

        <AnimatedInView>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-2">
              <Button variant="outline" className="justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                View Timetable
              </Button>
              <Button variant="outline" className="justify-start">
                <FileText className="h-4 w-4 mr-2" />
                Check Assignments
              </Button>
              <Button variant="outline" className="justify-start">
                <Award className="h-4 w-4 mr-2" />
                View Results
              </Button>
              <Button variant="outline" className="justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                School Calendar
              </Button>
            </div>
          </CardContent>
        </Card>
        </AnimatedInView>
      </div>
    </div>
  );
};

export default PupilDashboard;
