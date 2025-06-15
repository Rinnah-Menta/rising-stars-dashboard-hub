
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, Archive, Trash2, Clock, Mail, Phone, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AccountStatusPageProps {
  user: {
    name: string;
    email: string;
    accountStatus: 'suspended' | 'archived' | 'deleted';
    statusReason?: string;
    statusDate?: string;
    suspensionEndDate?: string;
    nextSteps?: string;
  };
}

export const AccountStatusPage: React.FC<AccountStatusPageProps> = ({ user }) => {
  const getStatusInfo = () => {
    switch (user.accountStatus) {
      case 'suspended':
        return {
          icon: <Clock className="h-8 w-8 text-yellow-600" />,
          title: 'Account Suspended',
          color: 'bg-yellow-100 text-yellow-800',
          description: 'Your account has been temporarily suspended.'
        };
      case 'archived':
        return {
          icon: <Archive className="h-8 w-8 text-orange-600" />,
          title: 'Account Archived',
          color: 'bg-orange-100 text-orange-800',
          description: 'Your account has been archived and is no longer active.'
        };
      case 'deleted':
        return {
          icon: <Trash2 className="h-8 w-8 text-red-600" />,
          title: 'Account Terminated',
          color: 'bg-red-100 text-red-800',
          description: 'Your account has been permanently terminated.'
        };
      default:
        return {
          icon: <AlertTriangle className="h-8 w-8 text-gray-600" />,
          title: 'Account Restricted',
          color: 'bg-gray-100 text-gray-800',
          description: 'Your account access has been restricted.'
        };
    }
  };

  const statusInfo = getStatusInfo();

  const getNextStepsContent = () => {
    if (user.nextSteps) {
      return user.nextSteps;
    }

    switch (user.accountStatus) {
      case 'suspended':
        return "Please wait for the suspension period to end. If you believe this is an error, contact the administration office.";
      case 'archived':
        return "If you need to reactivate your account, please contact the administration office with proper documentation.";
      case 'deleted':
        return "Account terminations are typically permanent. For appeals or inquiries, contact the school administration.";
      default:
        return "Please contact the administration office for more information about your account status.";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* School Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <img 
              src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
              alt="Springing Stars Logo" 
              className="h-16 w-16 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-900">Springing Stars</h1>
            <p className="text-xl text-blue-700">Junior School</p>
          </div>
        </div>

        {/* Status Card */}
        <Card className="shadow-lg border-0 bg-white/95 backdrop-blur">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              {statusInfo.icon}
            </div>
            <CardTitle className="text-2xl font-semibold text-gray-800">
              {statusInfo.title}
            </CardTitle>
            <Badge className={statusInfo.color} variant="secondary">
              {user.accountStatus.toUpperCase()}
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-2">Hello, <strong>{user.name}</strong></p>
              <p className="text-gray-700">{statusInfo.description}</p>
            </div>

            {user.statusReason && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Reason:</h3>
                <p className="text-gray-700">{user.statusReason}</p>
              </div>
            )}

            {user.statusDate && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Status Date:</h3>
                <p className="text-gray-700">
                  {format(new Date(user.statusDate), 'MMMM d, yyyy')}
                </p>
              </div>
            )}

            {user.accountStatus === 'suspended' && user.suspensionEndDate && (
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">Suspension End Date:</h3>
                <p className="text-yellow-700">
                  {format(new Date(user.suspensionEndDate), 'MMMM d, yyyy')}
                </p>
                <p className="text-sm text-yellow-600 mt-2">
                  Your account will be automatically reactivated after this date.
                </p>
              </div>
            )}

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-800 mb-2">Next Steps:</h3>
              <p className="text-blue-700">{getNextStepsContent()}</p>
            </div>

            {/* Contact Information */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-800 mb-4">Need Help? Contact Us:</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">admin@springingstars.ac.ug</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">+256 700 000 000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-700">Visit the school administration office</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/login'}
                className="w-full sm:w-auto"
              >
                Back to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
