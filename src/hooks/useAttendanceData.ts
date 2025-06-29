
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent' | 'late' | 'excused';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

const STORAGE_KEY = 'attendance_records';

const defaultRecords: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 'SS001',
    studentName: 'Sarah Nakato',
    class: 'P.7A',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'present',
    timeIn: '8:00 AM',
    timeOut: '3:30 PM'
  },
  {
    id: '2',
    studentId: 'SS002',
    studentName: 'John Mukasa',
    class: 'P.6B',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'late',
    timeIn: '8:45 AM',
    remarks: 'Transport delay'
  },
  {
    id: '3',
    studentId: 'SS003',
    studentName: 'Mary Namuli',
    class: 'P.5A',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'absent',
    remarks: 'Sick leave'
  },
  {
    id: '4',
    studentId: 'SS004',
    studentName: 'David Ssali',
    class: 'P.7B',
    date: format(new Date(), 'yyyy-MM-dd'),
    status: 'present',
    timeIn: '7:55 AM',
    timeOut: '3:30 PM'
  }
];

export const useAttendanceData = () => {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setAttendanceRecords(parsedData);
      } catch (error) {
        console.error('Error loading attendance data:', error);
        setAttendanceRecords(defaultRecords);
      }
    } else {
      setAttendanceRecords(defaultRecords);
    }
  }, []);

  // Save data to localStorage whenever records change
  useEffect(() => {
    if (attendanceRecords.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(attendanceRecords));
    }
  }, [attendanceRecords]);

  const updateAttendanceStatus = (studentId: string, status: AttendanceRecord['status']) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    setAttendanceRecords(prev => 
      prev.map(record => 
        record.studentId === studentId 
          ? { 
              ...record, 
              status,
              timeIn: status === 'present' || status === 'late' ? currentTime : '',
              timeOut: status === 'present' ? record.timeOut : ''
            }
          : record
      )
    );
  };

  return {
    attendanceRecords,
    updateAttendanceStatus
  };
};
