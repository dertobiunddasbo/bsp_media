/**
 * Team Section Component
 * Displays team members with edit mode support
 */

'use client'

import { useEffect, useState } from 'react'
import { useEditMode } from '@/contexts/EditModeContext'
import { TeamMember } from '@/lib/types'
import EditableSection from '@/components/shared/EditableSection'
import EditModal from '@/components/shared/EditModal'
import TeamEditor from '@/components/admin/editors/TeamEditor'

interface TeamProps {
  pageSlug?: string
}

export default function Team({ pageSlug = 'home' }: TeamProps) {
  const { isEditMode, editingSection } = useEditMode()
  const [members, setMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  const loadMembers = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/team', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
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

  useEffect(() => {
    loadMembers()
    
    const handleSave = () => loadMembers()
    window.addEventListener('editMode:sectionSaved', handleSave)
    return () => window.removeEventListener('editMode:sectionSaved', handleSave)
  }, [])

  if (loading) {
    return (
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
          <div className="text-center text-gray-600">Wird geladen...</div>
        </div>
      </section>
    )
  }

  if (members.length === 0 && !isEditMode) {
    return null
  }

  return (
    <>
      <EditableSection sectionKey="team">
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-block mb-6 px-5 py-2 bg-accent/10 rounded-full text-sm font-light text-accent border border-accent/20">
                Unser Team
              </div>
              <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6">
                Die Menschen hinter bsp media
              </h2>
            </div>

            {members.length === 0 ? (
              <div className="text-center text-gray-500 py-12">
                <p className="font-light">Noch keine Team-Mitglieder hinzugefügt.</p>
                {isEditMode && (
                  <p className="mt-2 text-sm text-gray-400">
                    Klicken Sie auf "Bearbeiten" um Team-Mitglieder hinzuzufügen.
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="group text-center"
                  >
                    <div className="relative mb-6 aspect-square w-full max-w-xs mx-auto rounded-xl overflow-hidden bg-gray-100">
                      {member.image_url ? (
                        <img
                          src={member.image_url}
                          alt={member.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5">
                          <div className="text-6xl font-bold text-accent/30">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        </div>
                      )}
                    </div>
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-lg text-gray-600 font-light mb-4">
                      {member.position}
                    </p>
                    <div className="space-y-2">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="block text-accent hover:underline font-light text-sm"
                        >
                          {member.email}
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="block text-gray-600 hover:text-accent font-light text-sm"
                        >
                          {member.phone}
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </EditableSection>

      {isEditMode && editingSection === 'team' && (
        <EditModal title="Team bearbeiten">
          <TeamEditor
            sectionKey="team"
            pageSlug={pageSlug}
            initialMembers={members}
            onSave={loadMembers}
          />
        </EditModal>
      )}
    </>
  )
}
