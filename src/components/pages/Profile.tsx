import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Save, Edit, Upload, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { capitalizeWords } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ProfileCompleteness } from '../ProfileCompleteness';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

// Helper component for profile fields
const ProfileField = ({ id, label, value, isEditing, onChange, onCapitalizedChange, type = 'text', component = 'input' }: any) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (onCapitalizedChange) {
      onCapitalizedChange(id, e.target.value);
    } else {
      onChange(id, e.target.value);
    }
  };

  if (!isEditing) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id}>{label}</Label>
        <p className="text-sm p-2 bg-muted rounded min-h-[40px]">{value}</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {component === 'textarea' ? (
        <Textarea id={id} value={value} onChange={handleChange} rows={3} />
      ) : (
        <Input id={id} type={type} value={value} onChange={handleChange} />
      )}
    </div>
  );
};

export const Profile = () => {
  const { user } = useAuth();
  const { profileData, updateProfile, isLoading } = useProfile();
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const profileFields = [
    'firstName', 'lastName', 'gender', 'phone', 'address', 'bio', 
    'emergencyContact', 'emergencyPhone', 'qualification', 'experience', 'joinDate'
  ];

  useEffect(() => {
    if (profileData) {
      setFormData(profileData);
    }
  }, [profileData]);

  if (isLoading || !profileData) {
    return <div>Loading profile...</div>;
  }
  
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleCapitalizedInputChange = (field: string, value: string) => {
    handleInputChange(field, capitalizeWords(value));
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          handleInputChange('avatar', event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
    toast({
      title: 'Profile Updated',
      description: 'Your profile has been successfully updated.',
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData(profileData);
  };
  
  const getInitials = (firstName: string = '', lastName: string = '') => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="p-4 md:p-8 flex flex-col h-full">
      {/* Header */}
      <div className="flex-shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">My Profile</h1>
            <p className="text-muted-foreground">Manage your personal and professional information.</p>
          </div>
          <div className="space-x-2">
            {isEditing ? (
              <>
                <Button onClick={handleSave}><Save className="h-4 w-4 mr-2" />Save</Button>
                <Button variant="outline" onClick={handleCancel}><X className="h-4 w-4 mr-2" />Cancel</Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}><Edit className="h-4 w-4 mr-2" />Edit Profile</Button>
            )}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto pr-2">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardContent className="pt-6 flex flex-col items-center text-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <div className="relative mb-4 cursor-pointer">
                        <Avatar className="w-24 h-24 text-3xl">
                          <AvatarImage src={formData.avatar} alt="User avatar" />
                          <AvatarFallback>{getInitials(formData.firstName, formData.lastName)}</AvatarFallback>
                        </Avatar>
                        {isEditing && (
                          <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90">
                            <Upload className="h-4 w-4" />
                            <input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                          </label>
                        )}
                      </div>
                    </DialogTrigger>
                    <DialogContent className="p-0 border-0 max-w-2xl bg-transparent">
                      <img src={formData.avatar} alt="User avatar zoomed" className="w-full h-auto rounded-lg max-h-[85vh] object-contain" />
                    </DialogContent>
                  </Dialog>
                  <h2 className="text-xl font-semibold">{`${formData.title || ''} ${formData.firstName} ${formData.lastName}`}</h2>
                  <p className="text-muted-foreground break-words max-w-full">{user?.email}</p>
                  <p className="text-sm text-blue-500 font-medium">{capitalizeWords(user?.role || '')}</p>
                </CardContent>
                <CardContent>
                  <ProfileCompleteness profileData={formData} fields={profileFields} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>Bio</CardTitle></CardHeader>
                <CardContent>
                  <ProfileField id="bio" label="" value={formData.bio} isEditing={isEditing} onChange={handleInputChange} component="textarea" />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal">
                <TabsList>
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  {(user?.role === 'teacher' || user?.role === 'admin') && <TabsTrigger value="professional">Professional</TabsTrigger>}
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="pt-4">
                  <Card>
                    <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ProfileField id="firstName" label="First Name" value={formData.firstName} isEditing={isEditing} onCapitalizedChange={handleCapitalizedInputChange} />
                      <ProfileField id="lastName" label="Last Name" value={formData.lastName} isEditing={isEditing} onCapitalizedChange={handleCapitalizedInputChange} />
                      <ProfileField id="middleName" label="Middle Name" value={formData.middleName} isEditing={isEditing} onCapitalizedChange={handleCapitalizedInputChange} />
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        {isEditing ? (
                          <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                            <SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (<p className="text-sm p-2 bg-muted rounded min-h-[40px]">{formData.gender}</p>)}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="professional" className="pt-4">
                  <Card>
                    <CardHeader><CardTitle>Professional Details</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <ProfileField id="qualification" label="Qualification" value={formData.qualification} isEditing={isEditing} onChange={handleInputChange} />
                      <ProfileField id="experience" label="Experience (years)" value={formData.experience} isEditing={isEditing} onChange={handleInputChange} />
                      <ProfileField id="department" label="Department" value={formData.department} isEditing={isEditing} onCapitalizedChange={handleCapitalizedInputChange} />
                      <ProfileField id="subject" label="Subject" value={formData.subject} isEditing={isEditing} onCapitalizedChange={handleCapitalizedInputChange} />
                      <div className="space-y-2">
                        <Label htmlFor="joinDate">Joining Date</Label>
                        <ProfileField id="joinDate" label="" value={formData.joinDate} isEditing={isEditing} onChange={handleInputChange} type="date" />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="contact" className="pt-4">
                  <Card>
                    <CardHeader><CardTitle>Contact & Emergency Information</CardTitle></CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProfileField id="email" label="Email" value={formData.email} isEditing={isEditing} onChange={handleInputChange} type="email" />
                        <ProfileField id="phone" label="Phone" value={formData.phone} isEditing={isEditing} onChange={handleInputChange} />
                      </div>
                      <ProfileField id="address" label="Address" value={formData.address} isEditing={isEditing} onChange={handleInputChange} component="textarea" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                        <ProfileField id="emergencyContact" label="Emergency Contact Name" value={formData.emergencyContact} isEditing={isEditing} onCapitalizedChange={handleCapitalizedInputChange} />
                        <ProfileField id="emergencyPhone" label="Emergency Contact Phone" value={formData.emergencyPhone} isEditing={isEditing} onChange={handleInputChange} />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

              </Tabs>
            </div>
          </div>
          {/* Quick Stats */}
          {(user?.role === 'teacher' || user?.role === 'admin') && (
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
                <CardDescription>A quick overview of your key metrics.</CardDescription>
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
          )}
        </div>
      </div>
    </div>
  );
};
