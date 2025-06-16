import React, { useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
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
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{classData ? 'Edit Class' : 'Create New Class'}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Class Name</Label>
              <Input
                id="name"
                {...register('name', { required: 'Class name is required' })}
                placeholder="e.g., Primary 5A"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="level">Grade Level</Label>
              <Select onValueChange={(value) => setValue('level', value)} defaultValue={classData?.level}>
                <SelectTrigger>
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

            <div className="space-y-2">
              <Label htmlFor="teacher">Class Teacher</Label>
              <Input
                id="teacher"
                {...register('teacher', { required: 'Class teacher is required' })}
                placeholder="Teacher name"
              />
              {errors.teacher && <p className="text-sm text-red-600">{errors.teacher.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="room">Room</Label>
              <Input
                id="room"
                {...register('room', { required: 'Room is required' })}
                placeholder="e.g., Room 5A"
              />
              {errors.room && <p className="text-sm text-red-600">{errors.room.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity</Label>
              <Input
                id="capacity"
                type="number"
                {...register('capacity', { 
                  required: 'Capacity is required',
                  min: { value: 1, message: 'Capacity must be at least 1' },
                  max: { value: 50, message: 'Capacity cannot exceed 50' }
                })}
                placeholder="35"
              />
              {errors.capacity && <p className="text-sm text-red-600">{errors.capacity.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="academicYear">Academic Year</Label>
              <Input
                id="academicYear"
                {...register('academicYear', { required: 'Academic year is required' })}
                placeholder="2024"
              />
              {errors.academicYear && <p className="text-sm text-red-600">{errors.academicYear.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="schedule">Schedule</Label>
            <Input
              id="schedule"
              {...register('schedule', { required: 'Schedule is required' })}
              placeholder="e.g., Mon-Fri 8:00 AM - 3:30 PM"
            />
            {errors.schedule && <p className="text-sm text-red-600">{errors.schedule.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subjects">Subjects (comma-separated)</Label>
            <Textarea
              id="subjects"
              value={subjectsText}
              onChange={(e) => handleSubjectsChange(e.target.value)}
              placeholder="e.g., Mathematics, English, Science, Social Studies"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {classData ? 'Update Class' : 'Create Class'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
