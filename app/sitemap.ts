import { MetadataRoute } from 'next'
import { supabaseAdmin } from '@/lib/supabase-admin'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://bsp-media.de'

  // Statische Seiten
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agentur-partner`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/corporate-high-end`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/immobilien-bau`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/mittelstand`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/termin`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  // Dynamische Portfolio-Seiten aus der Datenbank
  let portfolioPages: MetadataRoute.Sitemap = []
  
  try {
    const { data: cases, error } = await supabaseAdmin
      .from('cases')
      .select('slug, id, updated_at')
      .order('updated_at', { ascending: false })

    if (!error && cases) {
      portfolioPages = cases
        .filter((caseItem) => caseItem.slug || caseItem.id)
        .map((caseItem) => ({
          url: `${baseUrl}/portfolio/${caseItem.slug || caseItem.id}`,
          lastModified: caseItem.updated_at ? new Date(caseItem.updated_at) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.8,
        }))
    }
  } catch (error) {
    console.error('Error fetching cases for sitemap:', error)
    // Bei Fehler einfach ohne Portfolio-Seiten fortfahren
  }

  return [...staticPages, ...portfolioPages]
}
