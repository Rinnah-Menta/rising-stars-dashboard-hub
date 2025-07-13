import { Student } from '@/hooks/useStudents';

// New class structure data from JSON
export const newClassData = {
  "Junior One": [
    "ABWAYO ISAAC", "ACHOM BRENDA", "ADAMA JADEN", "AGABA DANIELLA", "AGABA JANE",
    "AGENO JAYDEN", "AHIMBISIBWE JORDAN", "AHIMBISIBWE RYAN", "AJAMBO NEEMA",
    "AKASIIMA KESIENA", "AKASIIMA SHANITAH", "AKATUGBA EMMANUELLA",
    "AKELLO VIVIAN", "AKUGIZIBWE KIARA", "ALIDHA JORDAN", "AMADRU ESTHER",
    "AMANYA AARON", "AMANYA ANDREW", "AMANZI SARAH", "AMBOKA GENESIS",
    "AMIIRAH FAVOUR", "AMUHABWA NATHAN", "ANKUNDA ELIJAH", "ANKUNDA JOY",
    "ANKUNDA RUTH", "ASASIRA ETHAN", "ASASIRA JOSHUA", "ASIIMWE AARON",
    "ASIIMWE ADRIEL", "ASIIMWE ANDREW", "ASIIMWE FAVOUR", "ASIIMWE GEONA",
    "ASIIMWE JENNIFER", "ASIIMWE PATRICK", "ASIIMWE RIANNAH", "ATUHAIRE PURITY",
    "ATUKUNDE EMMANUELLA", "ATUKUNDE JONATHAN", "ATUKUNDA DARYN",
    "ATUKUNDA JENNIFER", "ATUKUNDA JETUTU", "ATUKUNDA JOANNAH",
    "ATUKUNDA PATIENCE", "ATUKUNDA VICTORIA", "ATUNGIRE ISAAC",
    "ATUNGIRE JENIFER", "ATUSIIME JOHN", "AYEBARE ALYSSA", "AYEBARE ANDREW",
    "BABIRYE JAYDEN", "BABIRYE JENNIFER", "BAGABE ENOCH", "BAKAMANYA JACOB",
    "BAKUNDA JAIRUS", "BALIMAKA ASAMAAD", "BAMANYA JACOB", "BAMWINE ASHER",
    "BARYEIJA FIONA", "BAZIRAKE EMMANUEL", "BAZIRAKE GLORIA", "BESIGENSI GABRIEL",
    "BIRUNGI NICOLE", "BWAMBARE JEREMY", "BYAMUKAMA EZRA", "BYAMUKAMA FAVOUR",
    "BYAMUKAMA GIANNA", "BYAMUKAMA HOPE", "BYAMUKAMA JENNIFER", "BYAMUKAMA NAVA",
    "BYAMUKAMA PRINCESS", "BYARUHANGA JOSEPH", "BYARUHANGA PETER", "BYANSI FAVOUR"
  ],
  "Junior Two": [
    "ADRIANA LIAM MIRIMU", "AHIMBISIBWE EMMANUEL", "ALBA PROMISE KOBUSINGYE",
    "ALBARA-U YAHAYA MUSOKE", "AMANYABYONA JOSEPH COLLINS", "ANKUNDA LIAM",
    "ATUNGIRE ELIJAH", "AVA MALAIKA DHAMUZUNGU", "BAGABE ABEL", "BIRUNGI HIDAYA",
    "BWOGI DEIGHTON", "BYAMUKAMA MATTHEW CHARLES", "DHEDONGA REHEMA MARINA",
    "EGLAH ABI GARA", "ELI TIMAO EDUBE", "FAVOUR GIDEON MAYIGA",
    "ITUNGO LIONEL RUTA", "JAKE WILLIAM KATENDE", "JEAN BRIGHT JOOGA",
    "JEAN PETER DDAMULIRA", "JEDIDIAH KAHUMA KAZOOBA", "KALULE VICTOR LEANDER",
    "KATENDE JOSIAH CHARLES", "KATONGOLE GERTRUDE", "KATONGOLE MONA",
    "KATUMBA DALTON SURPRISE", "KAWEESI JAYDEN HOPE", "KIJJAMBU MARK MORGAN",
    "KIRABO BRYSON KYLE", "KOBUFURA ASHLEY KRYSTEN", "KRYSTABELL ARIANA WAVAMUNNO",
    "KUKUNDA KIRSTEN", "LEVI GATAALI MUZIMA", "LUBEGA KERON", "MATSIKO DAN",
    "MUGENYI CALVIN", "MUKISA JESSE", "MUKULA ODYSSEUS BRIDGEOUS",
    "MULUNGI ADONAI", "MULWANA BERNICE", "MUTEBI HAFIZU KIGONGO", "MUTYABA KERON"
  ],
  "Unknown": [
    "MUTUNGI JASON", "MWANJE KIMBERLY", "NABANKEMA FAVOUR", "NABISERE CHARITY",
    "NABUKENYA BLESSING", "NABUKENYA GRACE", "NABUSOBA ARIANNA", "NAKANWAGI JANINAH",
    "NAKATUDDE BLESSING", "NAMANI HADIJAH", "NAMATOVU ARIANA", "NAMATOVU IVANA",
    "NAMBOOZE JERIEL", "NAMBOOZE MIRABELLE", "NAMIREMBE KEEVA", "NAMUDDU DANIELLA",
    "NAMUDDU PRAISE", "NAMUGALU CHARITY", "NAMUGALU MARY", "NAMUGALU REBEKAH",
    "NAMUKASA EMMANUELLA", "NAMULI SARAH", "NAMULI WINNIEFRED", "NAMWANJE DOROTHY",
    "NAMWANJA RUTH", "NAMUTEBI SARAH", "NANKABIRWA CHARITY", "NANKABIRWA PHALITA",
    "NANKANJA GRACE", "NANTABANJA CAROLINE", "NANTEZA KEEVA", "NANYANGE NELIA",
    "NANYONJO ESTHER", "NANYONJO MAURINE", "NANZIRI JOANNA", "NASASIRA JENNIFER",
    "NASASIRA MERCY", "NASUUBI RUTH", "NATUKUNDA ASHLEY", "NATUKUNDA GLORIA",
    "NATUKUNDA PRINCESS", "NATUKUNDA ROSE", "NATUKWATSA RAQUEL", "NATWIJUKA NICOLE",
    "NAYEBARE HELLEN", "NAYIGA EMMANUELLA", "NAZIIWA DANIELLA", "NAZZIWA FAITH",
    "NDAGIRE NEEMA", "NDIBWAMI GENESIS", "NDYOMUGYENYI EMMANUEL", "NDYOMUGYENYI TRUST",
    "NIBISHAKA BENIAH", "NINSIIMA ASHLEY", "NINSIIMA PRAISE", "NINSIIMA RUTH",
    "NINSIIMA SHANNON", "NISHA MALAIKA", "NIWAGABA PRAISE", "NIWOMUGABA KIMBERLY",
    "NYAMWIZA DESTINY", "NYANGOMA GEREMMY", "NZIGAMASABO SAMMY", "OBITRE KIMBERLY",
    "OJAKOL HADIJJA", "OKIRING EUNICE", "OMARA ZAKIA", "OMONY DENNIS",
    "ONAPA EMMANUELLA", "ONDOMA JOAN", "ONYWERA FLORENCE", "ONYANGO DANIELLA",
    "OSIDDA PATRICIA", "OTAI ABIGAIL", "OTIM ANTHONY", "OWOYESIGYE ANDREW",
    "OWOYESIGYE NICOLE", "OYESIGYE BRIDGET"
  ]
};

// Enhanced name matching algorithm with fuzzy matching
export class NameMatcher {
  private static normalizeString(str: string): string {
    return str.trim().toUpperCase().replace(/\s+/g, ' ');
  }

  private static splitName(fullName: string): string[] {
    return this.normalizeString(fullName).split(' ').filter(part => part.length > 0);
  }

  private static calculateSimilarity(str1: string, str2: string): number {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const editDistance = this.levenshteinDistance(longer, shorter);
    return (longer.length - editDistance) / longer.length;
  }

  private static levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
    
    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
    
    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        );
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  public static findBestMatch(targetName: string, candidateNames: string[]): {
    name: string;
    confidence: number;
    matchType: 'exact' | 'partial' | 'fuzzy' | 'none';
  } {
    const normalizedTarget = this.normalizeString(targetName);
    const targetParts = this.splitName(targetName);
    
    let bestMatch: {
      name: string;
      confidence: number;
      matchType: 'exact' | 'partial' | 'fuzzy' | 'none';
    } = {
      name: '',
      confidence: 0,
      matchType: 'none'
    };

    for (const candidateName of candidateNames) {
      const normalizedCandidate = this.normalizeString(candidateName);
      const candidateParts = this.splitName(candidateName);
      
      // Exact match
      if (normalizedTarget === normalizedCandidate) {
        return {
          name: candidateName,
          confidence: 1.0,
          matchType: 'exact'
        };
      }
      
      // Partial name match (checking if all parts of one name exist in the other)
      const targetInCandidate = targetParts.every(part => 
        candidateParts.some(cPart => cPart.includes(part) || part.includes(cPart))
      );
      const candidateInTarget = candidateParts.every(part => 
        targetParts.some(tPart => tPart.includes(part) || part.includes(tPart))
      );
      
      if (targetInCandidate || candidateInTarget) {
        const confidence = Math.max(
          targetParts.length / candidateParts.length,
          candidateParts.length / targetParts.length
        ) * 0.9; // Slightly lower than exact match
        
        if (confidence > bestMatch.confidence) {
          bestMatch = {
            name: candidateName,
            confidence,
            matchType: 'partial'
          };
        }
      }
      
      // Fuzzy string matching
      const similarity = this.calculateSimilarity(normalizedTarget, normalizedCandidate);
      if (similarity > 0.7 && similarity > bestMatch.confidence) {
        bestMatch = {
          name: candidateName,
          confidence: similarity,
          matchType: 'fuzzy'
        };
      }
      
      // Cross-check individual name parts for partial matches
      for (const targetPart of targetParts) {
        for (const candidatePart of candidateParts) {
          const partSimilarity = this.calculateSimilarity(targetPart, candidatePart);
          if (partSimilarity > 0.8) {
            const overallConfidence = partSimilarity * 0.6; // Lower confidence for partial matches
            if (overallConfidence > bestMatch.confidence) {
              bestMatch = {
                name: candidateName,
                confidence: overallConfidence,
                matchType: 'fuzzy'
              };
            }
          }
        }
      }
    }
    
    return bestMatch;
  }

  public static classifyUnknownStudents(): {
    juniorOne: string[];
    juniorTwo: string[];
    unmatched: string[];
    matches: Array<{
      unknownName: string;
      matchedName: string;
      class: 'Junior One' | 'Junior Two';
      confidence: number;
      matchType: string;
    }>;
  } {
    const result = {
      juniorOne: [] as string[],
      juniorTwo: [] as string[],
      unmatched: [] as string[],
      matches: [] as Array<{
        unknownName: string;
        matchedName: string;
        class: 'Junior One' | 'Junior Two';
        confidence: number;
        matchType: string;
      }>
    };

    const allKnownStudents = [...newClassData["Junior One"], ...newClassData["Junior Two"]];
    
    for (const unknownStudent of newClassData.Unknown) {
      const match = this.findBestMatch(unknownStudent, allKnownStudents);
      
      if (match.confidence > 0.6) { // Threshold for accepting a match
        const isInJuniorOne = newClassData["Junior One"].includes(match.name);
        const targetClass = isInJuniorOne ? 'Junior One' : 'Junior Two';
        
        if (isInJuniorOne) {
          result.juniorOne.push(unknownStudent);
        } else {
          result.juniorTwo.push(unknownStudent);
        }
        
        result.matches.push({
          unknownName: unknownStudent,
          matchedName: match.name,
          class: targetClass,
          confidence: match.confidence,
          matchType: match.matchType
        });
      } else {
        result.unmatched.push(unknownStudent);
      }
    }
    
    return result;
  }
}

// Class structure mapping
export const classMapping = {
  // Early Years
  'Baby Class': 'EY1',
  'Middle Class': 'EY2', 
  'Top Class': 'EY3',
  
  // Primary
  'Primary One': 'P1',
  'Primary Two': 'P2',
  'Primary Three': 'P3',
  'Primary Four': 'P4',
  'Primary Five': 'P5',
  'Primary Six': 'P6',
  'Primary Seven': 'P7',
  
  // Secondary
  'Senior One': 'S1',
  'Senior Two': 'S2',
  'Senior Three': 'S3',
  'Senior Four': 'S4',
  'Senior Five': 'S5',
  'Senior Six': 'S6',
  
  // New Junior Classes
  'Junior One': 'J1',
  'Junior Two': 'J2'
};

export const generateStudentId = (className: string, index: number): string => {
  const classCode = classMapping[className as keyof typeof classMapping] || 'UN';
  return `SS${classCode}${String(index + 1).padStart(3, '0')}`;
};

// Enhanced student data with proper ages and realistic details
export const generateEnhancedStudentData = (): Student[] => {
  const students: Student[] = [];
  const classification = NameMatcher.classifyUnknownStudents();
  
  // Helper function to generate realistic parent names
  const generateParentName = (studentName: string): string => {
    const lastNameMatch = studentName.match(/(\w+)$/);
    const lastName = lastNameMatch ? lastNameMatch[1] : 'Guardian';
    const parentFirstNames = ['John', 'Mary', 'David', 'Sarah', 'Peter', 'Grace', 'James', 'Rose', 'Paul', 'Jane'];
    const randomFirst = parentFirstNames[Math.floor(Math.random() * parentFirstNames.length)];
    return `${randomFirst} ${lastName}`;
  };

  // Helper function to get realistic ages by class
  const getAgeByClass = (className: string): number => {
    const ageRanges: Record<string, [number, number]> = {
      'Baby Class': [3, 4],
      'Middle Class': [4, 5],
      'Top Class': [5, 6],
      'Primary One': [6, 7],
      'Primary Two': [7, 8],
      'Primary Three': [8, 9],
      'Primary Four': [9, 10],
      'Primary Five': [10, 11],
      'Primary Six': [11, 12],
      'Primary Seven': [12, 13],
      'Senior One': [13, 14],
      'Senior Two': [14, 15],
      'Senior Three': [15, 16],
      'Senior Four': [16, 17],
      'Senior Five': [17, 18],
      'Senior Six': [18, 19],
      'Junior One': [13, 14],
      'Junior Two': [14, 15]
    };
    
    const [min, max] = ageRanges[className] || [10, 12];
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Process all class data
  Object.entries(newClassData).forEach(([className, names]) => {
    if (className === 'Unknown') return; // Skip unknown for now
    
    names.forEach((name, index) => {
      const student: Student = {
        id: generateStudentId(className, index),
        name: name,
        class: className,
        age: getAgeByClass(className),
        parent: generateParentName(name),
        phone: `+256 ${Math.floor(700000000 + Math.random() * 100000000)}`,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}.pupil@springingstars.ac.ug`,
        address: `${Math.floor(Math.random() * 999) + 1} ${['Kampala', 'Entebbe', 'Mukono', 'Jinja'][Math.floor(Math.random() * 4)]}, Uganda`,
        status: 'active' as const
      };
      students.push(student);
    });
  });

  // Process classified unknown students
  classification.juniorOne.forEach((name, index) => {
    const student: Student = {
      id: generateStudentId('Junior One', newClassData["Junior One"].length + index),
      name: name,
      class: 'Junior One',
      age: getAgeByClass('Junior One'),
      parent: generateParentName(name),
      phone: `+256 ${Math.floor(700000000 + Math.random() * 100000000)}`,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}.pupil@springingstars.ac.ug`,
      address: `${Math.floor(Math.random() * 999) + 1} ${['Kampala', 'Entebbe', 'Mukono', 'Jinja'][Math.floor(Math.random() * 4)]}, Uganda`,
      status: 'active' as const
    };
    students.push(student);
  });

  classification.juniorTwo.forEach((name, index) => {
    const student: Student = {
      id: generateStudentId('Junior Two', newClassData["Junior Two"].length + index),
      name: name,
      class: 'Junior Two',
      age: getAgeByClass('Junior Two'),
      parent: generateParentName(name),
      phone: `+256 ${Math.floor(700000000 + Math.random() * 100000000)}`,
      
      email: `${name.toLowerCase().replace(/\s+/g, '.')}.pupil@springingstars.ac.ug`,
      address: `${Math.floor(Math.random() * 999) + 1} ${['Kampala', 'Entebbe', 'Mukono', 'Jinja'][Math.floor(Math.random() * 4)]}, Uganda`,
      status: 'active' as const
    };
    students.push(student);
  });

  // Handle unmatched students - assign them to a general "Unclassified" group
  classification.unmatched.forEach((name, index) => {
    const student: Student = {
      id: `SSUN${String(index + 1).padStart(3, '0')}`,
      name: name,
      class: 'Unclassified',
      age: 14, // Default age
      parent: generateParentName(name),
      phone: `+256 ${Math.floor(700000000 + Math.random() * 100000000)}`,
      
      email: `${name.toLowerCase().replace(/\s+/g, '.')}.pupil@springingstars.ac.ug`,
      address: `${Math.floor(Math.random() * 999) + 1} Kampala, Uganda`,
      status: 'active' as const
    };
    students.push(student);
  });

  return students;
};

// Export classification results for reporting
export const getClassificationReport = () => {
  return NameMatcher.classifyUnknownStudents();
};