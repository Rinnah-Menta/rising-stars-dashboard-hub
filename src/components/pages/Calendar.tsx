
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';

export const Calendar = () => {
  const events = [
    {
      id: 1,
      title: 'Mathematics Exam',
      date: '2024-06-15',
      time: '9:00 AM - 11:00 AM',
      location: 'Room 12A',
      type: 'exam'
    },
    {
      id: 2,
      title: 'Science Fair',
      date: '2024-06-18',
      time: '2:00 PM - 5:00 PM',
      location: 'School Hall',
      type: 'event'
    },
    {
      id: 3,
      title: 'Parent-Teacher Meeting',
      date: '2024-06-20',
      time: '10:00 AM - 12:00 PM',
      location: 'Classroom',
      type: 'meeting'
    },
    {
      id: 4,
      title: 'Sports Day',
      date: '2024-06-25',
      time: '8:00 AM - 4:00 PM',
      location: 'Sports Ground',
      type: 'event'
    },
    {
      id: 5,
      title: 'English Literature Assignment Due',
      date: '2024-06-28',
      time: '11:59 PM',
      location: 'Online Submission',
      type: 'assignment'
    }
  ];

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 border-red-300 text-red-800';
      case 'event': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'meeting': return 'bg-green-100 border-green-300 text-green-800';
      case 'assignment': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">School Calendar</h1>
        <div className="flex items-center space-x-2 text-gray-600">
          <CalendarIcon className="h-5 w-5" />
          <span>June 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-l-4 ${getEventColor(event.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                        {event.type.toUpperCase()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">This Week</span>
                <span className="font-semibold">3 Events</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Exams</span>
                <span className="font-semibold">1 Upcoming</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Assignments Due</span>
                <span className="font-semibold">1 This Month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Important Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Term 2 Ends</p>
                <p className="text-gray-600">July 15, 2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Term 3 Begins</p>
                <p className="text-gray-600">August 5, 2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">School Festival</p>
                <p className="text-gray-600">September 12, 2024</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
