
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Shield } from 'lucide-react';

interface SecurityProps {
  settings: any;
  updateSetting: (key: string, value: any) => void;
}

export const SecurityCard = ({ settings, updateSetting }: SecurityProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Security & Privacy</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Session Timeout: {settings.sessionTimeout} minutes</Label>
          <Slider
            value={[settings.sessionTimeout]}
            onValueChange={([value]) => updateSetting('sessionTimeout', value)}
            min={15}
            max={120}
            step={15}
            className="w-full"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Parent Access</Label>
            <p className="text-sm text-gray-600">Allow parents to view student data</p>
          </div>
          <Switch 
            checked={settings.enableParentAccess}
            onCheckedChange={(checked) => updateSetting('enableParentAccess', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
