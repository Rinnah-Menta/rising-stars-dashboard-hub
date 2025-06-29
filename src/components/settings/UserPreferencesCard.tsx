
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accessibility } from 'lucide-react';

interface UserPreferencesProps {
  settings: any;
  updateSetting: (key: string, value: any) => void;
}

export const UserPreferencesCard = ({ settings, updateSetting }: UserPreferencesProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Accessibility className="h-5 w-5" />
          <span>User Preferences & Accessibility</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Font Size: {settings.fontSize}px</Label>
          <Slider
            value={[settings.fontSize]}
            onValueChange={([value]) => updateSetting('fontSize', value)}
            min={12}
            max={24}
            step={1}
            className="w-full"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="fontFamily">Font Style</Label>
          <Select value={settings.fontFamily} onValueChange={(value) => updateSetting('fontFamily', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="system">System Default</SelectItem>
              <SelectItem value="serif">Serif</SelectItem>
              <SelectItem value="sans-serif">Sans Serif</SelectItem>
              <SelectItem value="monospace">Monospace</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contrast">Contrast Level</Label>
          <Select value={settings.contrast} onValueChange={(value) => updateSetting('contrast', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="normal">Normal</SelectItem>
              <SelectItem value="high">High Contrast</SelectItem>
              <SelectItem value="highest">Highest Contrast</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Reduce Motion</Label>
            <p className="text-sm text-gray-600">Minimize animations and transitions</p>
          </div>
          <Switch 
            checked={settings.reduceMotion}
            onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Screen Reader Support</Label>
            <p className="text-sm text-gray-600">Optimize for screen readers</p>
          </div>
          <Switch 
            checked={settings.screenReaderSupport}
            onCheckedChange={(checked) => updateSetting('screenReaderSupport', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Keyboard Navigation</Label>
            <p className="text-sm text-gray-600">Enhanced keyboard shortcuts</p>
          </div>
          <Switch 
            checked={settings.keyboardNavigation}
            onCheckedChange={(checked) => updateSetting('keyboardNavigation', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label>Focus Indicators</Label>
            <p className="text-sm text-gray-600">Show visible focus outlines</p>
          </div>
          <Switch 
            checked={settings.focusIndicators}
            onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};
