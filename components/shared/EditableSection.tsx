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

  // Early return AFTER all hooks
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
      className={`relative ${className} ${isEditing ? 'ring-4 ring-accent ring-offset-4' : isHovered ? 'ring-2 ring-accent/50 ring-offset-2' : 'ring-2 ring-transparent ring-offset-2'} transition-all`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {/* Edit Button - immer sichtbar im Edit-Mode */}
      <div className="absolute top-4 right-4 z-[100]">
        <button
          onClick={handleEditClick}
          className={`px-4 py-2 bg-accent text-white rounded-lg shadow-xl font-semibold hover:bg-accent/90 transition-all flex items-center gap-2 ${
            isEditing ? 'animate-pulse' : ''
          }`}
          style={{
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          }}
        >
          ✏️ {isEditing ? 'Wird bearbeitet...' : 'Bearbeiten'}
        </button>
      </div>
      {/* Visual indicator overlay */}
      {isHovered && !isEditing && (
        <div className="absolute inset-0 border-2 border-accent/30 border-dashed pointer-events-none z-10" />
      )}
    </div>
  )
}

