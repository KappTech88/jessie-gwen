'use client';

import { useState } from 'react';
import { Hero } from "@/components/ui/Hero";
import { VideoGrid } from "@/components/ui/VideoGrid";
import { AnimatedSection } from "@/components/animations/AnimatedSection";
import { Dumbbell, Heart, Zap } from "lucide-react";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Workouts' },
    { id: 'beginner', label: 'Beginner Friendly' },
    { id: 'quick', label: 'Quick (7-10min)' },
    { id: 'intense', label: 'Intense (12-15min)' },
  ];

  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <section id="about" className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="fadeUp">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Hi, I'm <span className="text-gradient">Jessie Gwen</span>
              </h2>
              <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
                Your go-to trainer for <strong className="text-[var(--color-primary)]">home workouts that actually work</strong>.
                I specialize in strength training for women, with a focus on building stronger glutes and boosting your confidence—all from the comfort of your home.
              </p>
            </div>
          </AnimatedSection>

          {/* Asymmetric grid layout for visual interest */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* First card spans 2 columns on desktop for asymmetry */}
            <AnimatedSection delay={0.1} variant="fadeUp" className="md:col-span-2 lg:col-span-2">
              <div className="text-center md:text-left p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-[var(--color-primary)]/5 to-[var(--color-secondary)]/5 border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)] transition-all hover:shadow-xl">
                <div className="w-16 h-16 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center md:mx-0 mx-auto mb-4">
                  <Dumbbell className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No Equipment Needed</h3>
                <p className="text-[var(--color-text-secondary)] text-lg leading-relaxed">
                  All workouts use just your bodyweight. Train anywhere, anytime, no gym required. Perfect for busy women who want effective workouts without the hassle of equipment or gym memberships.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} variant="fadeUp">
              <div className="text-center p-8 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-secondary)] transition-colors hover:shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-[var(--color-secondary)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Results</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Efficient 7-15 minute workouts designed for maximum impact in minimum time.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} variant="fadeUp" className="md:col-span-2 lg:col-span-1">
              <div className="text-center p-8 rounded-2xl bg-[var(--color-background)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-colors hover:shadow-lg">
                <div className="w-16 h-16 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-[var(--color-primary)]" />
                </div>
                <h3 className="text-xl font-bold mb-3">Built for Women</h3>
                <p className="text-[var(--color-text-secondary)]">
                  Every workout is designed specifically for women's strength goals and body mechanics.
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Video Library Section */}
      <section id="videos" className="py-20 bg-[var(--color-background)]">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="fadeUp">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Free Workout Library
              </h2>
              <p className="text-xl text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-8">
                Subscribe to unlock all <strong className="text-[var(--color-primary)]">35+ workouts</strong> and join the community of strong women transforming their bodies!
              </p>

              {/* Category Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-3 rounded-full font-semibold transition-all ${
                      activeCategory === category.id
                        ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/30'
                        : 'bg-[var(--color-surface)] text-[var(--color-text-primary)] border-2 border-[var(--color-border)] hover:border-[var(--color-primary)]'
                    }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <VideoGrid filterCategory={activeCategory} />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="fadeUp">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Body?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join 1,200+ women who are getting stronger, more confident, and feeling amazing from home.
              </p>
              <a
                href="https://www.youtube.com/@JessieGwen?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-5 bg-white text-[var(--color-primary)] rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-2xl"
              >
                Subscribe on YouTube
              </a>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-[var(--color-surface)]">
        <div className="container mx-auto px-4">
          <AnimatedSection variant="fadeUp">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's Connect
              </h2>
              <p className="text-xl text-[var(--color-text-secondary)] mb-8">
                For collaborations, sponsorships, or just to say hi, reach out on social media or email me directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:jessiegwenfitness@gmail.com"
                  className="px-8 py-4 bg-[var(--color-primary)] text-white rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  Email Me
                </a>
                <a
                  href="https://www.instagram.com/jessiegwenfitness"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[var(--color-secondary)] text-white rounded-full font-semibold hover:scale-105 transition-transform"
                >
                  DM on Instagram
                </a>
              </div>
              <p className="mt-8 text-[var(--color-text-muted)]">
                Based in North Atlanta • Serving Alpharetta, Roswell, Sandy Springs & Buckhead
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
