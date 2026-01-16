'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import CaseForm from '../CaseForm'

export default function EditCasePage() {
  const params = useParams()
  const router = useRouter()
  const caseId = Array.isArray(params.id) ? params.id[0] : (params.id as string)
  const [caseData, setCaseData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (caseId && caseId !== 'new') {
      fetchCase()
    }
  }, [caseId])

  const fetchCase = async () => {
    try {
      const res = await fetch(`/api/admin/cases/${caseId}`)
      if (!res.ok) throw new Error('Failed to fetch case')
      const data = await res.json()
      setCaseData(data)
    } catch (error) {
      console.error('Error fetching case:', error)
      alert('Fehler beim Laden des Cases')
      router.push('/admin/cases')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="text-gray-600">Wird geladen...</div>
  }

  return (
    <div>
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Zurück
        </button>
        <h1 className="text-4xl font-bold text-dark mb-2">Case bearbeiten</h1>
        <p className="text-gray-600">Bearbeite dein Portfolio-Projekt</p>
      </div>

      <CaseForm initialData={caseData} />
    </div>
  )
}
