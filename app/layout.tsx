import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import { ResumeProvider } from '@/lib/resumeContext'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Resume Builder - Build Track',
  description: 'KodNest Premium Build System - Project 3',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-surface text-gray-900 antialiased flex flex-col">
        <ResumeProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
        </ResumeProvider>
      </body>
    </html>
  )
}

