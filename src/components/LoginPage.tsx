
import React, { useState } from 'react';
import { AccountStatusPage } from './AccountStatusPage';
import { SchoolHeader } from './login/SchoolHeader';
import { LoginCard } from './login/LoginCard';
import { LoginForm } from './login/LoginForm';

const LoginPage = () => {
  const [restrictedUser, setRestrictedUser] = useState<any>(null);

  const handleRestrictedUser = (user: any) => {
    setRestrictedUser(user);
  };

  // Show account status page if user is restricted
  if (restrictedUser) {
    return <AccountStatusPage user={restrictedUser} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-blue-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <SchoolHeader />
        <LoginCard>
          <LoginForm onRestrictedUser={handleRestrictedUser} />
        </LoginCard>
      </div>
    </div>
  );
};

export default LoginPage;
