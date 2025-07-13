
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { localStudentDatabase } from '@/data/studentdata';

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

// Generate attendance records from real student data
const generateDefaultRecords = (): AttendanceRecord[] => {
  const students = localStudentDatabase.users; // All students
  const today = format(new Date(), 'yyyy-MM-dd');
  const statuses: AttendanceRecord['status'][] = ['present', 'present', 'present', 'late', 'absent'];
  
  return students.map((student, index) => {
    const status = statuses[index % statuses.length];
    const record: AttendanceRecord = {
      id: (index + 1).toString(),
      studentId: student.id,
      studentName: student.name,
      class: student.class, // Use the original class name without transformation
      date: today,
      status,
      timeIn: status === 'present' || status === 'late' ? '8:00 AM' : undefined,
      timeOut: status === 'present' ? '3:30 PM' : undefined,
      remarks: status === 'late' ? 'Transport delay' : status === 'absent' ? 'Sick leave' : undefined
    };
    return record;
  });
};

const defaultRecords: AttendanceRecord[] = generateDefaultRecords();

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
