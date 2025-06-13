import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Clock, MapPin, GripVertical } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { EventInput } from '@fullcalendar/core';

interface CalendarEvent extends EventInput {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay: boolean;
  extendedProps: {
    location: string;
    type: 'exam' | 'event' | 'meeting' | 'assignment' | 'class';
    description?: string;
    teacherId: string;
    time: string;
  };
}

const initialFormData = {
  id: '',
  title: '',
  date: '',
  time: '',
  location: '',
  type: 'class' as CalendarEvent['extendedProps']['type'],
  description: '',
  allDay: false,
};

export const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState(initialFormData);

  const loadEvents = useCallback(() => {
    const savedEvents = localStorage.getItem(`calendar_events_${user?.id}`);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      const defaultEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Mathematics Exam - P.5A',
          start: '2024-06-15T09:00:00',
          end: '2024-06-15T11:00:00',
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
    }
  }, [user?.id]);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  const saveEvents = (updatedEvents: CalendarEvent[]) => {
    setEvents(updatedEvents);
    localStorage.setItem(`calendar_events_${user?.id}`, JSON.stringify(updatedEvents));
  };

  const handleDateSelect = (selectInfo: any) => {
    setFormData({
      ...initialFormData,
      date: selectInfo.startStr,
      allDay: selectInfo.allDay,
    });
    setIsDialogOpen(true);
  };

  const handleEventClick = (clickInfo: any) => {
    const event = clickInfo.event;
    setFormData({
      id: event.id,
      title: event.title,
      date: event.start.toISOString().split('T')[0],
      time: event.extendedProps.time,
      location: event.extendedProps.location,
      type: event.extendedProps.type,
      description: event.extendedProps.description || '',
      allDay: event.allDay,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.date) {
      toast({ title: "Error", description: "Please fill in title and date.", variant: "destructive" });
      return;
    }

    const { id, title, date, time, location, type, description, allDay } = formData;
    const [startTime, endTime] = time.split('-').map(t => t.trim());

    const eventData: CalendarEvent = {
      id: id || Date.now().toString(),
      title,
      start: allDay ? date : `${date}T${convertTo24Hour(startTime) || '00:00:00'}`,
      end: allDay ? undefined : `${date}T${convertTo24Hour(endTime) || '23:59:59'}`,
      allDay,
      extendedProps: {
        location,
        type,
        description,
        time,
        teacherId: user?.id || '',
      },
    };

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
  
  const convertTo24Hour = (time12h: string | undefined) => {
    if (!time12h) return null;
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') {
      hours = '00';
    }
    if (modifier && modifier.toUpperCase() === 'PM') {
      hours = (parseInt(hours, 10) + 12).toString();
    }
    return `${hours.padStart(2, '0')}:${minutes || '00'}:00`;
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'red';
      case 'event': return 'blue';
      case 'meeting': return 'green';
      case 'assignment': return 'orange';
      case 'class': return 'purple';
      default: return 'gray';
    }
  };

  const upcomingEvents = events
    .filter(event => new Date(event.start) >= new Date())
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .slice(0, 5);

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Add New Event</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={() => { setFormData(initialFormData); setIsDialogOpen(true); }} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingEvents.length > 0 ? (
              <ul className="space-y-3">
                {upcomingEvents.map(event => (
                  <li key={event.id} className={`p-3 rounded-lg border-l-4`} style={{ borderColor: getEventColor(event.extendedProps.type) }}>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-gray-500 flex items-center"><CalendarIcon className="h-3 w-3 mr-2" />{new Date(event.start).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-500 flex items-center"><Clock className="h-3 w-3 mr-2" />{event.extendedProps.time}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">No upcoming events.</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Calendar */}
      <div className="w-full lg:w-3/4">
        <Card>
          <CardContent className="p-4">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              initialView="dayGridMonth"
              events={events.map(e => ({...e, color: getEventColor(e.extendedProps.type)}))}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateSelect}
              eventClick={handleEventClick}
              eventDrop={(info) => {
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
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Event Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[90vh] flex flex-col">
          <DialogHeader>
            <DialogTitle>{formData.id ? 'Edit Event' : 'Create New Event'}</DialogTitle>
          </DialogHeader>
          <div className="flex-grow overflow-y-auto pr-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Event Title</Label>
                <Input id="title" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} placeholder="e.g., Science Fair" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                </div>
                <div>
                  <Label htmlFor="time">Time</Label>
                  <Input id="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} placeholder="e.g., 10:00 AM - 1:00 PM" />
                </div>
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} placeholder="e.g., School Auditorium" />
              </div>
              <div>
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as any})}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="class">Class</SelectItem>
                    <SelectItem value="exam">Exam</SelectItem>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Additional details about the event..." />
              </div>
            </form>
          </div>
          <DialogFooter className="flex-shrink-0">
            {formData.id && (
              <Button variant="destructive" onClick={handleDelete} className="mr-auto"><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
            )}
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit}>{formData.id ? 'Save Changes' : 'Create Event'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
