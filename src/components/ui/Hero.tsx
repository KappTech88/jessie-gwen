'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Play, Users, Video, Youtube, Sparkles } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grain">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 gradient-mesh opacity-10" />

      {/* Floating Shapes - with yellow accent for depth */}
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-[var(--color-primary)]/20 blur-3xl"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-10 w-40 h-40 rounded-full bg-[var(--color-secondary)]/20 blur-3xl"
      />
      <motion.div
        animate={prefersReducedMotion ? {} : {
          y: [0, 15, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-40 left-1/3 w-24 h-24 rounded-full bg-[var(--color-accent)]/15 blur-2xl"
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <AnimatedSection delay={0.1} variant="fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] font-semibold mb-6">
              <Play className="w-4 h-4 fill-current" />
              <span>35+ Free Home Workouts</span>
            </div>
          </AnimatedSection>

          {/* Headline - Bold, energetic typography */}
          <AnimatedSection delay={0.2} variant="fadeUp">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 leading-[0.95]">
              Get Stronger.
              <br />
              Feel Confident.
              <br />
              <span className="text-gradient">Train at Home.</span>
            </h1>
          </AnimatedSection>

          {/* Subheadline */}
          <AnimatedSection delay={0.3} variant="fadeUp">
            <p className="text-xl md:text-2xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto">
              Build your best body with <strong className="text-[var(--color-primary)]">glute-focused strength training</strong> designed specifically for women. No equipment needed.
            </p>
          </AnimatedSection>

          {/* CTA - Direct conversion to subscription */}
          <AnimatedSection delay={0.4} variant="fadeUp">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <AnimatedButton
                onClick={handleDirectConversion}
                variant="primary"
                size="lg"
                className="text-lg px-10 py-5 shadow-2xl shadow-[var(--color-primary)]/30"
              >
                <Youtube className="w-6 h-6" />
                Subscribe & Get Free Access
              </AnimatedButton>
              <AnimatedButton
                onClick={scrollToVideos}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-5"
              >
                <Play className="w-5 h-5" />
                Browse Workouts
              </AnimatedButton>
            </div>
          </AnimatedSection>

          {/* Stats */}
          <AnimatedSection delay={0.5} variant="fadeIn">
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Video className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">35+</div>
                <div className="text-sm text-[var(--color-text-muted)]">Workouts</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Users className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">1,200+</div>
                <div className="text-sm text-[var(--color-text-muted)]">Subscribers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <motion.div
                    animate={prefersReducedMotion ? {} : { scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Sparkles className="w-8 h-8 text-[var(--color-accent)] fill-[var(--color-accent)]" />
                  </motion.div>
                </div>
                <div className="text-3xl font-bold text-[var(--color-text-primary)]">100%</div>
                <div className="text-sm text-[var(--color-text-muted)]">Free</div>
              </div>
            </div>
          </AnimatedSection>

          {/* Scroll Indicator */}
          <motion.button
            type="button"
            animate={prefersReducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            onClick={scrollToVideos}
            aria-label="Scroll to workout videos section"
            className="mt-16 flex flex-col items-center gap-2 text-[var(--color-text-muted)] cursor-pointer hover:text-[var(--color-text-secondary)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2 focus:rounded-lg"
          >
            <span className="text-sm font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </motion.button>
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
