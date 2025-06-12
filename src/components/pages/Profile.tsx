
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { User, Mail, Phone, MapPin, BookOpen, Calendar, Save, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeacherProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  subject: string;
  department: string;
  qualification: string;
  experience: string;
  joinDate: string;
  bio: string;
  emergencyContact: string;
  emergencyPhone: string;
}

export const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<TeacherProfile>({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+256 700 123 456',
    address: 'Kampala, Uganda',
    subject: user?.subject || 'Mathematics',
    department: user?.department || 'Science Department',
    qualification: 'Bachelor of Education (Mathematics)',
    experience: '8 years',
    joinDate: '2016-09-01',
    bio: 'Passionate mathematics teacher with a focus on making complex concepts accessible to young minds.',
    emergencyContact: 'Mary Nakiwala',
    emergencyPhone: '+256 701 234 567'
  });

  // Load profile from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem(`teacher_profile_${user?.id}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [user?.id]);

  const handleInputChange = (field: keyof TeacherProfile, value: string) => {
    setProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem(`teacher_profile_${user?.id}`, JSON.stringify(profile));
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
  };

  const handleCancel = () => {
    // Reload from localStorage
    const savedProfile = localStorage.getItem(`teacher_profile_${user?.id}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Edit2 className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="space-x-2">
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Picture and Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Basic Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img 
                src={user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face'} 
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              {isEditing ? (
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {isEditing ? (
                <Input
                  id="phone"
                  value={profile.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.phone}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Professional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Professional Details</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              {isEditing ? (
                <Input
                  id="subject"
                  value={profile.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.subject}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              {isEditing ? (
                <Input
                  id="department"
                  value={profile.department}
                  onChange={(e) => handleInputChange('department', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.department}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="qualification">Qualification</Label>
              {isEditing ? (
                <Input
                  id="qualification"
                  value={profile.qualification}
                  onChange={(e) => handleInputChange('qualification', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.qualification}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              {isEditing ? (
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.experience}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="joinDate">Join Date</Label>
              {isEditing ? (
                <Input
                  id="joinDate"
                  type="date"
                  value={profile.joinDate}
                  onChange={(e) => handleInputChange('joinDate', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{new Date(profile.joinDate).toLocaleDateString()}</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Additional Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Additional Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {isEditing ? (
                <Textarea
                  id="address"
                  value={profile.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={2}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.address}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              {isEditing ? (
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  rows={3}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.bio}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyContact">Emergency Contact</Label>
              {isEditing ? (
                <Input
                  id="emergencyContact"
                  value={profile.emergencyContact}
                  onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.emergencyContact}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Emergency Phone</Label>
              {isEditing ? (
                <Input
                  id="emergencyPhone"
                  value={profile.emergencyPhone}
                  onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                />
              ) : (
                <p className="text-sm p-2 bg-gray-50 rounded">{profile.emergencyPhone}</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <p className="text-sm text-gray-600">Classes Teaching</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">132</div>
              <p className="text-sm text-gray-600">Total Students</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">24</div>
              <p className="text-sm text-gray-600">Assignments Given</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">96%</div>
              <p className="text-sm text-gray-600">Attendance Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
