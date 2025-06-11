
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, Phone, MapPin, Calendar, GraduationCap } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  const roleDisplayName = {
    'pupil': 'Student',
    'teacher': 'Teacher',
    'non-teaching': 'Non-Teaching Staff',
    'parent': 'Parent',
    'admin': 'Administrator'
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Profile</h1>
        <Button>Edit Profile</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Personal Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <img 
                src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'} 
                alt={user.name} 
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold">{user.name}</h3>
                <p className="text-gray-600">{roleDisplayName[user.role]}</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">+256 700 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Kampala, Uganda</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Joined: January 2024</span>
              </div>
              {user.class && (
                <div className="flex items-center space-x-2">
                  <GraduationCap className="h-4 w-4 text-gray-500" />
                  <span className="text-sm">Class: {user.class}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {user.role === 'pupil' && (
              <>
                <div>
                  <label className="text-sm font-medium">Student ID</label>
                  <p className="text-sm text-gray-600">SS2024{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <p className="text-sm text-gray-600">{user.class}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">House</label>
                  <p className="text-sm text-gray-600">Blue House</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Stream</label>
                  <p className="text-sm text-gray-600">A</p>
                </div>
              </>
            )}

            {user.role === 'teacher' && (
              <>
                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <p className="text-sm text-gray-600">TCH2024{user.id}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <p className="text-sm text-gray-600">{user.subject || 'Mathematics'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Department</label>
                  <p className="text-sm text-gray-600">{user.department || 'Science Department'}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Classes Teaching</label>
                  <p className="text-sm text-gray-600">P.5A, P.6B, P.7A</p>
                </div>
              </>
            )}

            {user.role === 'parent' && (
              <>
                <div>
                  <label className="text-sm font-medium">Children</label>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">Mary Nakato - P.5A</p>
                    <p className="text-sm text-gray-600">John Mukasa - P.3B</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Emergency Contact</label>
                  <p className="text-sm text-gray-600">+256 701 234 567</p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
