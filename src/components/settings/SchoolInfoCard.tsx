
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School } from 'lucide-react';

interface SchoolInfoProps {
  settings: any;
  updateSetting: (key: string, value: any) => void;
}

export const SchoolInfoCard = ({ settings, updateSetting }: SchoolInfoProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <School className="h-5 w-5" />
          <span>School Information</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="schoolName">School Name</Label>
          <Input 
            id="schoolName" 
            value={settings.schoolName}
            onChange={(e) => updateSetting('schoolName', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="academicYear">Academic Year</Label>
          <Input 
            id="academicYear" 
            value={settings.academicYear}
            onChange={(e) => updateSetting('academicYear', e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currentTerm">Current Term</Label>
          <Select value={settings.currentTerm} onValueChange={(value) => updateSetting('currentTerm', value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Term 1">Term 1</SelectItem>
              <SelectItem value="Term 2">Term 2</SelectItem>
              <SelectItem value="Term 3">Term 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
