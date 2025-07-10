
import React, { useState, useMemo } from 'react';
import { Search, Download, Eye, BookOpen, FileText, GraduationCap, Package, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LibraryDocument, libraryData, classes, subjects, resourceTypes } from '@/data/libraryData';

// Import unique book cover images with distinct designs for each class
import babyClassImg from '@/assets/books/baby-class-new.jpg';
import middleClassImg from '@/assets/books/middle-class-new.jpg';
import topClassImg from '@/assets/books/top-class-new.jpg';
import primaryOneImg from '@/assets/books/primary-one-new.jpg';
import primaryTwoImg from '@/assets/books/primary-two-new.jpg';
import primaryThreeImg from '@/assets/books/primary-three-new.jpg';
import primaryFourImg from '@/assets/books/primary-four-new.jpg';
import primaryFiveImg from '@/assets/books/primary-five-new.jpg';
import primarySixImg from '@/assets/books/primary-six-new.jpg';
import primarySevenImg from '@/assets/books/primary-seven-new.jpg';

const classImages = {
  'Baby Class': babyClassImg,
  'Middle Class': middleClassImg,
  'Top Class': topClassImg,
  'Primary One': primaryOneImg,
  'Primary Two': primaryTwoImg,
  'Primary Three': primaryThreeImg,
  'Primary Four': primaryFourImg,
  'Primary Five': primaryFiveImg,
  'Primary Six': primarySixImg,
  'Primary Seven': primarySevenImg,
};

const getResourceTypeIcon = (type: string) => {
  switch (type) {
    case 'lesson-notes': return <FileText className="h-4 w-4" />;
    case 'past-papers': return <GraduationCap className="h-4 w-4" />;
    case 'schemes-of-work': return <BookOpen className="h-4 w-4" />;
    case 'textbooks': return <BookOpen className="h-4 w-4" />;
    case 'holiday-packages': return <Package className="h-4 w-4" />;
    default: return <FileText className="h-4 w-4" />;
  }
};

export const Library: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingDocument, setViewingDocument] = useState<LibraryDocument | null>(null);

  const filteredResources = useMemo(() => {
    return libraryData.filter(resource => {
      const matchesClass = selectedClass === 'all' || resource.class === selectedClass;
      const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
      const matchesType = selectedResourceType === 'all' || resource.type === selectedResourceType;
      const matchesSearch = !searchTerm || 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.class.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesClass && matchesSubject && matchesType && matchesSearch;
    });
  }, [selectedClass, selectedSubject, selectedResourceType, searchTerm]);

  const handleClassSelect = (classKey: string) => {
    setSelectedClass(classKey);
    setSelectedSubject('all');
    setSelectedResourceType('all');
  };

  const handlePreview = (resource: LibraryDocument) => {
    setViewingDocument(resource);
  };

  const handleDownload = (resource: LibraryDocument) => {
    window.open(resource.url, '_blank');
  };

  const classSubjects = useMemo(() => {
    if (selectedClass === 'all') return [];
    return [...new Set(libraryData
      .filter(resource => resource.class === selectedClass)
      .map(resource => resource.subject)
    )];
  }, [selectedClass]);

  return (
    <div className="min-h-screen bg-background">
      {/* Custom CSS for bookshelf */}
      <style>{`
        .bookshelf .thumb {
          display: inline-block;
          cursor: pointer;
          margin: 0px 0.5%;
          width: 15% !important;
          box-shadow: 0px 1px 3px rgba(0, 0, 0, .3);
          max-width: 120px;
        }

        .bookshelf .thumb img {
          width: 100%;
          display: block;
          vertical-align: top;
        }

        .bookshelf .shelf-img {
          z-index: 0;
          height: auto;
          max-width: 100%;
          vertical-align: top;
          margin-top: -12px;
        }

        .bookshelf .covers {
          width: 100%;
          height: auto;
          z-index: 99;
          text-align: center;
        }

        .bookshelf {
          text-align: center;
          padding: 0px;
        }

        /* Mobile responsive styles */
        @media (max-width: 768px) {
          .bookshelf .thumb {
            width: 30% !important;
            max-width: 140px;
            margin: 0px 1.5%;
          }
          
          .bookshelf .shelf-img {
            margin-top: -8px;
          }
          
          .mobile-shelf {
            margin-bottom: 2rem;
          }
        }
      `}</style>

      {/* Content Area - Only Bookshelf */}
      <div className="container mx-auto px-4 py-6">
        <div className="container">
          <div className="page-wrapper">
            {/* First Shelf - Nursery Classes */}
            <div className="bookshelf">
              <div className="covers">
                {['Baby Class', 'Middle Class', 'Top Class'].map((classKey) => (
                  <div key={classKey} className="thumb book-1">
                    <button onClick={() => handleClassSelect(classKey)}>
                      <img src={classImages[classKey as keyof typeof classImages]} alt={classKey} />
                    </button>
                  </div>
                ))}
              </div>
              <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
            </div>
            <br />

            {/* Second Shelf - Lower Primary */}
            <div className="bookshelf">
              <div className="covers">
                {['Primary One', 'Primary Two', 'Primary Three'].map((classKey) => (
                  <div key={classKey} className="thumb book-1">
                    <button onClick={() => handleClassSelect(classKey)}>
                      <img src={classImages[classKey as keyof typeof classImages]} alt={classKey} />
                    </button>
                  </div>
                ))}
              </div>
              <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
            </div>
            <br />

            {/* Third Shelf - Upper Primary Part 1 */}
            <div className="bookshelf">
              <div className="covers">
                {['Primary Four', 'Primary Five', 'Primary Six'].map((classKey) => (
                  <div key={classKey} className="thumb book-1">
                    <button onClick={() => handleClassSelect(classKey)}>
                      <img src={classImages[classKey as keyof typeof classImages]} alt={classKey} />
                    </button>
                  </div>
                ))}
              </div>
              <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
            </div>
            <br />

            {/* Fourth Shelf - Upper Primary Part 2 */}
            <div className="bookshelf">
              <div className="covers">
                <div className="thumb book-1">
                  <button onClick={() => handleClassSelect('Primary Seven')}>
                    <img src={classImages['Primary Seven']} alt="Primary Seven" />
                  </button>
                </div>
              </div>
              <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
