
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarIcon, Clock, MapPin } from 'lucide-react';
import { CalendarEvent, eventTypeConfig } from './types';

interface CalendarSidebarProps {
  todaysEvents: CalendarEvent[];
  upcomingEvents: CalendarEvent[];
  getEventColor: (type: string) => string;
}

const EventTypeIcon = ({ type }: { type: string }) => {
  const config = eventTypeConfig[type as keyof typeof eventTypeConfig];
  const IconComponent = config?.icon || CalendarIcon;
  return <IconComponent className="h-4 w-4" />;
};

export const CalendarSidebar: React.FC<CalendarSidebarProps> = ({
  todaysEvents,
  upcomingEvents,
  getEventColor,
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      {/* Today's Events */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-blue-600" />
            Today's Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todaysEvents.length > 0 ? (
            <div className="space-y-3">
              {todaysEvents.map(event => (
                <div key={event.id} className="p-3 rounded-lg bg-gray-50 border-l-4" style={{ borderColor: getEventColor(event.extendedProps.type) }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.extendedProps.time}
                      </div>
                      {event.extendedProps.location && (
                        <div className="flex items-center mt-1 text-xs text-gray-600">
                          <MapPin className="h-3 w-3 mr-1" />
                          {event.extendedProps.location}
                        </div>
                      )}
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                      style={{ backgroundColor: `${getEventColor(event.extendedProps.type)}20`, color: getEventColor(event.extendedProps.type) }}
                    >
                      <EventTypeIcon type={event.extendedProps.type} />
                      <span className="ml-1">{eventTypeConfig[event.extendedProps.type]?.label}</span>
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No events scheduled for today</p>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
            <Clock className="h-5 w-5 mr-2 text-purple-600" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingEvents.length > 0 ? (
            <div className="space-y-3">
              {upcomingEvents.map(event => (
                <div key={event.id} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer border-l-4" style={{ borderColor: getEventColor(event.extendedProps.type) }}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">{event.title}</p>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <CalendarIcon className="h-3 w-3 mr-1" />
                        {new Date(event.start).toLocaleDateString()}
                      </div>
                      <div className="flex items-center mt-1 text-xs text-gray-600">
                        <Clock className="h-3 w-3 mr-1" />
                        {event.extendedProps.time}
                      </div>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className="text-xs"
                      style={{ backgroundColor: `${getEventColor(event.extendedProps.type)}20`, color: getEventColor(event.extendedProps.type) }}
                    >
                      <EventTypeIcon type={event.extendedProps.type} />
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">No upcoming events</p>
          )}
        </CardContent>
      </Card>

      {/* Event Types Legend */}
      <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-semibold text-gray-800">Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(eventTypeConfig).map(([type, config]) => (
              <div key={type} className="flex items-center text-sm">
                <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: config.color }}></div>
                <config.icon className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-gray-700">{config.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
