# Jessie Gwen Fitness Website

A modern, high-energy fitness website built with Next.js 15 and React 19, featuring animated components and a strategic subscription gate to convert visitors into YouTube subscribers.

## Overview

Jessie Gwen is an online personal trainer specializing in strength training for women, with a focus on home glute/booty workouts. This website showcases her 35+ YouTube workout videos and creates a conversion funnel that drives YouTube subscriptions.

## Features

- **Hero Section** - Bold, energetic landing with gradient animations and stats
- **Video Library** - Grid of 35+ workout videos with thumbnails
- **Subscription Gate** - Honor-system modal that encourages YouTube subscriptions before video access
- **About Section** - Jessie's story and training philosophy
- **Contact Section** - Direct email and Instagram links
- **Smooth Animations** - Scroll-triggered reveals, hover effects, page transitions
- **Mobile-First Design** - Optimized for fitness content consumption on phones
- **SEO Optimized** - Meta tags, Open Graph, semantic HTML

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 with CSS Variables
- **Animation**: Framer Motion + Lenis smooth scroll
- **Icons**: Lucide React
- **Font**: Plus Jakarta Sans (Google Fonts)

## Theme: Energetic Athlete

- **Primary**: Vibrant Coral (#FF6B6B)
- **Secondary**: Electric Teal (#4ECDC4)
- **Accent**: Sunset Yellow (#FFE66D)
- **Background**: Soft Cream (#FDFCFB)
- **Text**: Deep Charcoal (#292F36)

## Getting Started

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navigation & Footer
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles & theme
├── components/
│   ├── animations/         # Reusable animation components
│   │   ├── AnimatedSection.tsx
│   │   ├── AnimatedButton.tsx
│   │   ├── SmoothScroll.tsx
│   │   └── PageTransition.tsx
│   └── ui/                 # UI components
│       ├── Hero.tsx
│       ├── VideoGrid.tsx
│       ├── VideoCard.tsx
│       ├── SubscriptionGate.tsx
│       ├── Navigation.tsx
│       └── Footer.tsx
└── lib/
    ├── utils.ts            # Utility functions
    ├── videoData.ts        # Video data & YouTube helpers
    └── subscriptionState.ts # LocalStorage subscription state
```

## How the Subscription Gate Works

1. **First Visit**: All videos show "Subscribe" badges
2. **Click Video**: Modal appears prompting YouTube subscription
3. **Subscribe Button**: Opens YouTube channel in new tab, sets localStorage flag
4. **After Subscribe**: Modal closes, video opens, future videos play directly
5. **Honor System**: No server-side validation, creates psychological commitment

## Video Data

All 32 workout videos are statically defined in `src/lib/videoData.ts` with:
- Video ID (from YouTube URL)
- Title
- Thumbnail URL (high quality)

## Deployment

This site is ready for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any platform supporting Next.js

### Environment Variables

No environment variables needed for MVP. YouTube Data API integration optional for future enhancements.

## Analytics Tracking (Future)

Recommended events to track:
- Page load
- Video card click
- Subscription modal open
- Subscribe button click
- Video watch

## Performance Targets

- Lighthouse Performance: ≥90
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- Mobile-optimized: Fast loading on 3G/4G

## Social Links

- YouTube: [@JessieGwen](https://www.youtube.com/@JessieGwen)
- Instagram: [@jessiegwenfitness](https://www.instagram.com/jessiegwenfitness)

## License

© 2026 Jessie Gwen Fitness. All rights reserved.
