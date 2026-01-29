'use client'

import { useState } from 'react'
import VideoLightbox from '@/components/shared/VideoLightbox'
import ImageLightbox from '@/components/shared/ImageLightbox'

interface CaseMediaProps {
  videos: Array<{
    id: string
    video_url: string
    video_type: 'vimeo' | 'youtube' | 'direct'
    title?: string
  }>
  images: Array<{
    id: string
    image_url: string
  }>
  caseTitle: string
}

export default function CaseMedia({ videos, images, caseTitle }: CaseMediaProps) {
  const [selectedVideo, setSelectedVideo] = useState<{
    url: string
    type: 'vimeo' | 'youtube' | 'direct'
    title?: string
  } | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const getVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/)
    return match ? match[1] : url.split('/').pop()
  }

  const getYouTubeId = (url: string) => {
    if (!url) return null
    // Shared/Short link: https://youtu.be/DO5OqyTiK90?si=... – ID vor ? nehmen
    const youtuBeMatch = url.match(/youtu\.be\/([^&\n?#]+)/)
    if (youtuBeMatch) return youtuBeMatch[1].split('?')[0].trim()
    let match = url.match(/(?:youtube\.com\/watch\?v=|youtube\.com\/embed\/|youtube\.com\/v\/)([^&\n?#]+)/)
    if (match) return match[1]
    match = url.match(/youtube\.com\/embed\/([^&\n?#]+)/)
    if (match) return match[1]
    try {
      const urlObj = new URL(url)
      const videoId = urlObj.searchParams.get('v')
      if (videoId) return videoId
    } catch (e) {}
    match = url.match(/[?&]v=([a-zA-Z0-9_-]{11})/)
    if (match) return match[1]
    return null
  }

  return (
    <>
      {/* Videos Section */}
      {videos.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <h2 className="text-3xl font-semibold text-dark mb-8">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="relative aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() =>
                    setSelectedVideo({
                      url: video.video_url,
                      type: video.video_type,
                      title: video.title,
                    })
                  }
                >
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white ml-1"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {video.video_type === 'vimeo' ? (
                    <iframe
                      src={`https://player.vimeo.com/video/${getVimeoId(video.video_url)}?title=0&byline=0&portrait=0&badge=0&autopause=1&transparent=1&controls=0`}
                      className="w-full h-full pointer-events-none"
                      allow="autoplay; fullscreen; picture-in-picture"
                      allowFullScreen
                      title={video.title || caseTitle}
                    />
                  ) : video.video_type === 'youtube' ? (
                    (() => {
                      const youtubeId = getYouTubeId(video.video_url)
                      console.log('[CaseMedia] YouTube URL:', video.video_url, 'Extracted ID:', youtubeId, 'Type:', video.video_type)
                      
                      if (!youtubeId) {
                        console.error('Could not extract YouTube ID from URL:', video.video_url)
                        return (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800 text-white text-sm p-4">
                            <div className="text-center">
                              <p>Ungültige YouTube-URL</p>
                              <p className="text-xs mt-2 break-all">{video.video_url}</p>
                            </div>
                          </div>
                        )
                      }
                      // Use YouTube thumbnail instead of iframe for better performance
                      const thumbnailUrl = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
                      return (
                        <img
                          src={thumbnailUrl}
                          alt={video.title || 'YouTube Video'}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to lower quality thumbnail
                            const target = e.target as HTMLImageElement
                            target.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                          }}
                        />
                      )
                    })()
                  ) : (
                    <video
                      src={video.video_url}
                      className="w-full h-full object-cover pointer-events-none"
                      title={video.title || caseTitle}
                    />
                  )}
                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4 z-20">
                      <p className="font-semibold">{video.title}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Images Section */}
      {images.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-8">
            <h2 className="text-3xl font-semibold text-dark mb-8">Bilder</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image.image_url}
                    alt={caseTitle}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Lightbox */}
      {selectedVideo && (
        <VideoLightbox
          isOpen={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo.url}
          videoType={selectedVideo.type}
          title={selectedVideo.title}
        />
      )}

      {/* Image Lightbox */}
      {selectedImageIndex !== null && (
        <ImageLightbox
          isOpen={selectedImageIndex !== null}
          onClose={() => setSelectedImageIndex(null)}
          images={images.map((img) => ({
            id: img.id,
            url: img.image_url,
            alt: caseTitle,
          }))}
          initialIndex={selectedImageIndex}
        />
      )}
    </>
  )
}
