'use client'

import { usePathname } from 'next/navigation'
import TopBar from './TopBar'
import ContextHeader from './ContextHeader'
import SecondaryBuildPanel from './SecondaryBuildPanel'
import ProofFooter from './ProofFooter'
import type { StepNum } from '@/app/context/StepContext'

const STEP_LABELS: Record<string, string> = {
  '01-problem': 'Problem',
  '02-market': 'Market',
  '03-architecture': 'Architecture',
  '04-hld': 'High-Level Design',
  '05-lld': 'Low-Level Design',
  '06-build': 'Build',
  '07-test': 'Test',
  '08-ship': 'Ship',
  'proof': 'Proof & Submission',
}

function getStepFromPath(pathname: string): { step: StepNum; label: string } | null {
  const match = pathname.match(/\/rb\/(\d{2}-[a-z-]+)/)
  if (!match) return null
  const slug = match[1]
  const num = parseInt(slug.slice(0, 2), 10) as StepNum
  if (num >= 1 && num <= 8) return { step: num, label: STEP_LABELS[slug] || slug }
  return null
}

export default function RbLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const stepInfo = getStepFromPath(pathname)
  const isProof = pathname?.endsWith('/rb/proof') || pathname === '/rb/proof'

  return (
    <div className="min-h-screen flex flex-col">
      <TopBar />
      <ContextHeader
        stepLabel={stepInfo?.label ?? (isProof ? 'Proof & Submission' : 'AI Resume Builder')}
        stepNum={stepInfo?.step ?? 0}
        totalSteps={8}
      />
      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto" style={{ width: '70%' }}>
          <div className="prose-width mx-auto p-6" style={{ padding: '24px 40px' }}>
            {children}
          </div>
        </main>
        {stepInfo && !isProof && (
          <SecondaryBuildPanel
            step={stepInfo.step}
            promptSnippet={`Step ${stepInfo.step}: ${stepInfo.label} — Add your build notes or link here.`}
          />
        )}
      </div>
      <ProofFooter />
    </div>
  )
}
