'use client'

import { useEffect } from 'react'

interface VideoLightboxProps {
  isOpen: boolean
  onClose: () => void
  videoUrl: string
  videoType: 'vimeo' | 'youtube' | 'direct'
  title?: string
}

export default function VideoLightbox({
  isOpen,
  onClose,
  videoUrl,
  videoType,
  title,
}: VideoLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  const getVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
    return match ? match[1] : url.split('/').pop()
  }

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-7xl aspect-video bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
          aria-label="Schließen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {videoType === 'vimeo' ? (
          <iframe
            src={`https://player.vimeo.com/video/${getVimeoId(videoUrl)}?autoplay=1&title=0&byline=0&portrait=0`}
            className="w-full h-full"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={title || 'Video'}
          />
        ) : videoType === 'youtube' ? (
          <iframe
            src={`https://www.youtube.com/embed/${getYouTubeId(videoUrl) || videoUrl.split('v=')[1]?.split('&')[0]}?autoplay=1`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={title || 'Video'}
          />
        ) : (
          <video
            src={videoUrl}
            controls
            autoPlay
            className="w-full h-full object-contain"
            title={title || 'Video'}
          />
        )}

        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
            <h3 className="text-white text-xl font-semibold">{title}</h3>
          </div>
        )}
      </div>
    </div>
  )
}
