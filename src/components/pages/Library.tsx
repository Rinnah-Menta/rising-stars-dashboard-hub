import React, { useState, useMemo } from 'react';
import { Search, Download, Eye, BookOpen, FileText, GraduationCap, Package, Clock, ArrowLeft, Grid, List, ExternalLink, Menu, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AdvancedPagination } from '@/components/ui/pagination-advanced';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { LibraryDocument, libraryData, classes, subjects, resourceTypes } from '@/data/libraryData';

// Import unique book cover images
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

type NavigationStep = 'bookshelf' | 'class-overview' | 'resource-type' | 'resource-list';

export const Library: React.FC = () => {
  // Navigation state
  const [currentStep, setCurrentStep] = useState<NavigationStep>('bookshelf');
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedResourceType, setSelectedResourceType] = useState<string>('');
  
  // Filter and search state
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewingDocument, setViewingDocument] = useState<LibraryDocument | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20);
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get filtered resources based on current step and filters
  const filteredResources = useMemo(() => {
    let resources = libraryData;

    if (currentStep === 'resource-list' && selectedClass && selectedResourceType) {
      resources = resources.filter(resource => 
        resource.class === selectedClass && resource.type === selectedResourceType
      );
    } else if (currentStep === 'class-overview' && selectedClass) {
      resources = resources.filter(resource => resource.class === selectedClass);
    }

    // Apply subject filter
    if (selectedSubject !== 'all') {
      resources = resources.filter(resource => resource.subject === selectedSubject);
    }

    // Apply search filter
    if (searchTerm) {
      resources = resources.filter(resource => 
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.class.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return resources;
  }, [currentStep, selectedClass, selectedResourceType, selectedSubject, searchTerm]);

  // Pagination logic
  const totalPages = Math.ceil(filteredResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedResources = filteredResources.slice(startIndex, startIndex + itemsPerPage);

  // Get subjects for selected class
  const classSubjects = useMemo(() => {
    if (!selectedClass) return [];
    return [...new Set(libraryData
      .filter(resource => resource.class === selectedClass)
      .map(resource => resource.subject)
    )];
  }, [selectedClass]);

  // Get resource type counts for selected class
  const resourceTypeCounts = useMemo(() => {
    if (!selectedClass) return {};
    const classResources = libraryData.filter(resource => resource.class === selectedClass);
    return resourceTypes.reduce((acc, type) => {
      acc[type.id] = classResources.filter(resource => resource.type === type.id).length;
      return acc;
    }, {} as Record<string, number>);
  }, [selectedClass]);

  // Navigation handlers
  const handleClassSelect = (classKey: string) => {
    setSelectedClass(classKey);
    setCurrentStep('class-overview');
    setSelectedSubject('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleResourceTypeSelect = (resourceType: string) => {
    setSelectedResourceType(resourceType);
    setCurrentStep('resource-list');
    setCurrentPage(1);
  };

  const handleBackToBookshelf = () => {
    setCurrentStep('bookshelf');
    setSelectedClass('');
    setSelectedResourceType('');
    setSelectedSubject('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleBackToClassOverview = () => {
    setCurrentStep('class-overview');
    setSelectedResourceType('');
    setSelectedSubject('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  // Resource handlers
  const handlePreview = (resource: LibraryDocument) => {
    setViewingDocument(resource);
  };

  const handleDownload = (resource: LibraryDocument) => {
    window.open(resource.url, '_blank');
  };

  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (items: number) => {
    setItemsPerPage(items);
    setCurrentPage(1);
  };

  const handleJumpToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Render functions
  const renderResourceCard = (resource: LibraryDocument) => (
    <Card key={resource.id} className="group hover:shadow-lg transition-all duration-200 border-border/50 h-full">
      <CardContent className="p-4 h-full flex flex-col">
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
        
        <h3 className="font-medium text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors flex-1">
          {resource.title}
        </h3>
        
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span className="truncate">{resource.subject}</span>
          <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex gap-2 mt-auto">
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
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {getResourceTypeIcon(resource.type)}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm mb-1 truncate group-hover:text-primary transition-colors">
                {resource.title}
              </h3>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="truncate">{resource.subject}</span>
                <span>{new Date(resource.uploadedDate).toLocaleDateString()}</span>
                <Badge variant="secondary" className="text-xs">
                  {resourceTypes.find(rt => rt.id === resource.type)?.label}
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 flex-shrink-0">
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

  const renderSidebarContent = () => (
    <div className="p-4 space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Search & Filter</h3>
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {classSubjects.length > 0 && (
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {classSubjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      {currentStep === 'resource-list' && (
        <div>
          <h3 className="font-semibold mb-2">View Options</h3>
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="flex-1"
            >
              <Grid className="h-4 w-4 mr-1" />
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="flex-1"
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Collapsible Sidebar */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Library Filters</h2>
          </div>
          {renderSidebarContent()}
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 border-r bg-card">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Library Filters</h2>
          </div>
          {renderSidebarContent()}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          {currentStep === 'bookshelf' && (
            <div className="min-h-screen p-4">
              {/* Mobile Sidebar Toggle */}
              <div className="lg:hidden mb-4">
                <Button variant="outline" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-4">School Library</h1>
                <p className="text-lg text-muted-foreground">Select a class to browse educational resources</p>
              </div>
              
              {/* Bookshelf Display */}
              <div className="container mx-auto max-w-6xl">
                <style>{`
                  .bookshelf .thumb {
                    display: inline-block;
                    cursor: pointer;
                    margin: 0px 0.5%;
                    width: 15% !important;
                    box-shadow: 0px 1px 3px rgba(0, 0, 0, .3);
                    max-width: 120px;
                    transition: transform 0.2s ease;
                  }

                  .bookshelf .thumb:hover {
                    transform: translateY(-5px);
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
                    padding: 20px 0;
                  }

                  @media (max-width: 768px) {
                    .bookshelf .thumb {
                      width: 30% !important;
                      max-width: 140px;
                      margin: 0px 1.5%;
                    }
                    
                    .bookshelf .shelf-img {
                      margin-top: -8px;
                    }
                  }
                `}</style>

                <div className="space-y-8">
                  {/* First Shelf - Nursery Classes */}
                  <div className="bookshelf">
                    <div className="covers">
                      {['Baby Class', 'Middle Class', 'Top Class'].map((classKey) => (
                        <div key={classKey} className="thumb book-1">
                          <button 
                            onClick={() => handleClassSelect(classKey)}
                            className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                          >
                            <img src={classImages[classKey as keyof typeof classImages]} alt={classKey} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
                  </div>

                  {/* Second Shelf - Lower Primary */}
                  <div className="bookshelf">
                    <div className="covers">
                      {['Primary One', 'Primary Two', 'Primary Three'].map((classKey) => (
                        <div key={classKey} className="thumb book-1">
                          <button 
                            onClick={() => handleClassSelect(classKey)}
                            className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                          >
                            <img src={classImages[classKey as keyof typeof classImages]} alt={classKey} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
                  </div>

                  {/* Third Shelf - Upper Primary Part 1 */}
                  <div className="bookshelf">
                    <div className="covers">
                      {['Primary Four', 'Primary Five', 'Primary Six'].map((classKey) => (
                        <div key={classKey} className="thumb book-1">
                          <button 
                            onClick={() => handleClassSelect(classKey)}
                            className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                          >
                            <img src={classImages[classKey as keyof typeof classImages]} alt={classKey} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
                  </div>

                  {/* Fourth Shelf - Upper Primary Part 2 */}
                  <div className="bookshelf">
                    <div className="covers">
                      <div className="thumb book-1">
                        <button 
                          onClick={() => handleClassSelect('Primary Seven')}
                          className="focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <img src={classImages['Primary Seven']} alt="Primary Seven" />
                        </button>
                      </div>
                    </div>
                    <img className="shelf-img" src="https://fresh-teacher.github.io/images/shelf_wood.png" alt="Wooden shelf" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'class-overview' && (
            <div className="p-4 lg:p-6">
              {/* Mobile Sidebar Toggle */}
              <div className="lg:hidden mb-4">
                <Button variant="outline" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" onClick={handleBackToBookshelf}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Library
                  </Button>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-bold">{selectedClass}</h1>
                    <p className="text-muted-foreground">Choose a resource type to browse</p>
                  </div>
                </div>
              </div>

              {/* Resource Type Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {resourceTypes.map((type) => (
                  <Card 
                    key={type.id} 
                    className="cursor-pointer hover:shadow-lg transition-all duration-200 group"
                    onClick={() => handleResourceTypeSelect(type.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                          {getResourceTypeIcon(type.id)}
                        </div>
                        <h3 className="font-semibold text-sm">{type.label}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {resourceTypeCounts[type.id] || 0} items
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {currentStep === 'resource-list' && (
            <div className="p-4 lg:p-6">
              {/* Mobile Sidebar Toggle */}
              <div className="lg:hidden mb-4">
                <Button variant="outline" onClick={() => setSidebarOpen(true)}>
                  <Menu className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" onClick={handleBackToClassOverview}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to {selectedClass}
                  </Button>
                  <div>
                    <h1 className="text-xl lg:text-2xl font-bold">
                      {resourceTypes.find(rt => rt.id === selectedResourceType)?.label}
                    </h1>
                    <p className="text-muted-foreground text-sm">
                      {selectedClass} • {filteredResources.length} resources
                    </p>
                  </div>
                </div>
                
                {/* Desktop View Toggle */}
                <div className="hidden lg:flex items-center gap-2">
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

              {/* Resources Grid/List */}
              {paginatedResources.length > 0 ? (
                <div className={
                  viewMode === 'grid' 
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6"
                    : "space-y-3 mb-6"
                }>
                  {paginatedResources.map(resource => 
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

              {/* Pagination */}
              {totalPages > 1 && (
                <AdvancedPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredResources.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={handlePageChange}
                  onItemsPerPageChange={handleItemsPerPageChange}
                  onJumpToPage={handleJumpToPage}
                />
              )}
            </div>
          )}
        </div>
      </div>

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

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
};