
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const Timetable = () => {
  const timetableData = [
    {
      time: '8:00 - 8:40',
      monday: { subject: 'Mathematics', teacher: 'Ms. Nakato', room: 'Room 12' },
      tuesday: { subject: 'English', teacher: 'Mr. Okello', room: 'Room 8' },
      wednesday: { subject: 'Science', teacher: 'Ms. Apio', room: 'Lab 1' },
      thursday: { subject: 'Social Studies', teacher: 'Mr. Musoke', room: 'Room 15' },
      friday: { subject: 'ICT', teacher: 'Ms. Namuli', room: 'Computer Lab' },
    },
    {
      time: '8:40 - 9:20',
      monday: { subject: 'English', teacher: 'Mr. Okello', room: 'Room 8' },
      tuesday: { subject: 'Mathematics', teacher: 'Ms. Nakato', room: 'Room 12' },
      wednesday: { subject: 'Physical Education', teacher: 'Mr. Ssebyala', room: 'Sports Field' },
      thursday: { subject: 'Science', teacher: 'Ms. Apio', room: 'Lab 1' },
      friday: { subject: 'Art & Craft', teacher: 'Ms. Nabukenya', room: 'Art Room' },
    },
    {
      time: '9:20 - 10:00',
      monday: { subject: 'Science', teacher: 'Ms. Apio', room: 'Lab 1' },
      tuesday: { subject: 'Social Studies', teacher: 'Mr. Musoke', room: 'Room 15' },
      wednesday: { subject: 'Mathematics', teacher: 'Ms. Nakato', room: 'Room 12' },
      thursday: { subject: 'English', teacher: 'Mr. Okello', room: 'Room 8' },
      friday: { subject: 'Music', teacher: 'Mr. Kiprotich', room: 'Music Room' },
    },
    {
      time: '10:00 - 10:20',
      monday: { subject: 'Break', teacher: '', room: '' },
      tuesday: { subject: 'Break', teacher: '', room: '' },
      wednesday: { subject: 'Break', teacher: '', room: '' },
      thursday: { subject: 'Break', teacher: '', room: '' },
      friday: { subject: 'Break', teacher: '', room: '' },
    },
    {
      time: '10:20 - 11:00',
      monday: { subject: 'Social Studies', teacher: 'Mr. Musoke', room: 'Room 15' },
      tuesday: { subject: 'Science', teacher: 'Ms. Apio', room: 'Lab 1' },
      wednesday: { subject: 'English', teacher: 'Mr. Okello', room: 'Room 8' },
      thursday: { subject: 'Mathematics', teacher: 'Ms. Nakato', room: 'Room 12' },
      friday: { subject: 'Religious Education', teacher: 'Pastor Mbabazi', room: 'Chapel' },
    },
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Class Timetable</h1>
        <Badge variant="outline" className="w-fit">Primary 5 - Blue Class</Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2 sm:p-3 font-semibold">Time</th>
                  {days.map(day => (
                    <th key={day} className="text-left p-2 sm:p-3 font-semibold">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timetableData.map((row, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="p-2 sm:p-3 font-medium text-sm">{row.time}</td>
                    <td className="p-2 sm:p-3">
                      {row.monday.subject === 'Break' ? (
                        <Badge variant="secondary">Break Time</Badge>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">{row.monday.subject}</div>
                          <div className="text-xs text-gray-600">{row.monday.teacher}</div>
                          <div className="text-xs text-gray-500">{row.monday.room}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-2 sm:p-3">
                      {row.tuesday.subject === 'Break' ? (
                        <Badge variant="secondary">Break Time</Badge>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">{row.tuesday.subject}</div>
                          <div className="text-xs text-gray-600">{row.tuesday.teacher}</div>
                          <div className="text-xs text-gray-500">{row.tuesday.room}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-2 sm:p-3">
                      {row.wednesday.subject === 'Break' ? (
                        <Badge variant="secondary">Break Time</Badge>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">{row.wednesday.subject}</div>
                          <div className="text-xs text-gray-600">{row.wednesday.teacher}</div>
                          <div className="text-xs text-gray-500">{row.wednesday.room}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-2 sm:p-3">
                      {row.thursday.subject === 'Break' ? (
                        <Badge variant="secondary">Break Time</Badge>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">{row.thursday.subject}</div>
                          <div className="text-xs text-gray-600">{row.thursday.teacher}</div>
                          <div className="text-xs text-gray-500">{row.thursday.room}</div>
                        </div>
                      )}
                    </td>
                    <td className="p-2 sm:p-3">
                      {row.friday.subject === 'Break' ? (
                        <Badge variant="secondary">Break Time</Badge>
                      ) : (
                        <div className="space-y-1">
                          <div className="font-semibold text-sm">{row.friday.subject}</div>
                          <div className="text-xs text-gray-600">{row.friday.teacher}</div>
                          <div className="text-xs text-gray-500">{row.friday.room}</div>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
