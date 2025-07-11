export interface StudentData {
  id: string;
  email: string;
  password: string;
  role: 'pupil';
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  gender: 'Male' | 'Female';
  class: string;
  birthDate: string;
  address: string;
  phone: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  emergencyContact: string;
  emergencyPhone: string;
  avatar: string;
  joinDate: string;
  studentId: string;
  nationality: string;
  religion: string;
  bloodGroup: string;
  allergies: string;
  medicalConditions: string;
  previousSchool: string;
  admissionDate: string;
  dormitory: string;
  house: string;
  bio: string;
  accountStatus: 'active' | 'suspended' | 'archived' | 'deleted';
  statusReason?: string;
  statusDate?: string;
  suspensionEndDate?: string;
  statusUpdatedBy?: string;
  nextSteps?: string;
}

// Generate student ID helper
const generateStudentId = (index: number): string => {
  return `SS${new Date().getFullYear()}${String(index + 1).padStart(3, '0')}`;
};

// Generate email from name
const generateEmail = (firstName: string, lastName: string): string => {
  return `${firstName.toLowerCase()}.${lastName.toLowerCase()}@pupil.springingstars.ac.ug`;
};

// Generate avatar URL
const generateAvatarUrl = (fullName: string): string => {
  return `https://fresh-teacher-uganda.github.io/talk-of-the-day/src/assets/photos/${encodeURIComponent(fullName)}.JPG`;
};

// Parse full name into components
const parseName = (fullName: string) => {
  const nameParts = fullName.trim().split(' ');
  const firstName = nameParts[0] || '';
  const lastName = nameParts[nameParts.length - 1] || '';
  const middleName = nameParts.slice(1, -1).join(' ') || '';
  
  return { firstName, middleName, lastName };
};

// Student names list
const studentNames = [
  "ADRIANA LIAM MIRIMU",
  "AHIMBISIBWE EMMANUEL",
  "ALBA PROMISE KOBUSINGYE",
  "ALBARA-U YAHAYA MUSOKE",
  "AMANYABYONA JOSEPH COLLINS",
  "ANKUNDA LIAM",
  "ATUNGIRE ELIJAH",
  "AVA MALAIKA DHAMUZUNGU",
  "BAGABE ABEL",
  "BIRUNGI HIDAYA",
  "BWOGI DEIGHTON",
  "BYAMUKAMA MATTHEW CHARLES",
  "DHEDONGA REHEMA MARINA",
  "EGLAH ABI GARA",
  "ELI TIMAO EDUBE",
  "FAVOUR GIDEON MAYIGA",
  "ITUNGO LIONEL RUTA",
  "JAKE WILLIAM KATENDE",
  "JEAN BRIGHT  JOOGA",
  "JEAN PETER DDAMULIRA",
  "JEDIDIAH KAHUMA KAZOOBA",
  "KALULE VICTOR LEANDER",
  "KATENDE JOSIAH CHARLES",
  "KATONGOLE GERTRUDE",
  "KATONGOLE MONA",
  "KATUMBA DALTON SURPRISE",
  "KAWEESI JAYDEN HOPE",
  "KIJJAMBU MARK MORGAN",
  "KIRABO BRYSON KYLE",
  "KOBUFURA ASHLEY KRYSTEN",
  "KRYSTABELL ARIANA WAVAMUNNO",
  "KUKUNDA KIRSTEN",
  "LEVI GATAALI MUZIMA",
  "LUBEGA KERON",
  "MATSIKO DAN",
  "MUGENYI CALVIN",
  "MUKISA JESSE",
  "MUKULA ODYSSEUS BRIDGEOUS",
  "MULUNGI ADONAI",
  "MULWANA BERNICE",
  "MUTEBI HAFIZU KIGONGO",
  "MUTYABA KERON",
  "MUWANGUZI ISRAEL",
  "MWIZA ATALIA ABRIELLE",
  "MWIZA MARTHA KIMBERLY",
  "NABUKENYA SAMANTHA",
  "NABUULE ELIANA MALAIKA KAYE",
  "NABUYONDO NAIRAH",
  "NAKADDU ELLYVICK",
  "NAKAMATTE NORAH CHRISTINE",
  "NAKANWAGI JEAN ALBA",
  "NAKAYIWA ESTHER",
  "NAKITTO RASHIMAH",
  "NALUBOWA ALLISON JULIET",
  "NALUTAAYA PETRONILLAH",
  "NAMAKULA SOPHIA",
  "NAMBAJJWE VALERIA",
  "NANSUBUGA THEO ELSIE",
  "NATUMI SHAHID PAPA",
  "NAZEBA LEO",
  "NOWAMANI SHARAPOVA",
  "NTAMBAZI JEISON JOSEPH",
  "NYABUN BITH",
  "NYESIGA OTHNIEL",
  "ODEKE MIRACLE DANIEL",
  "OJAMBO DEVLIN PAUL",
  "OWORI CALVIN FRANKLIN",
  "PRIA ANGEL",
  "RUKUNDO ELIZABETH",
  "RUKUNDO FAITH CANTY",
  "SSEMPA MALCOM MATHEW",
  "SSEMPEBWA JONATHAN GIDEON",
  "SSENGENDO VICTORIA MIRACLE",
  "SSENGOOBA TENDO ENOCK",
  "SSENYIMBA DON ELIJAH",
  "SSENYONGA ELIJAH ADRIAN",
  "SUKU HOLLY LAELLE",
  "TAMARA AVA MULUNGI NDUGWA",
  "TWEBAZE ESTHER",
  "WASAJJA CHARLES DICKENS"
];

// Classes available
const classes = [
  "Baby Class", "Middle Class", "Top Class",
  "Primary One", "Primary Two", "Primary Three", "Primary Four",
  "Primary Five", "Primary Six", "Primary Seven",
  "Senior One", "Senior Two", "Senior Three", "Senior Four", "Senior Five", "Senior Six"
];

// Houses available
const houses = ["Red House", "Blue House", "Green House", "Yellow House"];

// Dormitories available
const dormitories = ["Sunrise Dormitory", "Sunset Dormitory", "Rainbow Dormitory", "Star Dormitory"];

// Generate dummy data for missing fields
const generateDummyData = (index: number) => {
  const genders = ['Male', 'Female'];
  const religions = ['Christianity', 'Islam', 'Other'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const nationalities = ['Ugandan', 'Kenyan', 'Tanzanian', 'Rwandan'];
  
  return {
    gender: genders[index % 2] as 'Male' | 'Female',
    class: classes[index % classes.length],
    birthDate: `${2010 + (index % 8)}-${String((index % 12) + 1).padStart(2, '0')}-${String((index % 28) + 1).padStart(2, '0')}`,
    address: `Plot ${100 + index}, ${['Kampala', 'Entebbe', 'Jinja', 'Mbale'][index % 4]}, Uganda`,
    phone: `+256${700000000 + index}`,
    nationality: nationalities[index % nationalities.length],
    religion: religions[index % religions.length],
    bloodGroup: bloodGroups[index % bloodGroups.length],
    allergies: index % 5 === 0 ? 'Peanuts' : 'None',
    medicalConditions: index % 7 === 0 ? 'Asthma' : 'None',
    previousSchool: index % 3 === 0 ? 'Rainbow Primary School' : 'None',
    admissionDate: `${2020 + (index % 5)}-01-15`,
    joinDate: `${2020 + (index % 5)}-01-15`,
    dormitory: dormitories[index % dormitories.length],
    house: houses[index % houses.length],
    bio: `I am a dedicated student at Springing Stars Academy. I enjoy learning and participating in school activities.`,
    accountStatus: 'active' as const
  };
};

// Generate student data
const generateStudentsArray = (): StudentData[] => studentNames.map((fullName, index) => {
  const { firstName, middleName, lastName } = parseName(fullName);
  const dummyData = generateDummyData(index);
  
  return {
    id: `student_${index + 1}`,
    email: generateEmail(firstName, lastName),
    password: 'pupil123',
    role: 'pupil',
    firstName,
    middleName,
    lastName,
    fullName,
    parentName: `Mr. & Mrs. ${lastName}`,
    parentPhone: `+256${750000000 + index}`,
    parentEmail: `parent.${firstName.toLowerCase()}.${lastName.toLowerCase()}@gmail.com`,
    emergencyContact: `Mr. & Mrs. ${lastName}`,
    emergencyPhone: `+256${750000000 + index}`,
    avatar: generateAvatarUrl(fullName),
    studentId: generateStudentId(index),
    ...dummyData
  };
});

// Export in the requested format
export const localStudentDatabase = {
  users: generateStudentsArray()
};

// CRUD Operations
export class StudentDataManager {
  private static data: StudentData[] = [...localStudentDatabase.users];

  // Create - Add new student
  static createStudent(studentData: Omit<StudentData, 'id'>): StudentData {
    const newStudent: StudentData = {
      ...studentData,
      id: `student_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    };
    this.data.push(newStudent);
    return newStudent;
  }

  // Read - Get all students
  static getAllStudents(): StudentData[] {
    return [...this.data];
  }

  // Read - Get student by ID
  static getStudentById(id: string): StudentData | null {
    return this.data.find(student => student.id === id) || null;
  }

  // Read - Get student by email
  static getStudentByEmail(email: string): StudentData | null {
    return this.data.find(student => student.email === email) || null;
  }

  // Read - Get students by class
  static getStudentsByClass(className: string): StudentData[] {
    return this.data.filter(student => student.class === className);
  }

  // Read - Search students
  static searchStudents(query: string): StudentData[] {
    const lowercaseQuery = query.toLowerCase();
    return this.data.filter(student => 
      student.fullName.toLowerCase().includes(lowercaseQuery) ||
      student.email.toLowerCase().includes(lowercaseQuery) ||
      student.studentId.toLowerCase().includes(lowercaseQuery) ||
      student.class.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Update - Update student data
  static updateStudent(id: string, updates: Partial<Omit<StudentData, 'id'>>): StudentData | null {
    const index = this.data.findIndex(student => student.id === id);
    if (index === -1) return null;

    this.data[index] = { ...this.data[index], ...updates };
    return this.data[index];
  }

  // Update - Update student profile
  static updateStudentProfile(id: string, profileData: {
    firstName?: string;
    middleName?: string;
    lastName?: string;
    gender?: 'Male' | 'Female';
    birthDate?: string;
    address?: string;
    phone?: string;
    bio?: string;
    emergencyContact?: string;
    emergencyPhone?: string;
  }): StudentData | null {
    const updates: Partial<StudentData> = { ...profileData };
    
    // Update full name if name parts changed
    if (profileData.firstName || profileData.lastName) {
      const student = this.getStudentById(id);
      if (student) {
        const firstName = profileData.firstName || student.firstName;
        const middleName = profileData.middleName || student.middleName;
        const lastName = profileData.lastName || student.lastName;
        updates.fullName = `${firstName} ${middleName} ${lastName}`.replace(/\s+/g, ' ').trim();
        updates.email = generateEmail(firstName, lastName);
      }
    }

    return this.updateStudent(id, updates);
  }

  // Update - Change student class
  static changeStudentClass(id: string, newClass: string): StudentData | null {
    return this.updateStudent(id, { class: newClass });
  }

  // Update - Update account status
  static updateAccountStatus(
    id: string, 
    status: 'active' | 'suspended' | 'archived' | 'deleted',
    reason?: string,
    updatedBy?: string,
    suspensionEndDate?: string,
    nextSteps?: string
  ): StudentData | null {
    return this.updateStudent(id, {
      accountStatus: status,
      statusReason: reason,
      statusDate: new Date().toISOString(),
      statusUpdatedBy: updatedBy,
      suspensionEndDate,
      nextSteps
    });
  }

  // Delete - Remove student (soft delete)
  static deleteStudent(id: string, reason?: string, deletedBy?: string): boolean {
    const student = this.updateAccountStatus(id, 'deleted', reason, deletedBy);
    return student !== null;
  }

  // Delete - Permanently remove student
  static permanentlyDeleteStudent(id: string): boolean {
    const index = this.data.findIndex(student => student.id === id);
    if (index === -1) return false;

    this.data.splice(index, 1);
    return true;
  }

  // Utility - Get statistics
  static getStatistics() {
    const total = this.data.length;
    const active = this.data.filter(s => s.accountStatus === 'active').length;
    const suspended = this.data.filter(s => s.accountStatus === 'suspended').length;
    const archived = this.data.filter(s => s.accountStatus === 'archived').length;
    
    const classCounts = this.data.reduce((acc, student) => {
      acc[student.class] = (acc[student.class] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const genderCounts = this.data.reduce((acc, student) => {
      acc[student.gender] = (acc[student.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total,
      active,
      suspended,
      archived,
      classCounts,
      genderCounts
    };
  }

  // Utility - Export data
  static exportData(): StudentData[] {
    return this.getAllStudents();
  }

  // Utility - Import data
  static importData(students: StudentData[]): void {
    this.data = [...students];
  }

  // Utility - Reset to default data
  static resetToDefault(): void {
    this.data = [...localStudentDatabase.users];
  }
}

// Export default data for easy access
export default localStudentDatabase;