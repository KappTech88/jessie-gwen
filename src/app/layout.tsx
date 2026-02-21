import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { SmoothScroll } from "@/components/animations/SmoothScroll";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jessie Gwen Fitness | Free Home Workouts for Stronger Women",
  description: "Build your best body with glute-focused strength training designed for women. 35+ free home workouts, no equipment needed. Subscribe to join 1,200+ strong women!",
  keywords: "home workouts, glute workouts, booty workouts, strength training for women, free fitness, Jessie Gwen, Atlanta personal trainer, no equipment workouts",
  authors: [{ name: "Jessie Gwen" }],
  openGraph: {
    title: "Jessie Gwen Fitness | Free Home Workouts",
    description: "35+ free home workouts for stronger, more confident women. No equipment needed!",
    type: "website",
    locale: "en_US",
    url: "https://jessiegwen.com",
    siteName: "Jessie Gwen Fitness",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jessie Gwen Fitness | Free Home Workouts",
    description: "35+ free home workouts for stronger women. No equipment needed!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="antialiased">
        <ErrorBoundary>
          <SmoothScroll>
            {/* Skip to main content link for accessibility (WCAG 2.4.1) */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-[var(--color-primary)] focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
            >
              Skip to main content
            </a>
            <Navigation />
            <main id="main-content">{children}</main>
            <Footer />
          </SmoothScroll>
        </ErrorBoundary>
      </body>
    </html>
  );
}
