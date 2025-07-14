
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Video, Play } from 'lucide-react';

interface VideoItem {
  name: string;
  duration: string;
  videoId: string;
  thumbnail: string;
}

interface VideoTutorialsSectionProps {
  videos: VideoItem[];
  onVideoClick: (videoId: string) => void;
  selectedVideo: string | null;
  onCloseVideo: () => void;
}

export const VideoTutorialsSection: React.FC<VideoTutorialsSectionProps> = ({
  videos,
  onVideoClick,
  selectedVideo,
  onCloseVideo
}) => {
  return (
    <>
      {/* Video Player Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={onCloseVideo}>
          <div className="bg-white p-4 rounded-lg max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Video Tutorial</h3>
              <Button variant="ghost" onClick={onCloseVideo}>✕</Button>
            </div>
            <div className="aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <Card className="hover:shadow-lg transition-all duration-200 bg-blue-50 border-blue-200">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-center mb-3">
            <Video className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-center text-lg">Video Tutorials</CardTitle>
          <p className="text-sm text-gray-600 text-center">Step-by-step video guides for common tasks</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="space-y-2">
            {videos.map((video, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <p className="text-sm font-medium">{video.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      <Play className="h-3 w-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => onVideoClick(video.videoId)}
                >
                  <Play className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
};
