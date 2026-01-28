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
    if (!url) return null
    
    // Try different YouTube URL patterns
    // Standard: https://www.youtube.com/watch?v=VIDEO_ID
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/)
    if (match) return match[1]
    
    // Short URL: https://youtu.be/VIDEO_ID
    match = url.match(/youtu\.be\/([^&\n?#]+)/)
    if (match) return match[1]
    
    // Embed URL: https://www.youtube.com/embed/VIDEO_ID
    match = url.match(/youtube\.com\/embed\/([^&\n?#]+)/)
    if (match) return match[1]
    
    // Try to extract from query string
    try {
      const urlObj = new URL(url)
      const videoId = urlObj.searchParams.get('v')
      if (videoId) return videoId
    } catch (e) {
      // Not a valid URL, try manual extraction
    }
    
    // Last resort: try to find video ID pattern (11 characters)
    match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
    if (match) return match[1]
    
    return null
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
          (() => {
            const youtubeId = getYouTubeId(videoUrl)
            console.log('[VideoLightbox] YouTube URL:', videoUrl, 'Extracted ID:', youtubeId)
            
            if (!youtubeId) {
              console.error('Could not extract YouTube ID from URL:', videoUrl)
              return (
                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white">
                  <div className="text-center">
                    <p className="text-lg mb-2">Ungültige YouTube-URL</p>
                    <p className="text-sm text-gray-400 break-all px-4">{videoUrl}</p>
                  </div>
                </div>
              )
            }
            
            // YouTube embed URL - mute=0 allows sound, but autoplay might not work in all browsers
            // For better compatibility, we can use mute=1 for autoplay
            const embedUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=0&modestbranding=1&rel=0&enablejsapi=1&playsinline=1&controls=1`
            console.log('[VideoLightbox] YouTube Embed URL:', embedUrl)
            
            return (
              <iframe
                key={youtubeId} // Force re-render if ID changes
                src={embedUrl}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                title={title || 'Video'}
                frameBorder="0"
                loading="eager"
              />
            )
          })()
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
