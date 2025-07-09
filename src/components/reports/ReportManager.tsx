
import React, { useState } from 'react';
import { StudentManager } from './StudentManager';
import { GradeManager } from './GradeManager';
import { ReportCardGenerator } from './ReportCardGenerator';

interface ReportManagerProps {
  data: any;
  setData: React.Dispatch<any>;
  nextGradeId: number;
  setNextGradeId: React.Dispatch<React.SetStateAction<number>>;
}

export const ReportManager: React.FC<ReportManagerProps> = ({
  data,
  setData,
  nextGradeId,
  setNextGradeId
}) => {
  const [activeSection, setActiveSection] = useState('students');

  const showSection = (section: string) => setActiveSection(section);

  return (
    <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-900">Springing Stars School Management System</h1>
      <div className="mb-4 flex space-x-2">
        <button onClick={() => showSection('students')} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
          Manage Students
        </button>
        <button onClick={() => showSection('grades')} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
          Enter Grades
        </button>
        <button onClick={() => showSection('report')} className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          Generate Report Cards
        </button>
      </div>
      <div className={activeSection === 'students' ? '' : 'hidden'}>
        <StudentManager data={data} setData={setData} />
      </div>
      <div className={activeSection === 'grades' ? '' : 'hidden'}>
        <GradeManager data={data} setData={setData} nextGradeId={nextGradeId} setNextGradeId={setNextGradeId} />
      </div>
      <div className={activeSection === 'report' ? '' : 'hidden'}>
        <ReportCardGenerator data={data} />
      </div>
    </div>
  );
};
