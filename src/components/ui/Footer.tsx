'use client';

import { Youtube, Instagram, Heart } from 'lucide-react';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AnimatedSection variant="fadeIn">
      <footer className="bg-[var(--color-text-primary)] text-white py-12 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-bold mb-3 text-gradient">Jessie Gwen</h3>
              <p className="text-gray-400 mb-4">
                Your go-to trainer for home workouts that actually work. Building stronger, more confident women, one workout at a time.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-3 text-[var(--color-accent)]">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#videos" className="hover:text-white transition-colors">
                    Free Workouts
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    About Jessie
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/@JessieGwen/playlists"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    All Playlists
                  </a>
                </li>
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="font-semibold mb-3 text-[var(--color-accent)]">Connect</h4>
              <div className="flex gap-3 mb-4">
                <a
                  href="https://www.youtube.com/@JessieGwen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 flex items-center justify-center transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/jessiegwenfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/80 flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Serving: Atlanta, Alpharetta, Roswell, Sandy Springs, Buckhead
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} Jessie Gwen Fitness. All rights reserved.
            </p>
            <p className="flex items-center gap-2">
              Made with <Heart className="w-4 h-4 text-[var(--color-primary)] fill-current" /> for strong women
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}
