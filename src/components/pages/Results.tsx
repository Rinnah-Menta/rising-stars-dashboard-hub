
import React from 'react';
import { OverallPerformance } from '@/components/results/OverallPerformance';
import { SubjectResults } from '@/components/results/SubjectResults';
import { PerformanceChart } from '@/components/results/PerformanceChart';

export const Results = () => {
  const termResults = [
    {
      subject: 'Mathematics',
      currentMark: 85,
      previousMark: 78,
      grade: 'A',
      teacher: 'Ms. Nakato',
      comments: 'Excellent improvement in problem-solving skills. Shows strong understanding of algebraic concepts and geometric principles.',
    },
    {
      subject: 'English',
      currentMark: 76,
      previousMark: 80,
      grade: 'B+',
      teacher: 'Mr. Okello',
      comments: 'Good vocabulary development but needs to work on grammar and sentence structure. Creative writing shows improvement.',
    },
    {
      subject: 'Science',
      currentMark: 82,
      previousMark: 82,
      grade: 'A-',
      teacher: 'Ms. Apio',
      comments: 'Consistent performance across all science topics. Shows good understanding of scientific methods and principles.',
    },
    {
      subject: 'Social Studies',
      currentMark: 79,
      previousMark: 75,
      grade: 'B+',
      teacher: 'Mr. Musoke',
      comments: 'Improved knowledge of Ugandan history and geography. Excellent participation in class discussions.',
    },
    {
      subject: 'ICT',
      currentMark: 88,
      previousMark: 85,
      grade: 'A',
      teacher: 'Ms. Namuli',
      comments: 'Excellent computer skills and creativity in digital projects. Shows strong potential in programming concepts.',
    },
    {
      subject: 'Physical Education',
      currentMark: 90,
      previousMark: 87,
      grade: 'A',
      teacher: 'Mr. Ssebyala',
      comments: 'Outstanding participation and sportsmanship. Natural leadership qualities during team activities.',
    },
  ];

  const overallAverage = termResults.reduce((sum, result) => sum + result.currentMark, 0) / termResults.length;

  return (
    <div className="space-y-6 p-1">
      <OverallPerformance
        overallAverage={overallAverage}
        overallGrade="A-"
        classPosition={8}
        term="Term 2, 2024"
      />

      <PerformanceChart results={termResults} />

      <SubjectResults results={termResults} />
    </div>
  );
};
