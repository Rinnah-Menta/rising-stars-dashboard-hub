
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Bell } from 'lucide-react';

interface NotificationsProps {
  settings: any;
  updateSetting: (key: string, value: any) => void;
}

export const NotificationsCard = ({ settings, updateSetting }: NotificationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="h-5 w-5" />
          <span>Notifications & Sounds</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Notifications</Label>
            <p className="text-sm text-gray-600">Show system notifications</p>
          </div>
          <Switch 
            checked={settings.enableNotifications}
            onCheckedChange={(checked) => updateSetting('enableNotifications', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Sounds</Label>
            <p className="text-sm text-gray-600">Play notification sounds</p>
          </div>
          <Switch 
            checked={settings.enableSounds}
            onCheckedChange={(checked) => updateSetting('enableSounds', checked)}
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Auto Save</Label>
            <p className="text-sm text-gray-600">Automatically save changes</p>
          </div>
          <Switch 
            checked={settings.autoSave}
            onCheckedChange={(checked) => updateSetting('autoSave', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
