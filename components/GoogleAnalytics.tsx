'use client'

import Script from 'next/script'
import { GA_MEASUREMENT_ID, getStoredConsent, updateGtagConsent } from '@/lib/analytics'
import { useEffect } from 'react'

/**
 * Google Analytics 4 mit Consent Mode v2 (DSGVO/TDDDG-konform).
 * - Consent standardmäßig "denied" (kein Tracking bis Opt-in).
 * - Bei bereits gespeicherter Einwilligung wird Consent beim Mount aktualisiert.
 */
export default function GoogleAnalytics() {
  const measurementId = GA_MEASUREMENT_ID

  useEffect(() => {
    const stored = getStoredConsent()
    if (stored === 'granted') updateGtagConsent('granted')
  }, [])

  if (!measurementId) return null

  return (
    <>
      {/* Consent und gtag vor dem GA-Script setzen (Consent Mode v2) */}
      <Script
        id="gtag-consent-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'analytics_storage': 'denied',
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied'
            });
          `,
        }}
      />
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script
        id="gtag-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              'anonymize_ip': true,
              'allow_google_signals': false,
              'allow_ad_personalization_signals': false
            });
          `,
        }}
      />
    </>
  )
}
