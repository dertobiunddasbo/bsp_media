'use client'

import { ReactNode, useEffect } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'

interface EditModalProps {
  children: ReactNode
  title: string
}

export default function EditModal({ children, title }: EditModalProps) {
  const { editingSection, setEditingSection, isEditMode } = useEditMode()

  useEffect(() => {
    if (isEditMode && editingSection) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isEditMode, editingSection])

  if (!editingSection) return null

  return (
    <div className="fixed inset-0 z-[10000] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <button
            onClick={() => setEditingSection(null)}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

