'use client';

import { Youtube, Instagram } from 'lucide-react';
import { AnimatedSection } from '@/components/animations/AnimatedSection';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <AnimatedSection variant="fadeIn">
      <footer className="relative bg-[#0F0F1A] text-white pt-16 pb-8">
        {/* Gradient top border */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[var(--color-primary)] to-transparent" />

        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">JG</span>
                </div>
                <span className="text-xl font-bold text-gradient">Jessie Gwen</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Your go-to trainer for home workouts that actually work. Building stronger, more confident women.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Quick Links</h4>
              <ul className="space-y-3 text-sm text-gray-400">
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

            {/* Connect */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Connect</h4>
              <div className="flex gap-3 mb-4">
                <a
                  href="https://www.youtube.com/@JessieGwen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-[var(--color-primary)] hover:to-[var(--color-secondary)] flex items-center justify-center transition-all"
                  aria-label="YouTube"
                >
                  <Youtube className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/jessiegwenfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-[var(--color-secondary)] hover:to-[var(--color-primary)] flex items-center justify-center transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
              <p className="text-gray-500 text-xs">
                Atlanta &bull; Alpharetta &bull; Roswell &bull; Sandy Springs
              </p>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider text-gray-300">Stay Updated</h4>
              <p className="text-sm text-gray-400 mb-3">Get notified about new workouts and tips.</p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className="flex gap-2"
              >
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white text-sm font-semibold hover:shadow-lg hover:shadow-[var(--color-primary)]/25 transition-shadow"
                >
                  Join
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {currentYear} Jessie Gwen Fitness. All rights reserved.</p>
            <p>Designed with purpose for strong women everywhere.</p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}
