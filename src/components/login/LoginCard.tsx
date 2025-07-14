
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginCardProps {
  children: React.ReactNode;
}

export const LoginCard: React.FC<LoginCardProps> = ({ children }) => {
  return (
    <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-semibold text-gray-800">Welcome Back</CardTitle>
        <CardDescription className="text-gray-600">
          Sign in to access your school portal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};
