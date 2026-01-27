'use client'

import { useState, useEffect } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface Case {
  id: string
  title: string
  category: string
  description: string
  image: string
  client: string
  slug?: string
}

interface CasesEditorProps {
  onSave: (caseIds: string[]) => Promise<void>
}

function SortableCaseItem({ caseItem }: { caseItem: Case }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: caseItem.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg hover:border-accent transition-colors"
    >
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-accent"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 8h16M4 16h16"
          />
        </svg>
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-3">
          <img
            src={caseItem.image}
            alt={caseItem.title}
            className="w-16 h-16 object-cover rounded"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{caseItem.title}</h3>
            <p className="text-sm text-gray-600">{caseItem.category}</p>
            {caseItem.client && (
              <p className="text-xs text-gray-500">Client: {caseItem.client}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CasesEditor({ onSave }: CasesEditorProps) {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    loadCases()
  }, [])

  const loadCases = async () => {
    try {
      const res = await fetch('/api/cases/all', {
        cache: 'no-store',
      })
      if (res.ok) {
        const data = await res.json()
        if (data && Array.isArray(data)) {
          setCases(data)
        }
      } else {
        console.error('Failed to load cases with IDs')
      }
    } catch (error) {
      console.error('Error loading cases:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setCases((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const caseIds = cases.map((c) => c.id)
      await onSave(caseIds)
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey: 'cases' } }))
    } catch (error) {
      console.error('Error saving cases order:', error)
      alert('Fehler beim Speichern der Sortierung')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8 text-gray-600">Wird geladen...</div>
  }

  if (cases.length === 0) {
    return (
      <div className="text-center py-8 text-gray-600">
        <p>Keine Cases vorhanden. Bitte erstellen Sie zuerst Cases im Portfolio.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Cases sortieren
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Ziehen Sie die Cases per Drag-and-Drop in die gewünschte Reihenfolge.
          Die oberste Case wird zuerst angezeigt.
        </p>

        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={cases.map((c) => c.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {cases.map((caseItem) => (
                <SortableCaseItem key={caseItem.id} caseItem={caseItem} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Speichern...' : '💾 Sortierung speichern'}
        </button>
      </div>
    </div>
  )
}
