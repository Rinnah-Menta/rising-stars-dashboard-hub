import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { localDatabase } from '@/data/localDatabase';
import { ProfileData } from '@/types/profile';
import { User } from '@/types/auth';

interface ProfileContextType {
  profileData: ProfileData | null;
  updateProfile: (data: Partial<ProfileData>) => void;
  isLoading: boolean;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load profile data from localStorage on component mount
  useEffect(() => {
    if (user) {
      const savedProfile = localStorage.getItem(`profile_${user.id}`);
      if (savedProfile) {
        setProfileData(JSON.parse(savedProfile));
      } else {
        // Initialize with user data from auth
        const initialProfile = localDatabase.dummyProfiles[user.id];
        if (initialProfile) {
          setProfileData(initialProfile);
          localStorage.setItem(`profile_${user.id}`, JSON.stringify(initialProfile));
        }
      }
      setIsLoading(false);
    }
  }, [user]);

  const updateProfile = (data: Partial<ProfileData>) => {
    if (!user) return;

    setProfileData((prev) => {
      if (!prev) return null;
      const updatedProfile = { ...prev, ...data };
      localStorage.setItem(`profile_${user.id}`, JSON.stringify(updatedProfile));
      
      // Update auth user data for fields that should be reflected immediately
      const updatedUser: Partial<User> = {
        name: [data.firstName, data.middleName, data.lastName].filter(Boolean).join(' ') || user.name,
        avatar: data.avatar || user.avatar,
        subject: data.subject || user.subject,
        department: data.department || user.department
      };
      localStorage.setItem('springingstars_user', JSON.stringify({ ...user, ...updatedUser }));
      
      return updatedProfile;
    });
  };

  return (
    <ProfileContext.Provider value={{ profileData, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
}; 