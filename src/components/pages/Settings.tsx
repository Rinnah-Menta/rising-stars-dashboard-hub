
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings as SettingsIcon, Bell, Shield, Database, Users, Mail } from 'lucide-react';

export const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <SettingsIcon className="h-6 w-6 text-gray-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>School Information</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="schoolName">School Name</Label>
              <Input id="schoolName" defaultValue="Springing Stars Junior School" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" defaultValue="Kampala, Uganda" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+256 700 123 456" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" defaultValue="info@springingstars.ac.ug" />
            </div>
            <Button>Update School Info</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Notification Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-600">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-600">Send SMS to parents</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Assignment Reminders</Label>
                <p className="text-sm text-gray-600">Remind students of due assignments</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Fee Payment Alerts</Label>
                <p className="text-sm text-gray-600">Alert for overdue payments</p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Academic Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentTerm">Current Academic Term</Label>
              <Input id="currentTerm" defaultValue="Term 2, 2024" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gradeSystem">Grading System</Label>
              <Input id="gradeSystem" defaultValue="Percentage (0-100%)" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passGrade">Pass Grade</Label>
              <Input id="passGrade" defaultValue="50%" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Attendance Marking</Label>
                <p className="text-sm text-gray-600">Mark absent students automatically</p>
              </div>
              <Switch />
            </div>
            <Button>Save Academic Settings</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>User Management</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Allow Parent Registration</Label>
                <p className="text-sm text-gray-600">Parents can register themselves</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Email Verification</Label>
                <p className="text-sm text-gray-600">Users must verify email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-600">Enable 2FA for admin users</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
              <Input id="sessionTimeout" defaultValue="60" type="number" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Communication Settings</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="smtpServer">SMTP Server</Label>
              <Input id="smtpServer" defaultValue="smtp.gmail.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smtpPort">SMTP Port</Label>
              <Input id="smtpPort" defaultValue="587" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fromEmail">From Email</Label>
              <Input id="fromEmail" defaultValue="noreply@springingstars.ac.ug" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="smsProvider">SMS Provider</Label>
              <Input id="smsProvider" defaultValue="MTN Uganda" />
            </div>
            <Button>Test Configuration</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Backup</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-gray-600">Daily automatic backups</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backupTime">Backup Time</Label>
              <Input id="backupTime" defaultValue="02:00 AM" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="retention">Backup Retention (days)</Label>
              <Input id="retention" defaultValue="30" type="number" />
            </div>
            <div className="flex space-x-2">
              <Button>Create Backup Now</Button>
              <Button variant="outline">Restore Backup</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
