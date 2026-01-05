'use client'

import { ReactNode, useState, useEffect, useRef } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'

interface EditableSectionProps {
  sectionKey: string
  children: ReactNode
  className?: string
}

export default function EditableSection({
  sectionKey,
  children,
  className = '',
}: EditableSectionProps) {
  const { isEditMode, editingSection, setEditingSection } = useEditMode()
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  if (!isEditMode) {
    return <div className={className}>{children}</div>
  }

  const isEditing = editingSection === sectionKey

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setEditingSection(sectionKey)
  }

  return (
    <div
      ref={sectionRef}
      className={`relative ${className} ${isEditing ? 'ring-2 ring-accent ring-offset-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {(isHovered || isEditing) && (
        <div className="absolute top-2 right-2 z-50">
          <button
            onClick={handleEditClick}
            className="px-3 py-2 bg-accent text-white rounded-lg shadow-lg font-semibold hover:bg-accent/90 transition-colors flex items-center gap-2"
          >
            ✏️ Bearbeiten
          </button>
        </div>
      )}
    </div>
  )
}

