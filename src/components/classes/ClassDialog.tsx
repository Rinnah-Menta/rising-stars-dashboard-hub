
import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useForm } from 'react-hook-form';
import { toast } from '@/hooks/use-toast';

interface ClassData {
  id?: string;
  name: string;
  teacher: string;
  room: string;
  level: string;
  capacity: number;
  subjects: string[];
  schedule: string;
  academicYear: string;
}

interface ClassDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  classData?: ClassData | null;
  onSave: (data: ClassData) => void;
}

export const ClassDialog: React.FC<ClassDialogProps> = ({
  open,
  onOpenChange,
  classData,
  onSave
}) => {
  const { register, handleSubmit, reset, setValue, watch, formState: { errors } } = useForm<ClassData>({
    defaultValues: {
      name: '',
      teacher: '',
      room: '',
      level: '',
      capacity: 35,
      subjects: [],
      schedule: '',
      academicYear: '2024'
    }
  });

  const watchedSubjects = watch('subjects') || [];
  const subjectsText = Array.isArray(watchedSubjects) ? watchedSubjects.join(', ') : '';

  useEffect(() => {
    if (classData) {
      reset({
        ...classData,
        subjects: classData.subjects || []
      });
    } else {
      reset({
        name: '',
        teacher: '',
        room: '',
        level: '',
        capacity: 35,
        subjects: [],
        schedule: '',
        academicYear: '2024'
      });
    }
  }, [classData, reset]);

  const onSubmit = (data: ClassData) => {
    const subjects = data.subjects || [];
    let processedSubjects: string[] = [];
    
    // Handle both string array and potential string input
    if (Array.isArray(subjects)) {
      processedSubjects = subjects;
    } else {
      // If for some reason subjects is a string, split it
      const subjectsString = subjects as unknown as string;
      if (typeof subjectsString === 'string') {
        processedSubjects = subjectsString.split(',').map(s => s.trim()).filter(s => s);
      }
    }

    const finalData = {
      ...data,
      subjects: processedSubjects,
      id: classData?.id || `${data.level.replace(' ', '')}${Math.random().toString(36).substr(2, 2).toUpperCase()}`
    };

    onSave(finalData);
    toast({
      title: classData ? "Class Updated" : "Class Created",
      description: `${finalData.name} has been ${classData ? 'updated' : 'created'} successfully.`,
    });
    onOpenChange(false);
  };

  const handleSubjectsChange = (value: string) => {
    const subjectsArray = value.split(',').map(s => s.trim()).filter(s => s);
    setValue('subjects', subjectsArray);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle>{classData ? 'Edit Class' : 'Create New Class'}</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] px-6">
          <form onSubmit={handleSubmit(onSubmit)} className="py-4 space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="name" className="text-sm font-medium">Class Name</Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Class name is required' })}
                  placeholder="e.g., Primary 5A"
                  className="h-9"
                />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="level" className="text-sm font-medium">Grade Level</Label>
                <Select onValueChange={(value) => setValue('level', value)} defaultValue={classData?.level}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select grade level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Primary 1">Primary 1</SelectItem>
                    <SelectItem value="Primary 2">Primary 2</SelectItem>
                    <SelectItem value="Primary 3">Primary 3</SelectItem>
                    <SelectItem value="Primary 4">Primary 4</SelectItem>
                    <SelectItem value="Primary 5">Primary 5</SelectItem>
                    <SelectItem value="Primary 6">Primary 6</SelectItem>
                    <SelectItem value="Primary 7">Primary 7</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label htmlFor="teacher" className="text-sm font-medium">Class Teacher</Label>
                <Input
                  id="teacher"
                  {...register('teacher', { required: 'Class teacher is required' })}
                  placeholder="Teacher name"
                  className="h-9"
                />
                {errors.teacher && <p className="text-sm text-red-600">{errors.teacher.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="space-y-1">
                <Label htmlFor="room" className="text-sm font-medium">Room</Label>
                <Input
                  id="room"
                  {...register('room', { required: 'Room is required' })}
                  placeholder="e.g., Room 5A"
                  className="h-9"
                />
                {errors.room && <p className="text-sm text-red-600">{errors.room.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="capacity" className="text-sm font-medium">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  {...register('capacity', { 
                    required: 'Capacity is required',
                    min: { value: 1, message: 'Capacity must be at least 1' },
                    max: { value: 50, message: 'Capacity cannot exceed 50' }
                  })}
                  placeholder="35"
                  className="h-9"
                />
                {errors.capacity && <p className="text-sm text-red-600">{errors.capacity.message}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="academicYear" className="text-sm font-medium">Academic Year</Label>
                <Input
                  id="academicYear"
                  {...register('academicYear', { required: 'Academic year is required' })}
                  placeholder="2024"
                  className="h-9"
                />
                {errors.academicYear && <p className="text-sm text-red-600">{errors.academicYear.message}</p>}
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="schedule" className="text-sm font-medium">Schedule</Label>
              <Input
                id="schedule"
                {...register('schedule', { required: 'Schedule is required' })}
                placeholder="e.g., Mon-Fri 8:00 AM - 3:30 PM"
                className="h-9"
              />
              {errors.schedule && <p className="text-sm text-red-600">{errors.schedule.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="subjects" className="text-sm font-medium">Subjects (comma-separated)</Label>
              <Textarea
                id="subjects"
                value={subjectsText}
                onChange={(e) => handleSubjectsChange(e.target.value)}
                placeholder="e.g., Mathematics, English, Science, Social Studies"
                rows={2}
                className="resize-none"
              />
            </div>
          </form>
        </ScrollArea>

        <div className="flex justify-end space-x-2 px-6 py-4 border-t bg-gray-50">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)}>
            {classData ? 'Update Class' : 'Create Class'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
