
export interface LibraryDocument {
  id: string;
  title: string;
  url: string;
  class: string;
  subject: string;
  type: 'lesson-notes' | 'past-papers' | 'schemes-of-work' | 'textbooks' | 'holiday-packages';
  uploadedDate: string;
  fileSize?: string;
}

export const libraryData: LibraryDocument[] = [
  // Form 1 Mathematics
  {
    id: '1',
    title: 'Introduction to Algebra',
    url: 'https://example.com/documents/form1-math-algebra.pdf',
    class: 'Form 1',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-01-15',
    fileSize: '2.3 MB'
  },
  {
    id: '2',
    title: 'Mathematics Past Paper 2023',
    url: 'https://example.com/documents/form1-math-past-paper-2023.pdf',
    class: 'Form 1',
    subject: 'Mathematics',
    type: 'past-papers',
    uploadedDate: '2024-01-10',
    fileSize: '1.8 MB'
  },
  {
    id: '3',
    title: 'Mathematics Scheme of Work Term 1',
    url: 'https://example.com/documents/form1-math-scheme-term1.pdf',
    class: 'Form 1',
    subject: 'Mathematics',
    type: 'schemes-of-work',
    uploadedDate: '2024-01-05',
    fileSize: '1.2 MB'
  },
  {
    id: '4',
    title: 'Mathematics Textbook Chapter 1-5',
    url: 'https://example.com/documents/form1-math-textbook-ch1-5.pdf',
    class: 'Form 1',
    subject: 'Mathematics',
    type: 'textbooks',
    uploadedDate: '2024-01-20',
    fileSize: '15.4 MB'
  },
  {
    id: '5',
    title: 'Mathematics Holiday Package',
    url: 'https://example.com/documents/form1-math-holiday-package.pdf',
    class: 'Form 1',
    subject: 'Mathematics',
    type: 'holiday-packages',
    uploadedDate: '2024-01-25',
    fileSize: '3.7 MB'
  },
  // Form 1 English
  {
    id: '6',
    title: 'Grammar Basics',
    url: 'https://example.com/documents/form1-english-grammar.pdf',
    class: 'Form 1',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-01-12',
    fileSize: '1.9 MB'
  },
  {
    id: '7',
    title: 'English Past Paper 2023',
    url: 'https://example.com/documents/form1-english-past-paper-2023.pdf',
    class: 'Form 1',
    subject: 'English',
    type: 'past-papers',
    uploadedDate: '2024-01-08',
    fileSize: '2.1 MB'
  },
  {
    id: '8',
    title: 'English Literature Textbook',
    url: 'https://example.com/documents/form1-english-literature-textbook.pdf',
    class: 'Form 1',
    subject: 'English',
    type: 'textbooks',
    uploadedDate: '2024-01-18',
    fileSize: '12.8 MB'
  },
  // Form 2 Mathematics
  {
    id: '9',
    title: 'Advanced Algebra Concepts',
    url: 'https://example.com/documents/form2-math-advanced-algebra.pdf',
    class: 'Form 2',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-01-22',
    fileSize: '2.8 MB'
  },
  {
    id: '10',
    title: 'Mathematics Past Paper 2023',
    url: 'https://example.com/documents/form2-math-past-paper-2023.pdf',
    class: 'Form 2',
    subject: 'Mathematics',
    type: 'past-papers',
    uploadedDate: '2024-01-14',
    fileSize: '2.2 MB'
  },
  // Form 2 Science
  {
    id: '11',
    title: 'Basic Chemistry Principles',
    url: 'https://example.com/documents/form2-science-chemistry.pdf',
    class: 'Form 2',
    subject: 'Science',
    type: 'lesson-notes',
    uploadedDate: '2024-01-16',
    fileSize: '3.1 MB'
  },
  {
    id: '12',
    title: 'Science Past Paper 2023',
    url: 'https://example.com/documents/form2-science-past-paper-2023.pdf',
    class: 'Form 2',
    subject: 'Science',
    type: 'past-papers',
    uploadedDate: '2024-01-11',
    fileSize: '1.7 MB'
  },
  {
    id: '13',
    title: 'Science Scheme of Work Term 2',
    url: 'https://example.com/documents/form2-science-scheme-term2.pdf',
    class: 'Form 2',
    subject: 'Science',
    type: 'schemes-of-work',
    uploadedDate: '2024-01-09',
    fileSize: '1.4 MB'
  }
];

export const classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4'];

export const subjects = ['Mathematics', 'English', 'Science', 'History', 'Geography', 'Biology', 'Chemistry', 'Physics'];

export const resourceTypes = [
  { id: 'lesson-notes', label: 'Lesson Notes' },
  { id: 'past-papers', label: 'Past Papers' },
  { id: 'schemes-of-work', label: 'Schemes of Work' },
  { id: 'textbooks', label: 'Textbooks' },
  { id: 'holiday-packages', label: 'Holiday Packages' }
];

// Function to extract file name from URL
export const extractFileName = (url: string): string => {
  try {
    const urlParts = url.split('/');
    const fileNameWithExtension = urlParts[urlParts.length - 1];
    const fileName = fileNameWithExtension.split('.')[0];
    return fileName.replace(/-/g, ' ').replace(/_/g, ' ');
  } catch (error) {
    console.error('Error extracting file name:', error);
    return 'Document';
  }
};
