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
}

export interface Service {
  title: string
  description: string
  image: string
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

export type SectionKey = 'hero' | 'leistungen' | 'about' | string

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

