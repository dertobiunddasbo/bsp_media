'use client'

import { Editor } from '@tinymce/tinymce-react'
import { getTinyMCEConfig } from '@/lib/tinymce-config'

interface TinyMCEEditorProps {
  value: string
  onChange: (content: string) => void
}

export default function TinyMCEEditor({ value, onChange }: TinyMCEEditorProps) {
  return (
    <Editor
      apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY || 'no-api-key'}
      value={value}
      onEditorChange={onChange}
      init={getTinyMCEConfig(400)}
    />
  )
}
