
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface CalendarHeaderProps {
  onCreateEvent: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ onCreateEvent }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
        <p className="text-gray-600 mt-1">Manage your schedule and events</p>
      </div>
      <Button 
        onClick={onCreateEvent}
        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Event
      </Button>
    </div>
  );
};
