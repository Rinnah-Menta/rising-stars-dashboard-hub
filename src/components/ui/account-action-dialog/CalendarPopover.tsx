
import React from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { format, addMonths, subMonths, startOfToday } from 'date-fns';
import { cn } from '@/lib/utils';

interface CalendarPopoverProps {
  suspensionEndDate: Date;
  setSuspensionEndDate: (date: Date | undefined) => void;
}

export const CalendarPopover: React.FC<CalendarPopoverProps> = ({
  suspensionEndDate,
  setSuspensionEndDate
}) => {
  const [calendarMonth, setCalendarMonth] = React.useState(new Date());

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCalendarMonth(direction === 'next' ? addMonths(calendarMonth, 1) : subMonths(calendarMonth, 1));
  };

  const handleYearChange = (year: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setFullYear(parseInt(year));
    setCalendarMonth(newDate);
  };

  const handleMonthSelect = (month: string) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(parseInt(month));
    setCalendarMonth(newDate);
  };

  const currentYear = calendarMonth.getFullYear();
  const currentMonth = calendarMonth.getMonth();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = startOfToday();

  return (
    <div className="space-y-2">
      <Label>Suspension End Date</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !suspensionEndDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {suspensionEndDate ? format(suspensionEndDate, "PPP") : "Select end date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent 
          className="w-auto p-0 z-[9999]" 
          align="center"
          side="top"
          sideOffset={10}
          avoidCollisions={true}
          collisionPadding={20}
          style={{ position: 'fixed' }}
        >
          <div className="p-3 border-b bg-background">
            <div className="flex items-center justify-between mb-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMonthChange('prev')}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="flex space-x-2">
                <Select value={currentMonth.toString()} onValueChange={handleMonthSelect}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {months.map((month, index) => (
                      <SelectItem key={index} value={index.toString()}>
                        {month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={currentYear.toString()} onValueChange={handleYearChange}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleMonthChange('next')}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Calendar
            mode="single"
            selected={suspensionEndDate}
            onSelect={setSuspensionEndDate}
            disabled={(date) => date < today}
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            initialFocus
            className="p-3 pointer-events-auto bg-background"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
