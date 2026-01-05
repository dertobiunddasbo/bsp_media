'use client'

import { useEffect, useState, useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/EditModeBar'

export function EditWrapper({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const isEditMode = searchParams.get('edit') === 'true'

  if (!isEditMode) {
    return <>{children}</>
  }

  return (
    <EditModeProvider>
      <EditModeBar />
      {children}
    </EditModeProvider>
  )
}

