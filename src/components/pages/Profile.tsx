
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useProfile } from '@/contexts/ProfileContext';
import { Save, Edit, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { capitalizeWords } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProfileCompleteness } from '../ProfileCompleteness';
import { ProfileAvatar } from '../profile/ProfileAvatar';
import { PersonalTab } from '../profile/PersonalTab';
import { ProfessionalTab } from '../profile/ProfessionalTab';
import { ContactTab } from '../profile/ContactTab';
import { ProfileStats } from '../profile/ProfileStats';
import { ProfileField } from '../profile/ProfileField';

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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading profile...</div>
      </div>
    );
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
                <Button onClick={handleSave}>
                  <Save className="h-4 w-4 mr-2" />Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  <X className="h-4 w-4 mr-2" />Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />Edit Profile
              </Button>
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
                  <ProfileAvatar
                    avatar={formData.avatar}
                    firstName={formData.firstName}
                    lastName={formData.lastName}
                    isEditing={isEditing}
                    onAvatarChange={handleAvatarChange}
                  />
                  <h2 className="text-xl font-semibold">
                    {`${formData.title || ''} ${formData.firstName} ${formData.lastName}`}
                  </h2>
                  <p className="text-muted-foreground break-words max-w-full">{user?.email}</p>
                  <p className="text-sm text-blue-500 font-medium">
                    {capitalizeWords(user?.role || '')}
                  </p>
                </CardContent>
                <CardContent>
                  <ProfileCompleteness profileData={formData} fields={profileFields} />
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <ProfileField
                    id="bio"
                    label=""
                    value={formData.bio}
                    isEditing={isEditing}
                    onChange={handleInputChange}
                    component="textarea"
                  />
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="personal">Personal</TabsTrigger>
                  {(user?.role === 'teacher' || user?.role === 'admin') && (
                    <TabsTrigger value="professional">Professional</TabsTrigger>
                  )}
                  <TabsTrigger value="contact">Contact</TabsTrigger>
                </TabsList>
                
                <TabsContent value="personal" className="pt-4">
                  <PersonalTab
                    formData={formData}
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                    handleCapitalizedInputChange={handleCapitalizedInputChange}
                  />
                </TabsContent>

                <TabsContent value="professional" className="pt-4">
                  <ProfessionalTab
                    formData={formData}
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                    handleCapitalizedInputChange={handleCapitalizedInputChange}
                  />
                </TabsContent>

                <TabsContent value="contact" className="pt-4">
                  <ContactTab
                    formData={formData}
                    isEditing={isEditing}
                    handleInputChange={handleInputChange}
                    handleCapitalizedInputChange={handleCapitalizedInputChange}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Quick Stats for Teachers and Admins */}
          {(user?.role === 'teacher' || user?.role === 'admin') && <ProfileStats />}
        </div>
      </div>
    </div>
  );
};
