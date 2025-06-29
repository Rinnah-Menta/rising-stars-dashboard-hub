
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SchoolInfoCard } from '../settings/SchoolInfoCard';
import { AcademicSettingsCard } from '../settings/AcademicSettingsCard';
import { UserInterfaceCard } from '../settings/UserInterfaceCard';
import { UserPreferencesCard } from '../settings/UserPreferencesCard';
import { NotificationsCard } from '../settings/NotificationsCard';
import { SecurityCard } from '../settings/SecurityCard';
import { DataManagementCard } from '../settings/DataManagementCard';

export const Settings = () => {
  const { toast } = useToast();
  
  // Local storage keys
  const SETTINGS_KEY = 'school_settings';
  
  // Default settings
  const defaultSettings = {
    schoolName: 'Rising Star Junior School',
    academicYear: '2024',
    currentTerm: 'Term 2',
    gradeSystem: 'percentage',
    passGrade: 50,
    enableNotifications: true,
    enableSounds: true,
    autoSave: true,
    theme: 'light',
    language: 'en',
    sessionTimeout: 60,
    showWelcomeMessage: true,
    enableAutoBackup: true,
    backupFrequency: 'daily',
    maxStudentsPerClass: 40,
    enableParentAccess: true,
    // User preferences & accessibility
    fontSize: 16,
    fontFamily: 'system',
    contrast: 'normal',
    reduceMotion: false,
    screenReaderSupport: false,
    keyboardNavigation: true,
    focusIndicators: true
  };

  const [settings, setSettings] = useState(defaultSettings);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_KEY);
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = () => {
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      toast({
        title: "Settings Saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving settings:', error);
      toast({
        title: "Error",
        description: "Failed to save settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Update a setting
  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(defaultSettings);
    localStorage.removeItem(SETTINGS_KEY);
    toast({
      title: "Settings Reset",
      description: "All settings have been reset to default values.",
    });
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'school-settings.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <SettingsIcon className="h-6 w-6 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SchoolInfoCard settings={settings} updateSetting={updateSetting} />
        <AcademicSettingsCard settings={settings} updateSetting={updateSetting} />
        <UserInterfaceCard settings={settings} updateSetting={updateSetting} />
        <UserPreferencesCard settings={settings} updateSetting={updateSetting} />
        <NotificationsCard settings={settings} updateSetting={updateSetting} />
        <SecurityCard settings={settings} updateSetting={updateSetting} />
        <DataManagementCard 
          settings={settings} 
          updateSetting={updateSetting}
          exportSettings={exportSettings}
          resetToDefaults={resetToDefaults}
        />
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={saveSettings} size="lg">
          Save All Settings
        </Button>
      </div>
    </div>
  );
};
