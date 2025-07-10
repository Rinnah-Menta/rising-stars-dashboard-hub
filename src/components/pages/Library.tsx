
import React, { useState, useMemo } from 'react';
import { Search, Download, Eye, BookOpen, FileText, GraduationCap, Package, Clock, ArrowLeft, Filter, Grid, List, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBookshelf, setShowBookshelf] = useState(true);

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
    setShowBookshelf(false);
  };

  const handleBackToBookshelf = () => {
    setShowBookshelf(true);
    setSelectedClass('all');
    setSelectedSubject('all');
    setSelectedResourceType('all');
    setSearchTerm('');
  };

  const handlePreview = (resource: LibraryDocument) => {
    setViewingDocument(resource);
  };

  const handleDownload = (resource: LibraryDocument) => {
    // In a real implementation, this would trigger a download
    window.open(resource.url, '_blank');
  };

  const classSubjects = useMemo(() => {
    if (selectedClass === 'all') return [];
    return [...new Set(libraryData
      .filter(resource => resource.class === selectedClass)
      .map(resource => resource.subject)
    )];
  }, [selectedClass]);

  const groupedBySubject = useMemo(() => {
    const filtered = filteredResources.filter(resource => resource.class === selectedClass);
    return classSubjects.reduce((acc, subject) => {
      acc[subject] = filtered.filter(resource => resource.subject === subject);
      return acc;
    }, {} as Record<string, LibraryDocument[]>);
  }, [filteredResources, selectedClass, classSubjects]);

  const renderResourceCard = (resource: LibraryDocument) => (
    <Card key={resource.id} className="group hover:shadow-md transition-all duration-200 border-border/50">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {getResourceTypeIcon(resource.type)}
            <Badge variant="secondary" className="text-xs">
              {resourceTypes.find(rt => rt.id === resource.type)?.label}
            </Badge>
          </div>
          <Badge variant="outline" className="text-xs">
            {resource.fileSize}
          </Badge>
        </div>
        
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {resource.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{resource.subject}</span>
          <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex gap-2">
          <Button 
            size="sm" 
            variant="outline" 
            onClick={() => handlePreview(resource)}
            className="flex-1"
          >
            <Eye className="h-3 w-3 mr-1" />
            Preview
          </Button>
          <Button 
            size="sm" 
            onClick={() => handleDownload(resource)}
            className="flex-1"
          >
            <Download className="h-3 w-3 mr-1" />
            Download
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderResourceList = (resource: LibraryDocument) => (
    <Card key={resource.id} className="group hover:shadow-sm transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {getResourceTypeIcon(resource.type)}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-1 truncate group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{resource.subject}</span>
                <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
                <Badge variant="secondary" className="text-xs">
                  {resourceTypes.find(rt => rt.id === resource.type)?.label}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {resource.fileSize}
            </Badge>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => handlePreview(resource)}
            >
              <Eye className="h-3 w-3" />
            </Button>
            <Button 
              size="sm" 
              onClick={() => handleDownload(resource)}
            >
              <Download className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

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

      {showBookshelf ? (
        /* Bookshelf View */
        <div className="container mx-auto px-4 py-6">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">School Library</h1>
            <p className="text-muted-foreground">Select a class to browse educational resources</p>
          </div>
          
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
      ) : (
        /* Resources View */
        <div className="container mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button variant="ghost" onClick={handleBackToBookshelf}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{selectedClass} Resources</h1>
                <p className="text-muted-foreground">Browse and download educational materials</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {classSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={selectedResourceType} onValueChange={setSelectedResourceType}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {resourceTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>{type.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Resources Content */}
          {selectedSubject === 'all' ? (
            /* Show by subjects */
            <div className="space-y-8">
              {classSubjects.map((subject) => {
                const subjectResources = groupedBySubject[subject] || [];
                if (subjectResources.length === 0) return null;
                
                return (
                  <div key={subject}>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-semibold flex items-center gap-2">
                        <BookOpen className="h-5 w-5" />
                        {subject}
                      </h2>
                      <Badge variant="secondary">
                        {subjectResources.length} resource{subjectResources.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                    
                    <Tabs defaultValue="lesson-notes" className="w-full">
                      <TabsList className="grid w-full grid-cols-5">
                        {resourceTypes.map((type) => (
                          <TabsTrigger key={type.id} value={type.id} className="text-xs">
                            {type.label}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      
                      {resourceTypes.map((type) => {
                        const typeResources = subjectResources.filter(r => r.type === type.id);
                        return (
                          <TabsContent key={type.id} value={type.id} className="mt-4">
                            {typeResources.length > 0 ? (
                              <div className={viewMode === 'grid' 
                                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                                : "space-y-2"
                              }>
                                {typeResources.map(resource => 
                                  viewMode === 'grid' ? renderResourceCard(resource) : renderResourceList(resource)
                                )}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-muted-foreground">
                                <FileText className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p>No {type.label.toLowerCase()} available for {subject}</p>
                              </div>
                            )}
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Show filtered resources */
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{selectedSubject} Resources</h2>
                <Badge variant="secondary">
                  {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
                </Badge>
              </div>
              
              {filteredResources.length > 0 ? (
                <div className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
                  : "space-y-2"
                }>
                  {filteredResources.map(resource => 
                    viewMode === 'grid' ? renderResourceCard(resource) : renderResourceList(resource)
                  )}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">No resources found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Preview Dialog */}
      <Dialog open={!!viewingDocument} onOpenChange={() => setViewingDocument(null)}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {viewingDocument && getResourceTypeIcon(viewingDocument.type)}
              {viewingDocument?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-muted rounded-lg p-8 flex items-center justify-center">
            <div className="text-center">
              <FileText className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Document Preview</h3>
              <p className="text-muted-foreground mb-4">
                Preview functionality would be implemented here
              </p>
              <Button onClick={() => viewingDocument && handleDownload(viewingDocument)}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
