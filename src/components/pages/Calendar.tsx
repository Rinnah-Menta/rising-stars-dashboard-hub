
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Calendar as CalendarIcon, Clock, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'exam' | 'event' | 'meeting' | 'assignment' | 'class';
  description?: string;
  teacherId: string;
}

export const Calendar = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    type: 'class' as CalendarEvent['type'],
    description: ''
  });

  // Load events from localStorage on component mount
  useEffect(() => {
    const savedEvents = localStorage.getItem(`teacher_events_${user?.id}`);
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    } else {
      // Initialize with some default events
      const defaultEvents: CalendarEvent[] = [
        {
          id: '1',
          title: 'Mathematics Exam - P.5A',
          date: '2024-06-15',
          time: '9:00 AM - 11:00 AM',
          location: 'Room 12A',
          type: 'exam',
          description: 'Mid-term mathematics examination for Primary 5A',
          teacherId: user?.id || ''
        },
        {
          id: '2',
          title: 'Parent-Teacher Meeting',
          date: '2024-06-20',
          time: '10:00 AM - 12:00 PM',
          location: 'Conference Room',
          type: 'meeting',
          description: 'Quarterly parent-teacher conference',
          teacherId: user?.id || ''
        },
        {
          id: '3',
          title: 'Mathematics Assignment Due',
          date: '2024-06-28',
          time: '11:59 PM',
          location: 'Online Submission',
          type: 'assignment',
          description: 'Algebra and geometry homework submission',
          teacherId: user?.id || ''
        }
      ];
      setEvents(defaultEvents);
      localStorage.setItem(`teacher_events_${user?.id}`, JSON.stringify(defaultEvents));
    }
  }, [user?.id]);

  const saveEvents = (updatedEvents: CalendarEvent[]) => {
    setEvents(updatedEvents);
    localStorage.setItem(`teacher_events_${user?.id}`, JSON.stringify(updatedEvents));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.date || !formData.time || !formData.location) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const eventData: CalendarEvent = {
      id: editingEvent ? editingEvent.id : Date.now().toString(),
      ...formData,
      teacherId: user?.id || ''
    };

    let updatedEvents;
    if (editingEvent) {
      updatedEvents = events.map(event => 
        event.id === editingEvent.id ? eventData : event
      );
      toast({
        title: "Event Updated",
        description: "Event has been updated successfully.",
      });
    } else {
      updatedEvents = [...events, eventData];
      toast({
        title: "Event Created",
        description: "New event has been added to your calendar.",
      });
    }

    saveEvents(updatedEvents);
    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      description: event.description || ''
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (eventId: string) => {
    const updatedEvents = events.filter(event => event.id !== eventId);
    saveEvents(updatedEvents);
    toast({
      title: "Event Deleted",
      description: "Event has been removed from your calendar.",
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      date: '',
      time: '',
      location: '',
      type: 'class',
      description: ''
    });
    setEditingEvent(null);
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'exam': return 'bg-red-100 border-red-300 text-red-800';
      case 'event': return 'bg-blue-100 border-blue-300 text-blue-800';
      case 'meeting': return 'bg-green-100 border-green-300 text-green-800';
      case 'assignment': return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'class': return 'bg-purple-100 border-purple-300 text-purple-800';
      default: return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return events
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, 5);
  };

  const getEventStats = () => {
    const today = new Date();
    const thisWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const thisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    return {
      thisWeek: events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= today && eventDate <= thisWeek;
      }).length,
      exams: events.filter(event => event.type === 'exam' && new Date(event.date) >= today).length,
      assignments: events.filter(event => event.type === 'assignment' && new Date(event.date) >= today).length
    };
  };

  const stats = getEventStats();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Calendar</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <CalendarIcon className="h-5 w-5" />
            <span>{new Date().toLocaleDateString('en-UG', { month: 'long', year: 'numeric' })}</span>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>{editingEvent ? 'Edit Event' : 'Create New Event'}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      placeholder="e.g., 9:00 AM - 10:00 AM"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    placeholder="Enter location"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Event Type</Label>
                  <select
                    id="type"
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value as CalendarEvent['type']})}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  >
                    <option value="class">Class</option>
                    <option value="exam">Exam</option>
                    <option value="meeting">Meeting</option>
                    <option value="assignment">Assignment</option>
                    <option value="event">Event</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    placeholder="Enter event description (optional)"
                    rows={3}
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                {getUpcomingEvents().map((event) => (
                  <div
                    key={event.id}
                    className={`p-4 rounded-lg border-l-4 ${getEventColor(event.type)}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-semibold">{event.title}</h3>
                        {event.description && (
                          <p className="text-sm mt-1 opacity-80">{event.description}</p>
                        )}
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
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                          {event.type.toUpperCase()}
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(event)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(event.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
                {getUpcomingEvents().length === 0 && (
                  <p className="text-gray-500 text-center py-8">No upcoming events. Create your first event!</p>
                )}
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
                <span className="font-semibold">{stats.thisWeek} Events</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Upcoming Exams</span>
                <span className="font-semibold">{stats.exams}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Assignments Due</span>
                <span className="font-semibold">{stats.assignments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Events</span>
                <span className="font-semibold">{events.length}</span>
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
