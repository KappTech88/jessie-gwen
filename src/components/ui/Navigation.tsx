'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Menu, X, Youtube, Instagram, Sun, Moon } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('/');
  const prefersReducedMotion = useReducedMotion();
  const { toggleTheme, isDark } = useTheme();
  const { scrollY } = useScroll();

  const bgColorLight = useTransform(
    scrollY,
    [0, 100],
    ['rgba(250, 250, 250, 0)', 'rgba(250, 250, 250, 0.9)']
  );

  const bgColorDark = useTransform(
    scrollY,
    [0, 100],
    ['rgba(15, 15, 26, 0)', 'rgba(15, 15, 26, 0.9)']
  );

  const backgroundColor = isDark ? bgColorDark : bgColorLight;

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(16px)']
  );

  const borderOpacity = useTransform(scrollY, [0, 100], [0, isDark ? 0.2 : 0.1]);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = ['videos', 'about', 'contact'];
    const observers: IntersectionObserver[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(`#${id}`);
          }
        },
        { rootMargin: '-40% 0px -40% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

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
          {/* Logo with JG Monogram */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center shadow-lg shadow-[var(--color-primary)]/20">
                <span className="text-white font-bold text-sm">JG</span>
              </div>
              <span className="text-xl font-bold text-gradient">
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
                className={cn(
                  'relative text-sm font-medium transition-colors py-1',
                  activeSection === link.href
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-primary)] hover:text-[var(--color-primary)]'
                )}
              >
                {link.label}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="w-9 h-9 rounded-full bg-[var(--color-border)]/50 hover:bg-[var(--color-border)] flex items-center justify-center transition-colors"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* CTA Button */}
            <a
              href="https://www.youtube.com/@JessieGwen?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-shadow"
            >
              Start Training
            </a>
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

      {/* Mobile Menu */}
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
                className="flex-1 py-3 rounded-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white flex items-center justify-center gap-2 font-semibold"
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

            <button
              onClick={toggleTheme}
              className="w-full py-3 rounded-full border border-[var(--color-border)] text-[var(--color-text-primary)] flex items-center justify-center gap-2 font-medium"
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
