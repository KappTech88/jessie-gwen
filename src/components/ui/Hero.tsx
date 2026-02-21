'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Video, Youtube, Sparkles, Camera } from 'lucide-react';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { SubscriptionGate } from './SubscriptionGate';

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isGateOpen, setIsGateOpen] = useState(false);

  const scrollToVideos = () => {
    const videosSection = document.getElementById('videos');
    if (videosSection) {
      videosSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDirectConversion = () => {
    setIsGateOpen(true);
  };

  const handleCloseGate = () => {
    setIsGateOpen(false);
  };

  const handleSubscribe = () => {
    setIsGateOpen(false);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, -30, 0],
          x: [0, 15, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-20 -right-20 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[var(--color-primary)]/25 to-[var(--color-secondary)]/20 blur-[80px] animate-blob"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, 20, 0],
          x: [0, -10, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -bottom-32 -left-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[var(--color-secondary)]/20 to-[var(--color-accent)]/15 blur-[100px] animate-blob"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, -15, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-1/2 w-[300px] h-[300px] rounded-full bg-[var(--color-accent)]/10 blur-[60px]"
      />

      {/* Content — Split Layout */}
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <AnimatedSection delay={0.1} variant="fadeIn">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 border border-[var(--color-primary)]/20 font-semibold text-sm mb-8">
                <Sparkles className="w-4 h-4 text-[var(--color-primary)]" />
                <span className="text-gradient">35+ FREE WORKOUTS</span>
              </div>
            </AnimatedSection>

            {/* Headline */}
            <AnimatedSection delay={0.2} variant="fadeUp">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.05]">
                Get Stronger.
                <br />
                Feel Confident.
                <br />
                <span className="text-gradient">Train at Home.</span>
              </h1>
            </AnimatedSection>

            {/* Subheadline */}
            <AnimatedSection delay={0.3} variant="fadeUp">
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] mb-10 max-w-lg leading-relaxed">
                Build your best body with <strong className="text-[var(--color-primary)]">glute-focused strength training</strong> designed specifically for women. No equipment needed.
              </p>
            </AnimatedSection>

            {/* CTA */}
            <AnimatedSection delay={0.4} variant="fadeUp">
              <div className="flex flex-col sm:flex-row gap-4">
                <AnimatedButton
                  onClick={handleDirectConversion}
                  variant="primary"
                  size="lg"
                  className="text-lg px-8 py-4 shadow-2xl shadow-[var(--color-primary)]/25"
                >
                  <Youtube className="w-5 h-5" />
                  Subscribe Free
                </AnimatedButton>
                <AnimatedButton
                  onClick={scrollToVideos}
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-4"
                >
                  <Play className="w-5 h-5" />
                  Browse Workouts
                </AnimatedButton>
              </div>
            </AnimatedSection>

            {/* Stats Bar */}
            <AnimatedSection delay={0.5} variant="fadeIn">
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-[var(--color-border)]">
                <div className="flex items-center gap-3">
                  <Video className="w-5 h-5 text-[var(--color-primary)]" />
                  <div>
                    <div className="text-2xl font-bold">35+</div>
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Workouts</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-[var(--color-border)]" />
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-[var(--color-secondary)]" />
                  <div>
                    <div className="text-2xl font-bold">1,200+</div>
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Subscribers</div>
                  </div>
                </div>
                <div className="w-px h-10 bg-[var(--color-border)]" />
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-[var(--color-accent)]" />
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">Free</div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — Placeholder Image Area */}
          <AnimatedSection delay={0.3} variant="fadeIn">
            <div className="relative hidden lg:block">
              <div className="relative aspect-[3/4] rounded-3xl overflow-hidden gradient-border">
                {/* Gradient placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/20 via-[var(--color-secondary)]/15 to-[var(--color-accent)]/10" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center p-8">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                  <p className="text-[var(--color-text-muted)] text-sm font-medium">Your photo here</p>
                </div>
              </div>
              {/* Decorative gradient accent */}
              <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full rounded-3xl bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10" />
            </div>
          </AnimatedSection>
        </div>
      </div>

      {/* Subscription Gate Modal */}
      <SubscriptionGate
        isOpen={isGateOpen}
        onClose={handleCloseGate}
        onSubscribe={handleSubscribe}
        video={null}
      />
    </section>
  );
}
