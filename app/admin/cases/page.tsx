'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
  slug: string
  client?: string
  created_at: string
}

function SortableTableRow({ caseItem, onDelete }: { caseItem: Case; onDelete: (id: string, title: string) => void }) {
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
    <tr
      ref={setNodeRef}
      style={style}
      className="hover:bg-gray-50 transition-colors"
    >
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-accent"
          >
            <svg
              className="w-5 h-5"
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
          <div>
            <div className="text-sm font-semibold text-gray-900">{caseItem.title}</div>
            <div className="text-xs text-gray-500">{caseItem.slug}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className="px-3 py-1 text-xs font-semibold rounded-full bg-accent/10 text-accent">
          {caseItem.category}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
        {caseItem.client || '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {new Date(caseItem.created_at).toLocaleDateString('de-DE')}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex items-center justify-end gap-3">
          <Link
            href={`/admin/cases/${caseItem.id}`}
            className="text-accent hover:text-accent/80 font-semibold"
          >
            Bearbeiten
          </Link>
          <button
            onClick={() => onDelete(caseItem.id, caseItem.title)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Löschen
          </button>
        </div>
      </td>
    </tr>
  )
}

export default function CasesPage() {
  const [cases, setCases] = useState<Case[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchCases()
  }, [])

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/admin/cases')
      if (!res.ok) throw new Error('Failed to fetch cases')
      const data = await res.json()
      setCases(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching cases:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = cases.findIndex((item) => item.id === active.id)
      const newIndex = cases.findIndex((item) => item.id === over.id)
      
      const newCases = arrayMove(cases, oldIndex, newIndex)
      setCases(newCases)

      // Save new order
      await saveOrder(newCases)
    }
  }

  const saveOrder = async (orderedCases: Case[]) => {
    setSaving(true)
    try {
      const caseIds = orderedCases.map((c) => c.id)
      const res = await fetch('/api/cases/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ caseIds }),
      })

      if (!res.ok) {
        throw new Error('Fehler beim Speichern der Sortierung')
      }
    } catch (error) {
      console.error('Error saving order:', error)
      alert('Fehler beim Speichern der Sortierung. Bitte Seite neu laden.')
      // Reload to get correct order
      fetchCases()
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Möchten Sie den Case "${title}" wirklich löschen?`)) return

    try {
      const res = await fetch(`/api/admin/cases/${id}`, {
        method: 'DELETE',
      })

      if (res.ok) {
        fetchCases()
      } else {
        alert('Fehler beim Löschen')
      }
    } catch (error) {
      console.error('Error deleting case:', error)
      alert('Fehler beim Löschen')
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-dark mb-2">Cases</h1>
          <p className="text-gray-600">Verwalte deine Portfolio-Projekte</p>
        </div>
        <Link
          href="/admin/cases/new"
          className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors shadow-lg hover:shadow-xl"
        >
          + Neuer Case
        </Link>
      </div>

      {cases.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-6xl mb-4">🎬</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Noch keine Cases vorhanden</h3>
          <p className="text-gray-600 mb-6">Erstelle deinen ersten Portfolio-Case</p>
          <Link
            href="/admin/cases/new"
            className="inline-block bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
          >
            Ersten Case erstellen
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {saving && (
            <div className="bg-blue-50 border-b border-blue-200 px-6 py-3 text-sm text-blue-700">
              Sortierung wird gespeichert...
            </div>
          )}
          <div className="overflow-x-auto">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Titel
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Kategorie
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Client
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Erstellt
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">
                      Aktionen
                    </th>
                  </tr>
                </thead>
                <SortableContext
                  items={cases.map((c) => c.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cases.map((caseItem) => (
                      <SortableTableRow
                        key={caseItem.id}
                        caseItem={caseItem}
                        onDelete={handleDelete}
                      />
                    ))}
                  </tbody>
                </SortableContext>
              </table>
            </DndContext>
          </div>
        </div>
      )}
    </div>
  )
}
