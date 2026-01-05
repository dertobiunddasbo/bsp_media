'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // Check if we're on login page
    if (pathname === '/admin/login') {
      setLoading(false)
      return
    }

    // Check auth
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.push('/admin/login')
      } else {
        setUser(session.user)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login')
      } else {
        setUser(session?.user ?? null)
      }
    })

    return () => subscription.unsubscribe()
  }, [router, pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Wird geladen...</div>
      </div>
    )
  }

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link href="/admin" className="text-xl font-semibold text-dark">
                bsp media CMS
              </Link>
              <nav className="flex space-x-4">
                <Link
                  href="/admin"
                  className={`px-3 py-2 rounded-lg text-sm font-light transition-colors ${
                    pathname === '/admin'
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin/cases"
                  className={`px-3 py-2 rounded-lg text-sm font-light transition-colors ${
                    pathname.startsWith('/admin/cases')
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Cases
                </Link>
                <Link
                  href="/admin/content"
                  className={`px-3 py-2 rounded-lg text-sm font-light transition-colors ${
                    pathname.startsWith('/admin/content')
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Content
                </Link>
                <Link
                  href="/admin/pages"
                  className={`px-3 py-2 rounded-lg text-sm font-light transition-colors ${
                    pathname.startsWith('/admin/pages')
                      ? 'bg-accent/10 text-accent'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Seiten
                </Link>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 font-extralight">{user?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-gray-600 hover:text-accent transition-colors font-light"
              >
                Abmelden
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}












