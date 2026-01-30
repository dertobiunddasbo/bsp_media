/**
 * Type Definitions - Centralized Types for the Application
 */

// ============================================
// Section Data Types
// ============================================

export interface HeroData {
  badge?: string
  title?: string
  subtitle?: string
  buttonText?: string
  backgroundImage?: string
  backgroundVideo?: string
}

export interface Service {
  title: string
  description: string
  image: string
  backgroundVideo?: string
  gradient?: string
}

export interface LeistungenData {
  title?: string
  subtitle?: string
  items?: Service[]
}

export interface AboutData {
  title?: string
  subtitle?: string
  text1?: string
  text2?: string
  text3?: string
  image?: string
}

export interface TrustSectionData {
  title?: string
  subtitle?: string
  clients?: Array<{
    name: string
    logo: string
  }>
}

export interface ValuePropositionData {
  title?: string
  values?: Array<{
    title: string
    description: string
    gradient: string
    icon?: string
  }>
}

export interface CollaborationPrinciplesData {
  title?: string
  principles?: Array<{
    title: string
    description: string
    gradient: string
  }>
}

export interface NDADisclaimerData {
  badge?: string
  title?: string
  subtitle?: string
  items?: Array<{
    title: string
    description: string
  }>
  ctaText?: string
  ctaLink?: string
}

export interface FooterData {
  address?: string
  email?: string
  phone?: string
  copyright?: string
}

export interface TestimonialData {
  title?: string
  subtitle?: string
  testimonials?: Array<{
    name: string
    position: string
    company: string
    image?: string
    quote: string
    rating?: number
  }>
}

export interface FAQData {
  title?: string
  subtitle?: string
  items?: Array<{
    question: string
    answer: string
  }>
}

export interface WhyUsData {
  title?: string
  subtitle?: string
  items?: Array<{
    number: string
    title: string
    description: string
    linkText?: string
    linkUrl?: string
  }>
}

// 24h Ideen-Check Landing Page
export interface IdeenCheckPromiseData {
  items?: Array<{ title: string; text: string }>
}

export interface IdeenCheckWhyData {
  text?: string
}

export interface IdeenCheckProductData {
  items?: Array<{ type: string; label: string; example: string }>
}

export interface Case {
  id: string
  title: string
  category: string
  description: string
  image: string
  client: string
  slug: string
}

export interface TeamMember {
  id: string
  name: string
  position: string
  email?: string
  phone?: string
  image_url?: string
  order_index: number
  created_at?: string
  updated_at?: string
}

// ============================================
// Page Types
// ============================================

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
}

export interface Page {
  id: string
  slug: string
  title: string
  description?: string
  sections: {
    hero?: HeroData
    leistungen?: LeistungenData
    about?: AboutData
    [key: string]: any
  }
  seo?: SEOData
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// ============================================
// API Types
// ============================================

export interface APIResponse<T> {
  data?: T
  error?: string
}

export type SectionKey = 'hero' | 'leistungen' | 'about' | 'trust' | 'values' | 'principles' | 'nda' | 'footer' | 'testimonials' | 'faq' | string

// ============================================
// Edit Mode Types
// ============================================

export interface EditModeContextType {
  isEditMode: boolean
  editingSection: string | null
  setEditingSection: (section: string | null) => void
  enableEditMode: () => void
  disableEditMode: () => void
  pageSlug: string | null
  setPageSlug: (slug: string | null) => void
}

