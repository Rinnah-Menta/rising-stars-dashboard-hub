
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { CalendarHeader } from '@/components/calendar/CalendarHeader';
import { CalendarSidebar } from '@/components/calendar/CalendarSidebar';
import { CalendarView } from '@/components/calendar/CalendarView';
import { CalendarEventForm } from '@/components/calendar/CalendarEventForm';
import { CalendarEvent, eventTypeConfig, initialFormData } from '@/components/calendar/types';

export const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedView, setSelectedView] = useState('dayGridMonth');

  const loadEvents = useCallback(() => {
    const savedEvents = localStorage.getItem(`calendar_events_${user?.id}`);
    if (savedEvents) {
      try {
        const parsedEvents = JSON.parse(savedEvents);
        console.log('Loaded events from localStorage:', parsedEvents);
        setEvents(parsedEvents);
      } catch (error) {
        console.error('Error parsing saved events:', error);
        setEvents([]);
      }
    } else {
      const defaultEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Mathematics Exam - P.5A',
          start: '2024-12-16T09:00:00',
          end: '2024-12-16T11:00:00',
          allDay: false,
          extendedProps: {
            location: 'Room 12A',
            type: 'exam',
            description: 'Mid-term mathematics examination for Primary 5A',
            teacherId: user?.id || '',
            time: '9:00 AM - 11:00 AM'
          }
        },
      ];
      setEvents(defaultEvents);
      localStorage.setItem(`calendar_events_${user?.id}`, JSON.stringify(defaultEvents));
    }
  }, [user?.id]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const saveEvents = (updatedEvents: CalendarEvent[]) => {
    console.log('Saving events:', updatedEvents);
    setEvents(updatedEvents);
    localStorage.setItem(`calendar_events_${user?.id}`, JSON.stringify(updatedEvents));
  };

  const handleDateSelect = (selectInfo: any) => {
    console.log('Date selected:', selectInfo);
    setFormData({
      ...initialFormData,
      date: selectInfo.startStr.split('T')[0],
      allDay: selectInfo.allDay,
    });
    setIsDialogOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    console.log('Event clicked:', clickInfo.event);
    const event = clickInfo.event;
    setFormData({
      id: event.id,
      title: event.title,
      date: event.start.toISOString().split('T')[0],
      time: event.extendedProps.time || '',
      location: event.extendedProps.location || '',
      type: event.extendedProps.type || 'class',
      description: event.extendedProps.description || '',
      allDay: event.allDay,
    });
    setIsDialogOpen(true);
  };

  const convertTo24Hour = (time12h: string) => {
    if (!time12h || !time12h.includes(':')) return '09:00';
    
    try {
      const [time, modifier] = time12h.trim().split(' ');
      let [hours, minutes] = time.split(':');
      
      if (hours === '12') {
        hours = '00';
      }
      if (modifier && modifier.toUpperCase() === 'PM') {
        hours = (parseInt(hours, 10) + 12).toString();
      }
      
      return `${hours.padStart(2, '0')}:${(minutes || '00').padStart(2, '0')}`;
    } catch (error) {
      console.error('Error converting time:', error);
      return '09:00';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      toast({ title: "Error", description: "Please fill in title and date.", variant: "destructive" });
      return;
    }

    const { id, title, date, time, location, type, description, allDay } = formData;
    
    let startDateTime, endDateTime;
    
    if (allDay) {
      startDateTime = date;
      endDateTime = undefined;
    } else if (time && time.includes('-')) {
      const [startTime, endTime] = time.split('-').map(t => t.trim());
      startDateTime = `${date}T${convertTo24Hour(startTime)}:00`;
      endDateTime = `${date}T${convertTo24Hour(endTime)}:00`;
    } else if (time) {
      startDateTime = `${date}T${convertTo24Hour(time)}:00`;
      const startHour = parseInt(convertTo24Hour(time).split(':')[0]);
      const endHour = (startHour + 1) % 24;
      endDateTime = `${date}T${endHour.toString().padStart(2, '0')}:00:00`;
    } else {
      startDateTime = `${date}T09:00:00`;
      endDateTime = `${date}T10:00:00`;
    }

    const eventData: CalendarEvent = {
      id: id || Date.now().toString(),
      title,
      start: startDateTime,
      end: endDateTime,
      allDay,
      extendedProps: {
        location: location || '',
        type,
        description: description || '',
        time: time || '9:00 AM',
        teacherId: user?.id || '',
      },
    };

    console.log('Creating/updating event:', eventData);

    let updatedEvents;
    if (id) {
      updatedEvents = events.map(event => (event.id === id ? eventData : event));
      toast({ title: "Event Updated", description: "Event updated successfully." });
    } else {
      updatedEvents = [...events, eventData];
      toast({ title: "Event Created", description: "New event added to your calendar." });
    }

    saveEvents(updatedEvents);
    setIsDialogOpen(false);
    setFormData(initialFormData);
  };

  const handleDelete = () => {
    if (!formData.id) return;
    const updatedEvents = events.filter(event => event.id !== formData.id);
    saveEvents(updatedEvents);
    toast({ title: "Event Deleted", description: "Event removed from your calendar." });
    setIsDialogOpen(false);
    setFormData(initialFormData);
  };

  const handleEventDrop = (info: any) => {
    const event = info.event;
    const updatedEvent = {
      ...events.find(e => e.id === event.id)!,
      start: event.startStr,
      end: event.endStr,
      allDay: event.allDay,
    };
    const updatedEvents = events.map(e => e.id === updatedEvent.id ? updatedEvent : e);
    saveEvents(updatedEvents);
    toast({ title: "Event Moved", description: "Event date has been updated." });
  };

  const getEventColor = (type: string) => {
    return eventTypeConfig[type as keyof typeof eventTypeConfig]?.color || '#6b7280';
  };

  const upcomingEvents = events
    .filter(event => new Date(event.start) >= new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  const todaysEvents = events
    .filter(event => {
      const eventDate = new Date(event.start);
      const today = new Date();
      return eventDate.toDateString() === today.toDateString();
    });

  const handleCreateEvent = () => {
    setFormData(initialFormData);
    setIsDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <CalendarHeader onCreateEvent={handleCreateEvent} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <CalendarSidebar
            todaysEvents={todaysEvents}
            upcomingEvents={upcomingEvents}
            getEventColor={getEventColor}
          />

          <CalendarView
            events={events}
            selectedView={selectedView}
            setSelectedView={setSelectedView}
            onDateSelect={handleDateSelect}
            onEventClick={handleEventClick}
            onEventDrop={handleEventDrop}
            getEventColor={getEventColor}
          />
        </div>

        <CalendarEventForm
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
          onDelete={handleDelete}
        />
      </div>

      <style>{`
        .calendar-container .fc {
          font-family: inherit;
        }
        .calendar-container .fc-toolbar-title {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          color: #1f2937 !important;
        }
        .calendar-container .fc-button {
          background: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          color: #64748b !important;
          font-weight: 500 !important;
        }
        .calendar-container .fc-button:hover {
          background: #f1f5f9 !important;
          border-color: #cbd5e1 !important;
        }
        .calendar-container .fc-button-active {
          background: #3b82f6 !important;
          border-color: #3b82f6 !important;
          color: white !important;
        }
        .calendar-container .fc-daygrid-day:hover {
          background-color: #f8fafc;
        }
        .calendar-container .fc-event {
          border-radius: 6px !important;
          border: none !important;
          font-weight: 500 !important;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1) !important;
        }
        .calendar-container .fc-event:hover {
          box-shadow: 0 4px 6px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  );
};
