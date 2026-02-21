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
    // Open YouTube channel in new tab - secure with noopener,noreferrer
    const newWindow = window.open(getSubscribeUrl(), '_blank', 'noopener,noreferrer');
    if (!newWindow) {
      // Fallback for popup blockers
      window.location.href = getSubscribeUrl();
    }
    // Mark as subscribed (honor system)
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

        {/* Modal */}
        <Dialog.Content
          asChild
          aria-describedby="dialog-description"
        >
          <motion.div
            initial={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, y: prefersReducedMotion ? 0 : 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: prefersReducedMotion ? 1 : 0.9, y: prefersReducedMotion ? 0 : 20 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 bg-[var(--color-surface)] rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Close Button */}
            <Dialog.Close
              aria-label="Close subscription dialog"
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/10 hover:bg-black/20 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            >
              <X className="w-5 h-5" />
            </Dialog.Close>

            {/* Video Thumbnail Background - only show if video is provided */}
            {video && (
              <div
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />
              </div>
            )}

            {/* Content */}
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                  <Youtube className="w-6 h-6 text-white" />
                </div>
                <Dialog.Title className="text-2xl font-bold text-[var(--color-text-primary)]">
                  Subscribe to Unlock 💪
                </Dialog.Title>
              </div>

              <Dialog.Description id="dialog-description" className="text-[var(--color-text-secondary)] mb-6">
                Get instant access to this workout and <strong>35+ free workouts</strong> by subscribing to Jessie Gwen on YouTube!
              </Dialog.Description>

              {/* Social Proof - increases conversion by showing subscriber satisfaction */}
              <div className="flex items-center justify-between mb-6 p-4 bg-[var(--color-secondary)]/10 rounded-xl border border-[var(--color-secondary)]/20">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <span className="text-2xl font-bold text-[var(--color-text-primary)]">4.9</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          className="w-4 h-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <div className="text-sm text-[var(--color-text-secondary)]">from subscribers</div>
                </div>
                <div className="flex -space-x-2">
                  {/* Avatar stack - represents community */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    JG
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-secondary)] to-[var(--color-accent)] border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    AM
                  </div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-primary)] border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    SK
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[var(--color-text-muted)] border-2 border-white flex items-center justify-center text-white font-bold text-xs">
                    +1K
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-3 mb-8">
                {[
                  '35+ free home workouts',
                  'New videos every week',
                  'No spam, just gains',
                  'Join 1,200+ strong women',
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit}
                    initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.1 + index * 0.05 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-[var(--color-secondary)]" />
                    </div>
                    <span className="text-[var(--color-text-primary)]">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button - "Maybe later" removed to increase commitment */}
              <div>
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
            </div>
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
