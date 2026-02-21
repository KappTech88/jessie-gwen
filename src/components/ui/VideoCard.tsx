'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Play } from 'lucide-react';
import Image from 'next/image';
import { Video } from '@/lib/videoData';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface VideoCardProps {
  video: Video;
  isLocked: boolean;
  onClick: () => void;
  index: number;
}

function VideoCardComponent({ video, isLocked, onClick, index }: VideoCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0.2 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.05,
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={prefersReducedMotion ? {} : { y: -8 }}
      onClick={onClick}
      aria-label={`${isLocked ? 'Subscribe to unlock' : 'Watch'}: ${video.title}`}
      className="group cursor-pointer w-full text-left relative overflow-hidden rounded-xl bg-[var(--color-surface)] shadow-lg hover:shadow-2xl transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-200">
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Play/Lock Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          {isLocked ? (
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <Lock className="w-8 h-8 text-white" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <Play className="w-8 h-8 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Lock Badge - prominent yellow accent */}
        {isLocked && (
          <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-[var(--color-text-primary)] px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg shadow-[var(--color-accent)]/30">
            <Lock className="w-3 h-3" />
            Subscribe
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200">
          {video.title}
        </h3>
      </div>

      {/* Gradient Border Effect */}
      <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[var(--color-primary)]/30 transition-colors duration-300 pointer-events-none" />
    </motion.button>
  );
}

// Memoize component to prevent unnecessary re-renders (32 cards * updates = performance gain)
export const VideoCard = memo(VideoCardComponent);
