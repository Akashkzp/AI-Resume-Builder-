'use client'

type Props = { stepLabel: string; stepNum?: number; totalSteps?: number }

export default function ContextHeader({ stepLabel, stepNum = 0, totalSteps = 8 }: Props) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-white/60" style={{ padding: '16px 24px' }}>
      <div className="max-w-[1400px] mx-auto flex items-center justify-between">
        <h2 className="font-serif text-lg text-gray-800">{stepLabel}</h2>
        {stepNum > 0 && totalSteps > 0 && (
          <span className="text-sm text-gray-500">
            Step {stepNum} of {totalSteps}
          </span>
        )}
      </div>
    </div>
  )
}
