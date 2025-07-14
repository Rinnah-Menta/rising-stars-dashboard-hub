
import React from 'react';
import { VideoTutorialsSection } from './resources/VideoTutorialsSection';
import { DownloadableGuidesSection } from './resources/DownloadableGuidesSection';
import { CommunitySection } from './resources/CommunitySection';

const videoTutorials = [
  { 
    name: "Getting Started with School Portal", 
    duration: "5:32", 
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  { 
    name: "How to Submit Assignments Online", 
    duration: "8:15", 
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  { 
    name: "Parent Portal Navigation Guide", 
    duration: "6:40", 
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  },
  { 
    name: "Understanding Your Grade Reports", 
    duration: "10:22", 
    videoId: "dQw4w9WgXcQ",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
  }
];

const downloadableGuides = [
  { 
    name: "Student Quick Start Guide", 
    size: "2.3 MB", 
    filename: "student-quick-start-guide.pdf"
  },
  { 
    name: "Parent Portal Manual", 
    size: "1.8 MB", 
    filename: "parent-portal-manual.pdf"
  },
  { 
    name: "Teacher Dashboard Guide", 
    size: "4.1 MB", 
    filename: "teacher-dashboard-guide.pdf"
  },
  { 
    name: "Assignment Submission Steps", 
    size: "0.5 MB", 
    filename: "assignment-submission-guide.pdf"
  }
];

const communityItems = [
  { 
    name: "Parents WhatsApp Group", 
    members: "2,456 members", 
    link: "https://chat.whatsapp.com/parent-group-link",
    description: "Connect with other parents"
  },
  { 
    name: "Students Support Group", 
    members: "1,234 members", 
    link: "https://chat.whatsapp.com/students-group-link",
    description: "Get help from fellow students"
  },
  { 
    name: "Announcements Channel", 
    members: "5,678 subscribers", 
    link: "https://whatsapp.com/channel/announcements-channel",
    description: "Stay updated with school news"
  },
  { 
    name: "Technical Support", 
    members: "Direct support", 
    link: "https://wa.me/256123456789",
    description: "One-on-one technical help"
  }
];

export const ResourcesSection: React.FC = () => {
  const [selectedVideo, setSelectedVideo] = React.useState<string | null>(null);

  const handleVideoClick = (videoId: string) => {
    setSelectedVideo(videoId);
  };

  const handleDownload = (filename: string, itemName: string) => {
    // Create a dummy PDF blob for demonstration
    const pdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj

2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj

3 0 obj
<<
/Type /Page
/Parent 2 0 R
/MediaBox [0 0 612 792]
/Contents 4 0 R
/Resources <<
/Font <<
/F1 5 0 R
>>
>>
>>
endobj

4 0 obj
<<
/Length 44
>>
stream
BT
/F1 12 Tf
72 720 Td
(${itemName}) Tj
ET
endstream
endobj

5 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj

xref
0 6
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000279 00000 n 
0000000373 00000 n 
trailer
<<
/Size 6
/Root 1 0 R
>>
startxref
459
%%EOF`;
    
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleWhatsAppLink = (link: string) => {
    window.open(link, '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">Learning Resources</h2>
        <p className="text-gray-600">
          Everything you need to master the Springing Stars platform
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <VideoTutorialsSection 
          videos={videoTutorials}
          onVideoClick={handleVideoClick}
          selectedVideo={selectedVideo}
          onCloseVideo={() => setSelectedVideo(null)}
        />
        
        <DownloadableGuidesSection 
          guides={downloadableGuides}
          onDownload={handleDownload}
        />
        
        <CommunitySection 
          communityItems={communityItems}
          onWhatsAppLink={handleWhatsAppLink}
        />
      </div>
    </div>
  );
};
