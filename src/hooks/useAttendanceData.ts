
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { localStudentDatabase } from '@/data/studentdata';

interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  date: string;
  status: 'present' | 'absent';
  timeIn?: string;
  timeOut?: string;
  remarks?: string;
}

const STORAGE_KEY = 'attendance_records';

// Generate attendance records from real student data
const generateDefaultRecords = (): AttendanceRecord[] => {
  const students = localStudentDatabase.users.filter(user => user.role === 'pupil');
  console.log('Total students from database:', localStudentDatabase.users.length);
  console.log('Students with pupil role:', students.length);
  console.log('First 3 students:', students.slice(0, 3));
  
  const today = format(new Date(), 'yyyy-MM-dd');
  
  return students.map((student, index) => {
    const record: AttendanceRecord = {
      id: student.id,
      studentId: student.id,
      studentName: student.name,
      class: student.class,
      date: today,
      status: 'present', // Set all to present by default
      timeIn: '8:00 AM',
      timeOut: '3:30 PM',
      remarks: undefined
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
              timeIn: status === 'present' ? currentTime : '',
              timeOut: status === 'present' ? record.timeOut : ''
            }
          : record
      )
    );
  };

  const bulkUpdateAttendance = (studentIds: string[], status: AttendanceRecord['status']) => {
    const currentTime = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });

    setAttendanceRecords(prev => 
      prev.map(record => 
        studentIds.includes(record.studentId)
          ? { 
              ...record, 
              status,
              timeIn: status === 'present' ? currentTime : '',
              timeOut: status === 'present' ? record.timeOut : ''
            }
          : record
      )
    );
  };

  return {
    attendanceRecords,
    updateAttendanceStatus,
    bulkUpdateAttendance
  };
};
