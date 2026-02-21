'use client';

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Play, Clock } from 'lucide-react';
import Image from 'next/image';
import { Video, Difficulty } from '@/lib/videoData';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface VideoCardProps {
  video: Video;
  isLocked: boolean;
  onClick: () => void;
  index: number;
}

const difficultyConfig: Record<Difficulty, { label: string; color: string; bg: string }> = {
  beginner: { label: 'Beginner', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  intermediate: { label: 'Intermediate', color: 'text-amber-600', bg: 'bg-amber-50' },
  intense: { label: 'Intense', color: 'text-[var(--color-primary)]', bg: 'bg-[var(--color-primary)]/10' },
};

function VideoCardComponent({ video, isLocked, onClick, index }: VideoCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const difficulty = video.difficulty ? difficultyConfig[video.difficulty] : null;

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
      whileHover={prefersReducedMotion ? {} : { y: -6 }}
      onClick={onClick}
      aria-label={`${isLocked ? 'Subscribe to unlock' : 'Watch'}: ${video.title}`}
      className="group cursor-pointer w-full text-left relative overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-transparent hover:shadow-2xl hover:shadow-[var(--color-primary)]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-gray-100">
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
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
              <Lock className="w-6 h-6 text-white" />
            </div>
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg">
              <Play className="w-6 h-6 text-white fill-white" />
            </div>
          )}
        </div>

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration}
          </div>
        )}

        {/* Lock Badge */}
        {isLocked && (
          <div className="absolute top-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-white/90 backdrop-blur-sm text-[var(--color-text-primary)] text-xs font-bold flex items-center gap-1 shadow-sm">
            <Lock className="w-3 h-3" />
            Subscribe
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm text-[var(--color-text-primary)] line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors duration-200 leading-snug">
          {video.title}
        </h3>
        {difficulty && (
          <span className={cn('inline-block px-2.5 py-0.5 rounded-full text-xs font-medium', difficulty.bg, difficulty.color)}>
            {difficulty.label}
          </span>
        )}
      </div>

      {/* Gradient border glow on hover */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: 'inset 0 0 0 1.5px var(--color-primary)' }} />
    </motion.button>
  );
}

export const VideoCard = memo(VideoCardComponent);
