
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, Edit, Trash2, Calendar as CalendarIcon, Clock, MapPin, User, BookOpen, FileText, Users, Briefcase } from 'lucide-react';
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

const eventTypeConfig = {
  exam: { color: '#ef4444', icon: FileText, label: 'Exam' },
  event: { color: '#3b82f6', icon: CalendarIcon, label: 'Event' },
  meeting: { color: '#10b981', icon: Users, label: 'Meeting' },
  assignment: { color: '#f59e0b', icon: BookOpen, label: 'Assignment' },
  class: { color: '#8b5cf6', icon: User, label: 'Class' },
};

export const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const calendarRef = useRef<FullCalendar>(null);
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

  // Update calendar view when selectedView changes
  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.changeView(selectedView);
    }
  }, [selectedView]);

  const saveEvents = (updatedEvents: CalendarEvent[]) => {
    console.log('Saving events:', updatedEvents);
    setEvents(updatedEvents);
    localStorage.setItem(`calendar_events_${user?.id}`, JSON.stringify(updatedEvents));
  };

  const handleDateSelect = (selectInfo: any) => {
    console.log('Date selected:', selectInfo);
    setFormData({
      ...initialFormData,
      date: selectInfo.startStr.split('T')[0], // Extract just the date part
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
      // Default to 1 hour duration if no end time specified
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

  const EventTypeIcon = ({ type }: { type: string }) => {
    const config = eventTypeConfig[type as keyof typeof eventTypeConfig];
    const IconComponent = config?.icon || CalendarIcon;
    return <IconComponent className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Calendar</h1>
            <p className="text-gray-600 mt-1">Manage your schedule and events</p>
          </div>
          <Button 
            onClick={() => { setFormData(initialFormData); setIsDialogOpen(true); }} 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Event
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar */}
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

          {/* Main Calendar */}
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
                        onClick={() => {
                          console.log('Changing view to:', view.key);
                          setSelectedView(view.key);
                        }}
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
        </div>

        {/* Event Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold">
                {formData.id ? 'Edit Event' : 'Create New Event'}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-grow overflow-y-auto pr-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title" className="text-sm font-medium">Event Title *</Label>
                    <Input 
                      id="title" 
                      value={formData.title} 
                      onChange={(e) => setFormData({...formData, title: e.target.value})} 
                      placeholder="e.g., Science Fair, Math Quiz" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="date" className="text-sm font-medium">Date *</Label>
                    <Input 
                      id="date" 
                      type="date" 
                      value={formData.date} 
                      onChange={(e) => setFormData({...formData, date: e.target.value})} 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                    <Input 
                      id="time" 
                      value={formData.time} 
                      onChange={(e) => setFormData({...formData, time: e.target.value})} 
                      placeholder="e.g., 10:00 AM - 1:00 PM" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="location" className="text-sm font-medium">Location</Label>
                    <Input 
                      id="location" 
                      value={formData.location} 
                      onChange={(e) => setFormData({...formData, location: e.target.value})} 
                      placeholder="e.g., School Auditorium, Room 12A" 
                      className="mt-1"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="type" className="text-sm font-medium">Event Type</Label>
                    <Select value={formData.type} onValueChange={(value) => setFormData({...formData, type: value as any})}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(eventTypeConfig).map(([type, config]) => (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center">
                              <config.icon className="h-4 w-4 mr-2" />
                              {config.label}
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="description" className="text-sm font-medium">Description</Label>
                    <Textarea 
                      id="description" 
                      value={formData.description} 
                      onChange={(e) => setFormData({...formData, description: e.target.value})} 
                      placeholder="Additional details about the event..." 
                      className="mt-1 min-h-[100px]"
                    />
                  </div>
                </div>
              </form>
            </div>
            <Separator />
            <DialogFooter className="flex-shrink-0 gap-2">
              {formData.id && (
                <Button 
                  variant="destructive" 
                  onClick={handleDelete} 
                  className="mr-auto"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {formData.id ? 'Save Changes' : 'Create Event'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
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
