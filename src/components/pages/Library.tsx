
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LibraryFilters } from '@/components/library/LibraryFilters';
import { LibrarySearch } from '@/components/library/LibrarySearch';
import { LibraryDocumentCard } from '@/components/library/LibraryDocumentCard';
import { LibraryPagination } from '@/components/library/LibraryPagination';
import { DocumentViewDialog } from '@/components/library/DocumentViewDialog';
import { libraryData, LibraryDocument } from '@/data/libraryData';
import { useAuth } from '@/contexts/AuthContext';
import { Book, FileText, GraduationCap } from 'lucide-react';

const ITEMS_PER_PAGE = 9;

export const Library: React.FC = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedResource, setSelectedResource] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingDocument, setViewingDocument] = useState<LibraryDocument | null>(null);

  // Filter documents based on user role and selections
  const filteredDocuments = useMemo(() => {
    let filtered = libraryData;

    // Hide schemes of work from students
    if (user?.role === 'pupil') {
      filtered = filtered.filter(doc => doc.type !== 'schemes-of-work');
    }

    // Apply filters
    if (selectedClass) {
      filtered = filtered.filter(doc => doc.class === selectedClass);
    }
    if (selectedSubject) {
      filtered = filtered.filter(doc => doc.subject === selectedSubject);
    }
    if (selectedResource) {
      filtered = filtered.filter(doc => doc.type === selectedResource);
    }

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(doc =>
        doc.title.toLowerCase().includes(searchLower) ||
        doc.class.toLowerCase().includes(searchLower) ||
        doc.subject.toLowerCase().includes(searchLower)
      );
    }

    return filtered;
  }, [selectedClass, selectedSubject, selectedResource, searchTerm, user?.role]);

  // Pagination
  const totalPages = Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE);
  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedClass, selectedSubject, selectedResource, searchTerm]);

  const handleClearFilters = () => {
    setSelectedClass('');
    setSelectedSubject('');
    setSelectedResource('');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleViewDocument = (document: LibraryDocument) => {
    setViewingDocument(document);
  };

  const getWelcomeMessage = () => {
    switch (user?.role) {
      case 'pupil':
        return 'Access your learning resources, past papers, and study materials';
      case 'teacher':
        return 'Access teaching resources, lesson plans, and educational materials';
      default:
        return 'Browse and access educational resources and documents';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Book className="h-8 w-8 text-blue-600" />
            Library
          </h1>
          <p className="text-gray-600 mt-1">{getWelcomeMessage()}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredDocuments.length}</div>
            <p className="text-xs text-muted-foreground">Available resources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...new Set(filteredDocuments.map(doc => doc.class))].length}
            </div>
            <p className="text-xs text-muted-foreground">Available classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subjects</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {[...new Set(filteredDocuments.map(doc => doc.subject))].length}
            </div>
            <p className="text-xs text-muted-foreground">Available subjects</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <LibraryFilters
        selectedClass={selectedClass}
        setSelectedClass={setSelectedClass}
        selectedSubject={selectedSubject}
        setSelectedSubject={setSelectedSubject}
        selectedResource={selectedResource}
        setSelectedResource={setSelectedResource}
        onClearFilters={handleClearFilters}
      />

      {/* Search */}
      <LibrarySearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        resultCount={filteredDocuments.length}
      />

      {/* Documents Grid */}
      {paginatedDocuments.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedDocuments.map((document) => (
              <LibraryDocumentCard
                key={document.id}
                document={document}
                onView={handleViewDocument}
              />
            ))}
          </div>

          {/* Pagination */}
          <LibraryPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      ) : (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || selectedClass || selectedSubject || selectedResource
                ? 'Try adjusting your filters or search terms'
                : 'No documents are currently available in the library'}
            </p>
            {(searchTerm || selectedClass || selectedSubject || selectedResource) && (
              <button
                onClick={handleClearFilters}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Document View Dialog */}
      <DocumentViewDialog
        document={viewingDocument}
        isOpen={!!viewingDocument}
        onClose={() => setViewingDocument(null)}
      />
    </div>
  );
};
