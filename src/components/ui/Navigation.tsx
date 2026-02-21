'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Transform scroll position to background opacity
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(253, 252, 251, 0)', 'rgba(253, 252, 251, 0.95)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.1]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#videos', label: 'Workouts' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.header
      style={{
        backgroundColor,
        backdropFilter: backdropBlur,
        WebkitBackdropFilter: backdropBlur,
      }}
      className="fixed top-0 left-0 right-0 z-40 border-b transition-colors"
    >
      <motion.div
        style={{ borderColor: `rgba(0, 0, 0, ${borderOpacity})` }}
        className="absolute bottom-0 left-0 right-0 h-px"
      />

      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2"
            >
              <span className="text-2xl font-bold text-gradient">
                Jessie Gwen
              </span>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-4">
              <a
                href="https://www.youtube.com/@JessieGwen"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Jessie Gwen on YouTube"
                className="w-10 h-10 rounded-full bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/jessiegwenfitness"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Jessie Gwen on Instagram"
                className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/10 hover:bg-[var(--color-secondary)] text-[var(--color-secondary)] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] focus:ring-offset-2"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)] text-[var(--color-primary)] hover:text-white flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu - GPU-accelerated with scaleY transform */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{
              duration: prefersReducedMotion ? 0.1 : 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: 'top' }}
            className="md:hidden bg-[var(--color-surface)] border-t border-[var(--color-border)] overflow-hidden"
          >
          <div className="container mx-auto px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 text-[var(--color-text-primary)] hover:text-[var(--color-primary)] transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
              <a
                href="https://www.youtube.com/@JessieGwen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center gap-2 font-semibold"
              >
                <Youtube className="w-5 h-5" />
                YouTube
              </a>
              <a
                href="https://www.instagram.com/jessiegwenfitness"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 rounded-full bg-[var(--color-secondary)] text-white flex items-center justify-center gap-2 font-semibold"
              >
                <Instagram className="w-5 h-5" />
                Instagram
              </a>
            </div>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
