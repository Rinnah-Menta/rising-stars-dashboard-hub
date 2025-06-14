
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Trash2 } from 'lucide-react';
import { CalendarEvent, eventTypeConfig } from './types';

interface CalendarEventFormProps {
  isOpen: boolean;
  onClose: () => void;
  formData: any;
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  onDelete: () => void;
}

export const CalendarEventForm: React.FC<CalendarEventFormProps> = ({
  isOpen,
  onClose,
  formData,
  setFormData,
  onSubmit,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {formData.id ? 'Edit Event' : 'Create New Event'}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-2">
          <form onSubmit={onSubmit} className="space-y-6">
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
              onClick={onDelete} 
              className="mr-auto"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={onSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {formData.id ? 'Save Changes' : 'Create Event'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
