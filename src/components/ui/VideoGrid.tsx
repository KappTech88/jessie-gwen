'use client';

import { useState, useEffect, useMemo } from 'react';
import { VideoCard } from './VideoCard';
import { SubscriptionGate } from './SubscriptionGate';
import { VideoGridSkeleton } from './VideoGridSkeleton';
import { Video, workoutVideos } from '@/lib/videoData';
import { isSubscribed, setSubscribed } from '@/lib/subscriptionState';

interface VideoGridProps {
  filterCategory?: string;
}

export function VideoGrid({ filterCategory = 'all' }: VideoGridProps) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [isGateOpen, setIsGateOpen] = useState(false);
  const [hasSubscribed, setHasSubscribed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Check subscription status on mount - prevents hydration mismatch
  useEffect(() => {
    setMounted(true);
    setHasSubscribed(isSubscribed());
  }, []);

  // Filter videos based on category
  const filteredVideos = useMemo(() => {
    if (filterCategory === 'all') return workoutVideos;

    return workoutVideos.filter((video) => {
      const title = video.title.toLowerCase();

      if (filterCategory === 'beginner') {
        return (
          title.includes('beginner') ||
          title.includes('easy') ||
          title.includes('everyday') ||
          title.includes('7 minute') ||
          title.includes('8 min')
        );
      }

      if (filterCategory === 'quick') {
        return (
          title.includes('7 min') ||
          title.includes('8 min') ||
          title.includes('10 min') ||
          title.includes('7 minute')
        );
      }

      if (filterCategory === 'intense') {
        return (
          title.includes('12 min') ||
          title.includes('13 min') ||
          title.includes('14 min') ||
          title.includes('15 min') ||
          title.includes('intense') ||
          title.includes('insanely') ||
          title.includes('extreme') ||
          title.includes('explosive') ||
          title.includes('major')
        );
      }

      return true;
    });
  }, [filterCategory]);

  // Show skeleton during SSR/hydration
  if (!mounted) {
    return <VideoGridSkeleton />;
  }

  const handleVideoClick = (video: Video) => {
    if (hasSubscribed) {
      // Open video directly on YouTube - secure with noopener,noreferrer
      const newWindow = window.open(video.url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        // Fallback for popup blockers
        window.location.href = video.url;
      }
    } else {
      // Show subscription gate
      setSelectedVideo(video);
      setIsGateOpen(true);
    }
  };

  const handleSubscribe = () => {
    setSubscribed(true);
    setHasSubscribed(true);
    setIsGateOpen(false);
    // Open the selected video after subscribing - secure with noopener,noreferrer
    if (selectedVideo) {
      const newWindow = window.open(selectedVideo.url, '_blank', 'noopener,noreferrer');
      if (!newWindow) {
        // Fallback for popup blockers
        window.location.href = selectedVideo.url;
      }
    }
  };

  const handleCloseGate = () => {
    setIsGateOpen(false);
    setSelectedVideo(null);
  };

  return (
    <>
      {filteredVideos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video, index) => (
            <VideoCard
              key={video.id}
              video={video}
              isLocked={!hasSubscribed}
              onClick={() => handleVideoClick(video)}
              index={index}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-[var(--color-text-secondary)]">
            No workouts found in this category. Try selecting a different filter!
          </p>
        </div>
      )}

      <SubscriptionGate
        isOpen={isGateOpen}
        onClose={handleCloseGate}
        onSubscribe={handleSubscribe}
        video={selectedVideo}
      />
    </>
  );
}
