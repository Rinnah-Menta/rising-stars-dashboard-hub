
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
  // Baby Class
  {
    id: '1',
    title: 'Basic Numbers and Counting',
    url: 'https://example.com/documents/baby-class-numbers.pdf',
    class: 'Baby Class',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-01-15',
    fileSize: '1.2 MB'
  },
  {
    id: '2',
    title: 'Baby Class Activity Book',
    url: 'https://example.com/documents/baby-class-activities.pdf',
    class: 'Baby Class',
    subject: 'Mathematics',
    type: 'textbooks',
    uploadedDate: '2024-01-20',
    fileSize: '3.5 MB'
  },
  {
    id: '3',
    title: 'Simple English Words',
    url: 'https://example.com/documents/baby-class-english.pdf',
    class: 'Baby Class',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-01-18',
    fileSize: '1.8 MB'
  },
  
  // Middle Class
  {
    id: '4',
    title: 'Addition and Subtraction',
    url: 'https://example.com/documents/middle-class-math.pdf',
    class: 'Middle Class',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-01-22',
    fileSize: '2.1 MB'
  },
  {
    id: '5',
    title: 'Reading and Writing Practice',
    url: 'https://example.com/documents/middle-class-english.pdf',
    class: 'Middle Class',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-01-25',
    fileSize: '1.9 MB'
  },
  {
    id: '6',
    title: 'Middle Class Holiday Package',
    url: 'https://example.com/documents/middle-class-holiday.pdf',
    class: 'Middle Class',
    subject: 'Mathematics',
    type: 'holiday-packages',
    uploadedDate: '2024-01-30',
    fileSize: '2.8 MB'
  },

  // Top Class
  {
    id: '7',
    title: 'Multiplication Tables',
    url: 'https://example.com/documents/top-class-multiplication.pdf',
    class: 'Top Class',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-02-01',
    fileSize: '1.7 MB'
  },
  {
    id: '8',
    title: 'Grammar Basics',
    url: 'https://example.com/documents/top-class-grammar.pdf',
    class: 'Top Class',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-02-03',
    fileSize: '2.0 MB'
  },
  {
    id: '9',
    title: 'Science for Beginners',
    url: 'https://example.com/documents/top-class-science.pdf',
    class: 'Top Class',
    subject: 'Science',
    type: 'lesson-notes',
    uploadedDate: '2024-02-05',
    fileSize: '2.5 MB'
  },

  // Primary One
  {
    id: '10',
    title: 'Introduction to Numbers',
    url: 'https://example.com/documents/primary-one-numbers.pdf',
    class: 'Primary One',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-02-10',
    fileSize: '1.5 MB'
  },
  {
    id: '11',
    title: 'Primary One Mathematics Textbook',
    url: 'https://example.com/documents/primary-one-math-textbook.pdf',
    class: 'Primary One',
    subject: 'Mathematics',
    type: 'textbooks',
    uploadedDate: '2024-02-12',
    fileSize: '5.2 MB'
  },
  {
    id: '12',
    title: 'Reading and Comprehension',
    url: 'https://example.com/documents/primary-one-reading.pdf',
    class: 'Primary One',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-02-14',
    fileSize: '2.1 MB'
  },
  {
    id: '13',
    title: 'Mathematics Past Paper 2023',
    url: 'https://example.com/documents/primary-one-math-past-paper.pdf',
    class: 'Primary One',
    subject: 'Mathematics',
    type: 'past-papers',
    uploadedDate: '2024-02-16',
    fileSize: '1.8 MB'
  },
  {
    id: '14',
    title: 'Term 1 Scheme of Work - Mathematics',
    url: 'https://example.com/documents/primary-one-math-scheme.pdf',
    class: 'Primary One',
    subject: 'Mathematics',
    type: 'schemes-of-work',
    uploadedDate: '2024-02-18',
    fileSize: '1.3 MB'
  },

  // Primary Two
  {
    id: '15',
    title: 'Addition and Subtraction Methods',
    url: 'https://example.com/documents/primary-two-addition.pdf',
    class: 'Primary Two',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-02-20',
    fileSize: '1.9 MB'
  },
  {
    id: '16',
    title: 'English Grammar Fundamentals',
    url: 'https://example.com/documents/primary-two-grammar.pdf',
    class: 'Primary Two',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-02-22',
    fileSize: '2.3 MB'
  },
  {
    id: '17',
    title: 'Science for Primary Two',
    url: 'https://example.com/documents/primary-two-science.pdf',
    class: 'Primary Two',
    subject: 'Science',
    type: 'lesson-notes',
    uploadedDate: '2024-02-24',
    fileSize: '2.7 MB'
  },
  {
    id: '18',
    title: 'Holiday Mathematics Package',
    url: 'https://example.com/documents/primary-two-holiday-math.pdf',
    class: 'Primary Two',
    subject: 'Mathematics',
    type: 'holiday-packages',
    uploadedDate: '2024-02-26',
    fileSize: '3.1 MB'
  },

  // Primary Three
  {
    id: '19',
    title: 'Multiplication and Division',
    url: 'https://example.com/documents/primary-three-multiplication.pdf',
    class: 'Primary Three',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-03-01',
    fileSize: '2.0 MB'
  },
  {
    id: '20',
    title: 'Creative Writing Skills',
    url: 'https://example.com/documents/primary-three-writing.pdf',
    class: 'Primary Three',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-03-03',
    fileSize: '1.8 MB'
  },
  {
    id: '21',
    title: 'Living and Non-living Things',
    url: 'https://example.com/documents/primary-three-living-things.pdf',
    class: 'Primary Three',
    subject: 'Science',
    type: 'lesson-notes',
    uploadedDate: '2024-03-05',
    fileSize: '2.4 MB'
  },
  {
    id: '22',
    title: 'Social Studies - Our Community',
    url: 'https://example.com/documents/primary-three-social-studies.pdf',
    class: 'Primary Three',
    subject: 'Social Studies',
    type: 'lesson-notes',
    uploadedDate: '2024-03-07',
    fileSize: '2.2 MB'
  },

  // Primary Four
  {
    id: '23',
    title: 'Fractions and Decimals',
    url: 'https://example.com/documents/primary-four-fractions.pdf',
    class: 'Primary Four',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-03-10',
    fileSize: '2.5 MB'
  },
  {
    id: '24',
    title: 'Mathematics Past Paper 2023',
    url: 'https://example.com/documents/primary-four-math-past-paper.pdf',
    class: 'Primary Four',
    subject: 'Mathematics',
    type: 'past-papers',
    uploadedDate: '2024-03-12',
    fileSize: '2.1 MB'
  },
  {
    id: '25',
    title: 'English Comprehension Skills',
    url: 'https://example.com/documents/primary-four-comprehension.pdf',
    class: 'Primary Four',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-03-14',
    fileSize: '2.0 MB'
  },
  {
    id: '26',
    title: 'Matter and Energy',
    url: 'https://example.com/documents/primary-four-matter.pdf',
    class: 'Primary Four',
    subject: 'Science',
    type: 'lesson-notes',
    uploadedDate: '2024-03-16',
    fileSize: '2.8 MB'
  },

  // Primary Five
  {
    id: '27',
    title: 'Geometry and Measurements',
    url: 'https://example.com/documents/primary-five-geometry.pdf',
    class: 'Primary Five',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-03-18',
    fileSize: '2.3 MB'
  },
  {
    id: '28',
    title: 'Literature and Poetry',
    url: 'https://example.com/documents/primary-five-literature.pdf',
    class: 'Primary Five',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-03-20',
    fileSize: '2.1 MB'
  },
  {
    id: '29',
    title: 'Science Scheme of Work',
    url: 'https://example.com/documents/primary-five-science-scheme.pdf',
    class: 'Primary Five',
    subject: 'Science',
    type: 'schemes-of-work',
    uploadedDate: '2024-03-22',
    fileSize: '1.7 MB'
  },

  // Primary Six
  {
    id: '30',
    title: 'Advanced Mathematics Concepts',
    url: 'https://example.com/documents/primary-six-advanced-math.pdf',
    class: 'Primary Six',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-03-24',
    fileSize: '2.9 MB'
  },
  {
    id: '31',
    title: 'Primary Six Mathematics Textbook',
    url: 'https://example.com/documents/primary-six-math-textbook.pdf',
    class: 'Primary Six',
    subject: 'Mathematics',
    type: 'textbooks',
    uploadedDate: '2024-03-26',
    fileSize: '8.5 MB'
  },
  {
    id: '32',
    title: 'Essay Writing Techniques',
    url: 'https://example.com/documents/primary-six-essay-writing.pdf',
    class: 'Primary Six',
    subject: 'English',
    type: 'lesson-notes',
    uploadedDate: '2024-03-28',
    fileSize: '2.2 MB'
  },

  // Primary Seven
  {
    id: '33',
    title: 'Algebra and Problem Solving',
    url: 'https://example.com/documents/primary-seven-algebra.pdf',
    class: 'Primary Seven',
    subject: 'Mathematics',
    type: 'lesson-notes',
    uploadedDate: '2024-03-30',
    fileSize: '3.1 MB'
  },
  {
    id: '34',
    title: 'PLE Mathematics Past Papers',
    url: 'https://example.com/documents/primary-seven-ple-math.pdf',
    class: 'Primary Seven',
    subject: 'Mathematics',
    type: 'past-papers',
    uploadedDate: '2024-04-01',
    fileSize: '4.2 MB'
  },
  {
    id: '35',
    title: 'English Past Papers Collection',
    url: 'https://example.com/documents/primary-seven-english-past-papers.pdf',
    class: 'Primary Seven',
    subject: 'English',
    type: 'past-papers',
    uploadedDate: '2024-04-03',
    fileSize: '3.8 MB'
  },
  {
    id: '36',
    title: 'Science Past Papers',
    url: 'https://example.com/documents/primary-seven-science-past-papers.pdf',
    class: 'Primary Seven',
    subject: 'Science',
    type: 'past-papers',
    uploadedDate: '2024-04-05',
    fileSize: '3.5 MB'
  },
  {
    id: '37',
    title: 'Social Studies Past Papers',
    url: 'https://example.com/documents/primary-seven-sst-past-papers.pdf',
    class: 'Primary Seven',
    subject: 'Social Studies',
    type: 'past-papers',
    uploadedDate: '2024-04-07',
    fileSize: '3.2 MB'
  },
  {
    id: '38',
    title: 'PLE Preparation Holiday Package',
    url: 'https://example.com/documents/primary-seven-ple-holiday.pdf',
    class: 'Primary Seven',
    subject: 'Mathematics',
    type: 'holiday-packages',
    uploadedDate: '2024-04-09',
    fileSize: '5.1 MB'
  }
];

export const classes = ['Baby Class', 'Middle Class', 'Top Class', 'Primary One', 'Primary Two', 'Primary Three', 'Primary Four', 'Primary Five', 'Primary Six', 'Primary Seven'];

export const subjects = ['Mathematics', 'English', 'Science', 'Social Studies', 'Religious Education', 'Art', 'Physical Education'];

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
