
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

export const exportAttendanceToCSV = (records: AttendanceRecord[], filename?: string) => {
  if (records.length === 0) {
    alert('No attendance records to export');
    return;
  }

  const headers = [
    'Student ID',
    'Student Name',
    'Class',
    'Date',
    'Status',
    'Time In',
    'Time Out',
    'Remarks'
  ];

  const csvContent = [
    headers.join(','),
    ...records.map(record => [
      record.studentId,
      `"${record.studentName}"`,
      record.class,
      record.date,
      record.status,
      record.timeIn || '',
      record.timeOut || '',
      record.remarks ? `"${record.remarks.replace(/"/g, '""')}"` : ''
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `attendance_records_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportAttendanceToJSON = (records: AttendanceRecord[], filename?: string) => {
  if (records.length === 0) {
    alert('No attendance records to export');
    return;
  }

  const jsonContent = JSON.stringify(records, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename || `attendance_records_${new Date().toISOString().split('T')[0]}.json`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
