
import React from 'react';
import { Star } from 'lucide-react';

export const SchoolHeader = () => {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <div className="relative">
          <img 
            src="https://springingstars.ac.ug/wp-content/uploads/2023/04/logo.png" 
            alt="Springing Stars Logo" 
            className="h-16 w-16 object-contain"
          />
          <Star className="h-6 w-6 text-orange-500 absolute -top-1 -right-1" />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-blue-900">Springing Stars</h1>
        <p className="text-xl text-blue-700">Junior School</p>
        <p className="text-sm text-gray-600 mt-2">School Management System - Uganda</p>
      </div>
    </div>
  );
};
