'use client'

export default function TopBar() {
  return (
    <header className="bg-surface border-b border-gray-200 px-6 py-4" style={{ padding: '16px 24px' }}>
      <div className="flex items-center justify-between max-w-[1400px] mx-auto">
        <h1 className="font-serif text-xl font-semibold text-gray-900">AI Resume Builder</h1>
        <span className="text-sm text-gray-500">Project 3 — Build Track</span>
      </div>
    </header>
  )
}
