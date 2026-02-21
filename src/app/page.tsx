'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Hero } from "@/components/ui/Hero";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { AnimatedButton } from "@/components/animations/AnimatedButton";
import { Dumbbell, Heart, Zap, Youtube, Send, Mail, Instagram, ArrowRight } from "lucide-react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'beginner', label: 'Beginner Friendly' },
    { id: 'quick', label: 'Quick (7-10min)' },
    { id: 'intense', label: 'Intense (12-15min)' },
  ];

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/xpwzgkjp', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setFormStatus('sent');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 4000);
      } else {
        setFormStatus('error');
        setTimeout(() => setFormStatus('idle'), 3000);
      }
    } catch {
      setFormStatus('error');
      setTimeout(() => setFormStatus('idle'), 3000);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section — Asymmetric layout */}
      <section id="about" className="py-24 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto items-start">
            {/* Left — Bio */}
            <AnimatedSection variant="fadeUp">
              <div>
                <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] text-sm font-semibold mb-6">
                  About Me
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Hi, I'm <span className="text-gradient">Jessie Gwen</span>
                </h2>
                <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4">
                  Your go-to trainer for <strong className="text-[var(--color-primary)]">home workouts that actually work</strong>.
                </p>
                <p className="text-[var(--color-text-secondary)] leading-relaxed">
                  I specialize in strength training for women, with a focus on building stronger glutes and boosting your confidence — all from the comfort of your home. No equipment, no gym, just you and your dedication.
                </p>
              </div>
            </AnimatedSection>

            {/* Right — Bento Grid Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Card 1 — spans full width */}
              <AnimatedSection delay={0.1} variant="fadeUp" className="col-span-2">
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 border border-[var(--color-primary)]/15 hover:border-[var(--color-primary)]/40 transition-all hover:shadow-lg group">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Dumbbell className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">No Equipment Needed</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    All workouts use just your bodyweight. Train anywhere, anytime — perfect for busy women who want results without the gym.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 2 */}
              <AnimatedSection delay={0.2} variant="fadeUp">
                <div className="p-6 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/50 transition-all hover:shadow-lg group h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-accent)]/15 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Zap className="w-6 h-6 text-[var(--color-accent)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Fast Results</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    7-15 minute workouts for maximum impact in minimum time.
                  </p>
                </div>
              </AnimatedSection>

              {/* Card 3 */}
              <AnimatedSection delay={0.3} variant="fadeUp">
                <div className="p-6 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-secondary)]/50 transition-all hover:shadow-lg group h-full">
                  <div className="w-12 h-12 rounded-xl bg-[var(--color-secondary)]/15 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <Heart className="w-6 h-6 text-[var(--color-secondary)]" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Built for Women</h3>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    Designed specifically for women's strength goals and body mechanics.
                  </p>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      <section id="videos" className="py-24 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="fadeUp">
            <div className="max-w-6xl mx-auto mb-12">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-secondary)]/10 text-[var(--color-secondary)] text-sm font-semibold mb-4">
                    Workout Library
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-3">
                    Free Workouts
                  </h2>
                  <p className="text-lg text-[var(--color-text-secondary)] max-w-lg">
                    Subscribe to unlock all <strong className="text-[var(--color-primary)]">35+ workouts</strong> and join the community of strong women.
                  </p>
                </div>

                {/* Category Filter Pills */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                        activeCategory === category.id
                          ? 'bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white shadow-lg shadow-[var(--color-primary)]/20'
                          : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 hover:text-[var(--color-text-primary)]'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          <div className="max-w-6xl mx-auto">
            <VideoGrid filterCategory={activeCategory} />

            {/* View all link */}
            <AnimatedSection variant="fadeIn" delay={0.2}>
              <div className="text-center mt-10">
                <a
                  href="https://www.youtube.com/@JessieGwen/videos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--color-primary)] font-semibold hover:gap-3 transition-all"
                >
                  View all on YouTube
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* CTA Section — Animated gradient */}
      <section className="relative py-24 overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-secondary)] to-[var(--color-primary)] animate-gradient opacity-95" />
        <div className="absolute inset-0 grain" />

        {/* Wave divider top */}
        <div className="absolute top-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="var(--color-background)" />
          </svg>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <AnimatedSection variant="fadeUp">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Ready to Transform?
              </h2>
              <p className="text-xl mb-10 opacity-90 max-w-xl mx-auto">
                Join 1,200+ women who are getting stronger, more confident, and feeling amazing from home.
              </p>
              <a
                href="https://www.youtube.com/@JessieGwen?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-10 py-5 bg-white text-[var(--color-primary)] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                <Youtube className="w-6 h-6" />
                Subscribe on YouTube
              </a>
            </div>
          </AnimatedSection>
        </div>

        {/* Wave divider bottom */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
            <path d="M0 60V30C240 0 480 0 720 30C960 60 1200 60 1440 30V60H0Z" fill="var(--color-surface)" />
          </svg>
        </div>
      </section>

      {/* Contact Section — With Form */}
      <section id="contact" className="py-24 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
              {/* Left — Info */}
              <AnimatedSection variant="fadeUp">
                <div>
                  <div className="inline-block px-3 py-1 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] text-sm font-semibold mb-6">
                    Get in Touch
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Let's Connect
                  </h2>
                  <p className="text-lg text-[var(--color-text-secondary)] mb-8 leading-relaxed">
                    For collaborations, sponsorships, or just to say hi — I'd love to hear from you!
                  </p>

                  <div className="space-y-4">
                    <a
                      href="mailto:jessiegwenfitness@gmail.com"
                      className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)]/30 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-primary)]/10 flex items-center justify-center group-hover:bg-[var(--color-primary)]/20 transition-colors">
                        <Mail className="w-5 h-5 text-[var(--color-primary)]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Email</div>
                        <div className="text-sm text-[var(--color-text-secondary)]">jessiegwenfitness@gmail.com</div>
                      </div>
                    </a>
                    <a
                      href="https://www.instagram.com/jessiegwenfitness"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 p-4 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-secondary)]/30 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[var(--color-secondary)]/10 flex items-center justify-center group-hover:bg-[var(--color-secondary)]/20 transition-colors">
                        <Instagram className="w-5 h-5 text-[var(--color-secondary)]" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">Instagram</div>
                        <div className="text-sm text-[var(--color-text-secondary)]">@jessiegwenfitness</div>
                      </div>
                    </a>
                  </div>

                  <p className="mt-8 text-sm text-[var(--color-text-muted)]">
                    Based in North Atlanta &bull; Serving Alpharetta, Roswell, Sandy Springs & Buckhead
                  </p>
                </div>
              </AnimatedSection>

              {/* Right — Contact Form */}
              <AnimatedSection variant="fadeUp" delay={0.15}>
                <div className="p-8 rounded-2xl bg-[var(--color-background)] gradient-border">
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent transition-all resize-none"
                        placeholder="Tell me what's on your mind..."
                      />
                    </div>
                    <AnimatedButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={formStatus === 'sending'}
                    >
                      {formStatus === 'sending' ? (
                        'Sending...'
                      ) : formStatus === 'sent' ? (
                        'Message Sent!'
                      ) : formStatus === 'error' ? (
                        'Error — Try Again'
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </AnimatedButton>
                  </form>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
