
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database } from 'lucide-react';

interface DataManagementProps {
  settings: any;
  updateSetting: (key: string, value: any) => void;
  exportSettings: () => void;
  resetToDefaults: () => void;
}

export const DataManagementCard = ({ settings, updateSetting, exportSettings, resetToDefaults }: DataManagementProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Data Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Auto Backup</Label>
            <p className="text-sm text-gray-600">Automatically backup data locally</p>
          </div>
          <Switch 
            checked={settings.enableAutoBackup}
            onCheckedChange={(checked) => updateSetting('enableAutoBackup', checked)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="backupFrequency">Backup Frequency</Label>
          <Select value={settings.backupFrequency} onValueChange={(value) => updateSetting('backupFrequency', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="hourly">Hourly</SelectItem>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex space-x-2">
          <Button onClick={exportSettings} variant="outline">
            Export Settings
          </Button>
          <Button onClick={resetToDefaults} variant="outline">
            Reset to Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
