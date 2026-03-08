'use client'

import Link from 'next/link'

export default function ProofFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white/80 px-6 py-4" style={{ padding: '16px 24px' }}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <span className="text-sm text-gray-600">AI Resume Builder — Build Track</span>
        <Link
          href="/rb/proof"
          className="text-sm font-medium text-[#8B0000] hover:underline"
        >
          Proof & Submission →
        </Link>
      </div>
    </footer>
  )
}
