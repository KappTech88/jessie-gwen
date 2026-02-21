'use client';

const SUBSCRIPTION_KEY = 'jessie_subscribed';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@JessieGwen?sub_confirmation=1';

/**
 * Check if user has subscribed
 * Handles localStorage errors gracefully (private browsing, disabled storage, etc.)
 * @returns boolean indicating subscription status (defaults to false on error)
 */
export function isSubscribed(): boolean {
  // Server-side or no window object
  if (typeof window === 'undefined') return false;

  try {
    return localStorage.getItem(SUBSCRIPTION_KEY) === 'true';
  } catch (error) {
    // localStorage access denied (private browsing, disabled, full storage, etc.)
    if (process.env.NODE_ENV === 'development') {
      console.warn('localStorage access denied:', error);
    }
    return false;
  }
}

/**
 * Set subscription status
 * Handles localStorage errors gracefully (private browsing, disabled storage, etc.)
 * @param value - boolean indicating whether user has subscribed
 */
export function setSubscribed(value: boolean): void {
  // Server-side or no window object
  if (typeof window === 'undefined') return;

  try {
    if (value) {
      localStorage.setItem(SUBSCRIPTION_KEY, 'true');
    } else {
      localStorage.removeItem(SUBSCRIPTION_KEY);
    }
  } catch (error) {
    // localStorage write failed (private browsing, quota exceeded, disabled, etc.)
    if (process.env.NODE_ENV === 'development') {
      console.warn('localStorage write failed:', error);
    }
    // Silently fail - user experience continues, just won't persist subscription state
    // Could optionally show a toast notification here in production
  }
}

/**
 * Get YouTube subscribe URL with confirmation parameter
 * @returns URL string for YouTube subscription with auto-confirmation
 */
export function getSubscribeUrl(): string {
  return YOUTUBE_CHANNEL_URL;
}
