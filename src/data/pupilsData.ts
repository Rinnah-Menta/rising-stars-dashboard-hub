import { Student } from '@/hooks/useStudents';
import { pupilsDatabase, type PupilRecord } from './pupilsDatabase';

// Convert pupil database records to Student format
export const generateStudentsFromDatabase = (): Student[] => {
  return pupilsDatabase.map((pupil: PupilRecord) => ({
    id: pupil.id,
    name: pupil.name,
    class: pupil.class,
    age: pupil.age,
    parent: pupil.parent,
    phone: pupil.phone,
    fees: pupil.fees,
    status: pupil.status,
    photo: pupil.photo, // Optional - some pupils may not have photos
    email: pupil.email,
    address: pupil.address
  }));
};

export const getPhotoPath = (photoFileName: string): string => {
  return `src/assets/photos/${photoFileName}`;
};