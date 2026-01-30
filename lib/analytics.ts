/**
 * Google Analytics 4 (GA4) & Consent Mode v2
 * DSGVO/TDDDG-konform: Consent standardmäßig "denied", Tracking erst nach Opt-in.
 */

export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''

export const CONSENT_STORAGE_KEY = 'bsp-media-cookie-consent'

export type ConsentStatus = 'granted' | 'denied' | null

/**
 * Liest gespeicherte Einwilligung (localStorage).
 * null = noch keine Entscheidung (Banner anzeigen).
 */
export function getStoredConsent(): ConsentStatus {
  if (typeof window === 'undefined') return null
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (v === 'granted' || v === 'denied') return v
    return null
  } catch {
    return null
  }
}

/**
 * Speichert Einwilligung und aktualisiert gtag (falls vorhanden).
 */
export function setConsent(status: 'granted' | 'denied'): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, status)
    updateGtagConsent(status)
  } catch {
    // ignore
  }
}

/**
 * Aktualisiert Google Consent State (Consent Mode v2).
 * Muss nach Nutzerentscheidung aufgerufen werden.
 */
export function updateGtagConsent(status: 'granted' | 'denied'): void {
  if (typeof window === 'undefined' || typeof (window as unknown as { gtag?: (a: string, b: string, c: object) => void }).gtag !== 'function') return
  const gtag = (window as unknown as { gtag: (a: string, b: string, c: object) => void }).gtag
  gtag('consent', 'update', {
    analytics_storage: status,
    ad_storage: status,
    ad_user_data: status,
    ad_personalization: status,
  })
}
