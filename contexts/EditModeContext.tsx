'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface EditModeContextType {
  isEditMode: boolean
  editingSection: string | null
  setEditingSection: (section: string | null) => void
  enableEditMode: () => void
  disableEditMode: () => void
  pageSlug: string | null
  setPageSlug: (slug: string | null) => void
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined)

export function EditModeProvider({ children }: { children: ReactNode }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [editingSection, setEditingSection] = useState<string | null>(null)
  const [pageSlug, setPageSlug] = useState<string | null>(null)

  const enableEditMode = () => setIsEditMode(true)
  const disableEditMode = () => {
    setIsEditMode(false)
    setEditingSection(null)
  }

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        editingSection,
        setEditingSection,
        enableEditMode,
        disableEditMode,
        pageSlug,
        setPageSlug,
      }}
    >
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  const context = useContext(EditModeContext)
  if (context === undefined) {
    throw new Error('useEditMode must be used within an EditModeProvider')
  }
  return context
}

