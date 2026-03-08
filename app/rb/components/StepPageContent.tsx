'use client'

import Link from 'next/link'
import { useSteps } from '@/app/context/StepContext'
import StepNav from './StepNav'
import type { StepNum } from '@/app/context/StepContext'

const STEP_SLUGS: Record<StepNum, string> = {
  1: '01-problem',
  2: '02-market',
  3: '03-architecture',
  4: '04-hld',
  5: '05-lld',
  6: '06-build',
  7: '07-test',
  8: '08-ship',
}

type Props = { step: StepNum; title: string; children?: React.ReactNode }

export default function StepPageContent({ step, title, children }: Props) {
  const { isStepUnlocked } = useSteps()
  const unlocked = isStepUnlocked(step)

  if (!unlocked) {
    return (
      <div className="space-y-4">
        <h2 className="font-serif text-2xl text-gray-800">Step {step}: {title}</h2>
        <div className="p-6 border-2 border-[#8B0000]/30 bg-red-50/50 rounded">
          <p className="font-medium text-gray-800">This step is locked.</p>
          <p className="text-gray-600 mt-1">Complete the earlier steps and upload artifacts to unlock.</p>
          <Link href="/rb/01-problem" className="inline-block mt-4 text-[#8B0000] font-medium hover:underline">
            Go to Step 1 →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-2xl text-gray-800">{title}</h2>
      {children ?? (
        <p className="text-gray-600">Content for this step. Use the build panel to add your artifact.</p>
      )}
      <StepNav current={step} />
    </div>
  )
}
