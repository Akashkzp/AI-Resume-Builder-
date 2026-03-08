'use client'

import Link from 'next/link'
import { useSteps } from '@/app/context/StepContext'
import type { StepNum } from '@/app/context/StepContext'

type Props = { current: StepNum }

export default function StepNav({ current }: Props) {
  const { getNextStep, getPrevStep, steps } = useSteps()
  const next = getNextStep(current)
  const prev = getPrevStep(current)
  const canProceed = steps[current]?.status === 'complete'

  return (
    <nav className="flex items-center gap-4 mt-8 pt-6 border-t border-gray-200">
      {prev ? (
        <Link
          href={`/rb/${getStepSlug(prev)}`}
          className="text-sm font-medium text-[#8B0000] hover:underline"
        >
          ← Previous
        </Link>
      ) : (
        <span />
      )}
      <div className="flex-1" />
      {next ? (
        canProceed ? (
          <Link
            href={`/rb/${getStepSlug(next)}`}
            className="text-sm font-medium text-[#8B0000] hover:underline"
          >
            Next →
          </Link>
        ) : (
          <span className="text-sm text-gray-400 cursor-not-allowed">Next (upload artifact to unlock)</span>
        )
      ) : (
        <Link
          href="/rb/proof"
          className="text-sm font-medium text-[#8B0000] hover:underline"
        >
          Go to Proof →
        </Link>
      )}
    </nav>
  )
}

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

function getStepSlug(step: StepNum): string {
  return STEP_SLUGS[step] ?? ''
}
