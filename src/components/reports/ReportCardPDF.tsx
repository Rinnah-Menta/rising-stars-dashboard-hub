
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Define interfaces for props
interface Student {
  id: number;
  name: string;
  class: string;
}

interface Subject {
  name: string;
  score: number;
  grade: string;
  remarks: string;
}

interface ReportCardPDFProps {
  student: Student;
  term: string;
  studentClass: string;
  subjects: Subject[];
  totalMarks: number;
  average: number;
  overallGrade: string;
}

// Register fonts
// Note: Using a font that is likely to be available on most systems.
// For custom fonts, you would need to host the font files and register them.
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK3iWkU9c2wyw2o0G1-d_w.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/helvetica/v11/TK3hWkU9c2wyw2o0G1-d_w.ttf', fontWeight: 'bold' },
  ],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 10,
  },
  header: {
    textAlign: 'center',
    marginBottom: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#1e3a8a',
    borderStyle: 'solid',
    paddingBottom: 10,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    marginBottom: 10,
  },
  logo: {
    width: 60,
    height: 60,
  },
  schoolInfo: {
    textAlign: 'center',
  },
  schoolName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  schoolMotto: {
    fontSize: 11,
    color: '#1d4ed8',
  },
  schoolAddress: {
    fontSize: 9,
    color: '#4b5563',
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e3a8a',
    letterSpacing: 2,
    marginTop: 10,
  },
  studentInfoContainer: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  studentInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  studentInfoItem: {
    flexDirection: 'row',
    marginBottom: 4,
    fontSize: 11,
  },
  infoLabel: {
    fontWeight: 'bold',
    width: 90,
    color: '#374151',
  },
  infoValue: {
    color: '#111827',
  },
  table: {
    width: '100%',
    marginBottom: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
  },
  tableHeaderCell: {
    padding: 10,
    fontWeight: 'bold',
    fontSize: 11,
    color: '#374151',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  tableCell: {
    padding: 10,
    fontSize: 11,
    borderRightWidth: 1,
    borderRightColor: '#e5e7eb',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    gap: 16,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1e3a8a',
    textAlign: 'center'
  },
  performanceBox: {
    textAlign: 'center',
  },
  performanceLabel: {
    fontSize: 10,
    color: '#6b7280',
  },
  performanceValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  overallGradeBox: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#dbeafe',
    padding: 8,
    marginTop: 10,
  },
  overallGradeLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1e40af',
  },
  overallGradeValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  gradingScaleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
    marginBottom: 4,
  },
  classPerformanceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 10,
    marginBottom: 6,
  },
  classPerfLabel: {
    fontWeight: 'bold'
  },
  classPerfValue: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentsSection: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
  },
  commentsContent: {
    padding: 10,
    borderRadius: 6,
    minHeight: 60,
  },
  commentsText: {
    fontSize: 11,
    color: '#374151',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
    marginTop: 20,
  },
  signatureBox: {
    textAlign: 'center',
    flex: 1,
  },
  signatureLine: {
    borderTopWidth: 1,
    borderTopColor: '#9ca3af',
    paddingTop: 6,
    marginHorizontal: 20,
  },
  signatureLabel: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  signatureName: {
    fontSize: 9,
    color: '#4b5563',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 8,
    color: '#888',
  },
});

// Create Document Component
export const ReportCardPDF = ({ student, term, studentClass, subjects, totalMarks, average, overallGrade }: ReportCardPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image style={styles.logo} src="https://gloriouschools.github.io/rising-star-connect/schoologo.png" />
          <View style={styles.schoolInfo}>
            <Text style={styles.schoolName}>SPRINGING STARS JUNIOR SCHOOL</Text>
            <Text style={styles.schoolMotto}>Excellence in Education • Nurturing Future Leaders</Text>
            <Text style={styles.schoolAddress}>P.O. Box 1234, Kampala, Uganda | Tel: +256 700 000 000</Text>
          </View>
        </View>
        <Text style={styles.reportTitle}>STUDENT PROGRESS REPORT</Text>
      </View>

      {/* Student Info */}
      <View style={styles.studentInfoContainer}>
        <View style={styles.studentInfoRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentInfoItem}><Text style={styles.infoLabel}>Student Name:</Text> <Text style={styles.infoValue}>{student.name}</Text></Text>
            <Text style={styles.studentInfoItem}><Text style={styles.infoLabel}>Class:</Text> <Text style={styles.infoValue}>{studentClass}</Text></Text>
            <Text style={styles.studentInfoItem}><Text style={styles.infoLabel}>Student ID:</Text> <Text style={styles.infoValue}>SS{student.id.toString().padStart(4, '0')}</Text></Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.studentInfoItem}><Text style={styles.infoLabel}>Term:</Text> <Text style={styles.infoValue}>{term}</Text></Text>
            <Text style={styles.studentInfoItem}><Text style={styles.infoLabel}>Academic Year:</Text> <Text style={styles.infoValue}>2024</Text></Text>
            <Text style={styles.studentInfoItem}><Text style={styles.infoLabel}>Date Issued:</Text> <Text style={styles.infoValue}>{new Date().toLocaleDateString()}</Text></Text>
          </View>
        </View>
      </View>

      {/* Subjects Table */}
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableHeaderCell, { flex: 2.5, textAlign: 'left' }]}>Subject</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Score</Text>
          <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Grade</Text>
          <Text style={[styles.tableHeaderCell, { flex: 2, textAlign: 'left' }]}>Remarks</Text>
        </View>
        {subjects.map((subject, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.tableCell, { flex: 2.5, textAlign: 'left' }]}>{subject.name}</Text>
            <Text style={[styles.tableCell, { flex: 1 }]}>{subject.score}</Text>
            <Text style={[styles.tableCell, { flex: 1, fontWeight: 'bold' }]}>{subject.grade}</Text>
            <Text style={[styles.tableCell, { flex: 2, textAlign: 'left' }]}>{subject.remarks}</Text>
          </View>
        ))}
      </View>

      {/* Summary and Performance */}
      <View style={styles.summaryContainer}>
        <View style={[styles.summaryBox, { flex: 1.2 }]}>
          <Text style={styles.summaryTitle}>Overall Performance</Text>
          <View style={[styles.performanceBox, { marginBottom: 10 }]}>
            <Text style={styles.performanceLabel}>Total Marks</Text>
            <Text style={styles.performanceValue}>{totalMarks}</Text>
          </View>
          <View style={[styles.performanceBox, { marginBottom: 10 }]}>
            <Text style={styles.performanceLabel}>Average Score</Text>
            <Text style={styles.performanceValue}>{average}%</Text>
          </View>
          <View style={[styles.performanceBox, styles.overallGradeBox]}>
            <Text style={styles.overallGradeLabel}>Overall Grade</Text>
            <Text style={styles.overallGradeValue}>{overallGrade}</Text>
          </View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Grading Scale</Text>
          <View style={styles.gradingScaleItem}><Text>A: 85-100%</Text><Text>Excellent</Text></View>
          <View style={styles.gradingScaleItem}><Text>A-: 80-84%</Text><Text>Very Good</Text></View>
          <View style={styles.gradingScaleItem}><Text>B+: 75-79%</Text><Text>Good</Text></View>
          <View style={styles.gradingScaleItem}><Text>B: 65-74%</Text><Text>Fair</Text></View>
          <View style={styles.gradingScaleItem}><Text>C+: 55-64%</Text><Text>Satisfactory</Text></View>
          <View style={styles.gradingScaleItem}><Text>C: 45-54%</Text><Text>Needs Improvement</Text></View>
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.summaryTitle}>Class Performance</Text>
          <View style={styles.classPerformanceItem}><Text style={styles.classPerfLabel}>Class Average:</Text><Text style={styles.classPerfValue}>76%</Text></View>
          <View style={styles.classPerformanceItem}><Text style={styles.classPerfLabel}>Student Position:</Text><Text style={styles.classPerfValue}>3rd</Text></View>
          <View style={styles.classPerformanceItem}><Text style={styles.classPerfLabel}>Highest Score:</Text><Text style={styles.classPerfValue}>92%</Text></View>
          <View style={styles.classPerformanceItem}><Text style={styles.classPerfLabel}>Lowest Score:</Text><Text style={styles.classPerfValue}>58%</Text></View>
        </View>
      </View>

      {/* Teacher's Comments */}
      <View style={styles.commentsSection}>
        <Text style={styles.summaryTitle}>Class Teacher's Comments</Text>
        <View style={styles.commentsContent}>
          <Text style={styles.commentsText}>
            {student.name} has shown excellent performance this term. Keep up the good work in Mathematics and continue reading more to improve English comprehension skills.
          </Text>
        </View>
      </View>
      
      {/* Signatures */}
      <View style={styles.signatureSection}>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Class Teacher</Text>
          <Text style={styles.signatureName}>Ms. Sarah Namubiru</Text>
        </View>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Head Teacher</Text>
          <Text style={styles.signatureName}>Mr. John Kasozi</Text>
        </View>
        <View style={styles.signatureBox}>
          <View style={styles.signatureLine} />
          <Text style={styles.signatureLabel}>Parent/Guardian</Text>
          <Text style={styles.signatureName}>Signature & Date</Text>
        </View>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        This report is a confidential document of Springing Stars Junior School • Generated on {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);
