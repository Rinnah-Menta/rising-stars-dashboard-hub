
import React, { useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarEvent, eventTypeConfig } from './types';

interface CalendarViewProps {
  events: CalendarEvent[];
  selectedView: string;
  setSelectedView: (view: string) => void;
  onDateSelect: (selectInfo: any) => void;
  onEventClick: (clickInfo: any) => void;
  onEventDrop: (info: any) => void;
  getEventColor: (type: string) => string;
}

const EventTypeIcon = ({ type }: { type: string }) => {
  const config = eventTypeConfig[type as keyof typeof eventTypeConfig];
  const IconComponent = config?.icon || eventTypeConfig.class.icon;
  return <IconComponent className="h-4 w-4" />;
};

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  selectedView,
  setSelectedView,
  onDateSelect,
  onEventClick,
  onEventDrop,
  getEventColor,
}) => {
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(selectedView);
    }
  }, [selectedView]);

  return (
    <div className="lg:col-span-3">
      <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
        <CardHeader className="pb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-xl font-semibold text-gray-800">Calendar View</CardTitle>
            <div className="flex gap-2">
              {[
                { key: 'dayGridMonth', label: 'Month' },
                { key: 'timeGridWeek', label: 'Week' },
                { key: 'timeGridDay', label: 'Day' },
                { key: 'listWeek', label: 'List' }
              ].map(view => (
                <Button
                  key={view.key}
                  variant={selectedView === view.key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedView(view.key)}
                  className={selectedView === view.key ? "bg-blue-600 hover:bg-blue-700" : ""}
                >
                  {view.label}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="calendar-container">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: ''
              }}
              initialView={selectedView}
              height="auto"
              events={events.map(e => ({
                ...e, 
                color: getEventColor(e.extendedProps.type),
                backgroundColor: getEventColor(e.extendedProps.type),
                borderColor: getEventColor(e.extendedProps.type)
              }))}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={3}
              select={onDateSelect}
              eventClick={onEventClick}
              eventDrop={onEventDrop}
              eventContent={(eventInfo) => (
                <div className="flex items-center px-2 py-1 text-xs">
                  <EventTypeIcon type={eventInfo.event.extendedProps.type} />
                  <span className="ml-1 truncate">{eventInfo.event.title}</span>
                </div>
              )}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
