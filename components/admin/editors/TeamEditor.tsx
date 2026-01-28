'use client'

import { useState, useEffect } from 'react'
import { TeamMember } from '@/lib/types'
import ImageUpload from '@/components/ImageUpload'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface TeamEditorProps {
  sectionKey: string
  pageSlug: string
  initialMembers?: TeamMember[]
  onSave: () => Promise<void>
}

interface SortableItemProps {
  member: TeamMember
  index: number
  onUpdate: (id: string, field: string, value: string | number) => void
  onDelete: (id: string) => void
}

function SortableItem({ member, index, onUpdate, onDelete }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: member.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="border border-gray-200 rounded-lg p-4 bg-white"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
            </svg>
          </button>
          <span className="text-sm font-semibold text-gray-700">
            Team-Mitglied {index + 1}
          </span>
        </div>
        <button
          onClick={() => onDelete(member.id)}
          className="text-red-600 hover:text-red-700 text-sm font-semibold"
        >
          Entfernen
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Bild
          </label>
          {member.image_url && (
            <div className="mb-2">
              <img
                src={member.image_url}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}
          <ImageUpload
            onUploadComplete={(url) => onUpdate(member.id, 'image_url', url)}
            folder="team"
            buttonText={member.image_url ? "Bild ändern" : "Bild hochladen"}
          />
        </div>
        <input
          type="text"
          value={member.name}
          onChange={(e) => onUpdate(member.id, 'name', e.target.value)}
          placeholder="Name *"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <input
          type="text"
          value={member.position}
          onChange={(e) => onUpdate(member.id, 'position', e.target.value)}
          placeholder="Position *"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <input
          type="email"
          value={member.email || ''}
          onChange={(e) => onUpdate(member.id, 'email', e.target.value)}
          placeholder="E-Mail"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
        <input
          type="tel"
          value={member.phone || ''}
          onChange={(e) => onUpdate(member.id, 'phone', e.target.value)}
          placeholder="Telefonnummer"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
        />
      </div>
    </div>
  )
}

export default function TeamEditor({
  sectionKey,
  pageSlug,
  initialMembers = [],
  onSave,
}: TeamEditorProps) {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/team')
      if (res.ok) {
        const data = await res.json()
        setMembers(data || [])
      }
    } catch (error) {
      console.error('Error loading team members:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = members.findIndex((m) => m.id === active.id)
      const newIndex = members.findIndex((m) => m.id === over.id)

      const newMembers = arrayMove(members, oldIndex, newIndex)
      setMembers(newMembers)

      // Update order_index for all members
      for (let i = 0; i < newMembers.length; i++) {
        await updateMember(newMembers[i].id, { order_index: i })
      }
    }
  }

  const updateMember = async (id: string, updates: any) => {
    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      })
      if (!res.ok) throw new Error('Failed to update member')
    } catch (error) {
      console.error('Error updating member:', error)
    }
  }

  const handleUpdate = (id: string, field: string, value: string | number) => {
    const newMembers = members.map((m) =>
      m.id === id ? { ...m, [field]: value } : m
    )
    setMembers(newMembers)
  }

  const handleAdd = async () => {
    try {
      const res = await fetch('/api/admin/team', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'Neues Mitglied',
          position: 'Position',
          order_index: members.length,
        }),
      })
      if (res.ok) {
        const newMember = await res.json()
        setMembers([...members, newMember])
      }
    } catch (error) {
      console.error('Error adding member:', error)
      alert('Fehler beim Hinzufügen')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie dieses Team-Mitglied wirklich löschen?')) return

    try {
      const res = await fetch(`/api/admin/team/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        setMembers(members.filter((m) => m.id !== id))
      } else {
        throw new Error('Failed to delete')
      }
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Fehler beim Löschen')
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      // Save all members
      for (const member of members) {
        await updateMember(member.id, {
          name: member.name,
          position: member.position,
          email: member.email || null,
          phone: member.phone || null,
          image_url: member.image_url || null,
          order_index: member.order_index,
        })
      }
      await onSave()
      window.dispatchEvent(new CustomEvent('editMode:sectionSaved', { detail: { sectionKey } }))
    } catch (error) {
      console.error('Error saving team:', error)
      alert('Fehler beim Speichern')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="text-center py-8">Wird geladen...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-semibold text-gray-700">
            Team-Mitglieder
          </label>
          <button
            onClick={handleAdd}
            className="px-3 py-1 bg-accent text-white rounded-lg text-sm font-semibold hover:bg-accent/90"
          >
            + Hinzufügen
          </button>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={members.map((m) => m.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-3">
              {members.map((member, index) => (
                <SortableItem
                  key={member.id}
                  member={member}
                  index={index}
                  onUpdate={handleUpdate}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        {members.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-8">
            Noch keine Team-Mitglieder. Klicken Sie auf "+ Hinzufügen" um eines hinzuzufügen.
          </p>
        )}
      </div>

      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full px-6 py-3 bg-accent text-white rounded-lg font-semibold hover:bg-accent/90 transition-colors disabled:opacity-50"
        >
          {saving ? 'Speichern...' : '💾 Änderungen speichern'}
        </button>
      </div>
    </div>
  )
}
