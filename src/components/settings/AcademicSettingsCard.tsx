
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Database } from 'lucide-react';

interface AcademicSettingsProps {
  settings: any;
  updateSetting: (key: string, value: any) => void;
}

export const AcademicSettingsCard = ({ settings, updateSetting }: AcademicSettingsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Database className="h-5 w-5" />
          <span>Academic Settings</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="gradeSystem">Grading System</Label>
          <Select value={settings.gradeSystem} onValueChange={(value) => updateSetting('gradeSystem', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Percentage (0-100%)</SelectItem>
              <SelectItem value="letter">Letter Grades (A-F)</SelectItem>
              <SelectItem value="points">Points (1-10)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Pass Grade: {settings.passGrade}%</Label>
          <Slider
            value={[settings.passGrade]}
            onValueChange={([value]) => updateSetting('passGrade', value)}
            min={30}
            max={80}
            step={5}
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>Max Students per Class: {settings.maxStudentsPerClass}</Label>
          <Slider
            value={[settings.maxStudentsPerClass]}
            onValueChange={([value]) => updateSetting('maxStudentsPerClass', value)}
            min={20}
            max={60}
            step={5}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};
