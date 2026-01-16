'use client'

import { useRouter } from 'next/navigation'
import CaseForm from '../CaseForm'

export default function NewCasePage() {
  const router = useRouter()

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
        <h1 className="text-4xl font-bold text-dark mb-2">Neuer Case</h1>
        <p className="text-gray-600">Erstelle ein neues Portfolio-Projekt</p>
      </div>

      <CaseForm />
    </div>
  )
}
