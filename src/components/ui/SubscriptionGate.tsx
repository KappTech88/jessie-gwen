'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { motion } from 'framer-motion';
import { X, Youtube, Check } from 'lucide-react';
import { Video } from '@/lib/videoData';
import { getSubscribeUrl } from '@/lib/subscriptionState';
import { AnimatedButton } from '@/components/animations/AnimatedButton';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface SubscriptionGateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
  video: Video | null;
}

export function SubscriptionGate({ isOpen, onClose, onSubscribe, video }: SubscriptionGateProps) {
  const prefersReducedMotion = useReducedMotion();

  const handleSubscribe = () => {
    const newWindow = window.open(getSubscribeUrl(), '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      window.location.href = getSubscribeUrl();
    }
    onSubscribe();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        {/* Backdrop */}
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />
        </Dialog.Overlay>

        {/* Modal — Glassmorphism Card */}
        <Dialog.Content
          asChild
          aria-describedby="dialog-description"
        >
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.95, y: prefersReducedMotion ? 0 : 20 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 max-w-md w-full overflow-hidden rounded-3xl border border-white/20 bg-[var(--color-surface)]/95 backdrop-blur-xl shadow-2xl"
          >
            {/* Close Button */}
            <Dialog.Close
              aria-label="Close subscription dialog"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[var(--color-border)]/50 hover:bg-[var(--color-border)] flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            >
              <X className="w-4 h-4" />
            </Dialog.Close>

            {/* Video Thumbnail Background */}
            {video && (
              <div
                className="h-44 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[var(--color-surface)]/95" />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/25">
                  <Youtube className="w-5 h-5 text-white" />
                </div>
                <Dialog.Title className="text-xl font-bold text-[var(--color-text-primary)]">
                  Subscribe to Unlock
                </Dialog.Title>
              </div>

              <Dialog.Description id="dialog-description" className="text-[var(--color-text-secondary)] mb-6 text-sm leading-relaxed">
                Get instant access to this workout and <strong>35+ free workouts</strong> by subscribing to Jessie Gwen on YouTube!
              </Dialog.Description>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  '35+ free home workouts',
                  'New videos every week',
                  'No spam, just gains',
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.1 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                    </div>
                    <span className="text-sm text-[var(--color-text-primary)]">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA */}
              <AnimatedButton
                onClick={handleSubscribe}
                variant="primary"
                size="lg"
                className="w-full"
              >
                <Youtube className="w-5 h-5" />
                Subscribe on YouTube
              </AnimatedButton>
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
