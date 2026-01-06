'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { EditModeProvider } from '@/contexts/EditModeContext'
import EditModeBar from '@/components/admin/EditModeBar'

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

