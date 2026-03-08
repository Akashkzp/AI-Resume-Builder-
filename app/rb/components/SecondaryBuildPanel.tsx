'use client'

import { useSteps } from '@/app/context/StepContext'
import type { StepNum } from '@/app/context/StepContext'

type Props = {
  step: StepNum
  promptSnippet?: string
  children?: React.ReactNode
}

export default function SecondaryBuildPanel({ step, promptSnippet, children }: Props) {
  const { steps, setArtifact } = useSteps()
  const artifact = steps[step]?.artifact ?? ''

  return (
    <aside
      className="border-l border-gray-200 bg-white overflow-y-auto flex flex-col"
      style={{ width: '30%', minWidth: 280 }}
    >
      <div className="p-4 flex flex-col gap-4" style={{ padding: '16px 24px' }}>
        <h3 className="font-serif text-base font-semibold text-gray-800">Build panel</h3>
        {promptSnippet && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Copy into Lovable</label>
            <textarea
              readOnly
              className="w-full h-24 p-2 border border-gray-300 rounded text-sm font-mono bg-gray-50"
              value={promptSnippet}
            />
            <button
              type="button"
              className="mt-2 text-sm px-3 py-1.5 border border-[#8B0000] text-[#8B0000] rounded hover:bg-[#8B0000]/10"
              onClick={() => navigator.clipboard.writeText(promptSnippet)}
            >
              Copy
            </button>
          </div>
        )}
        <div>
          <label className="block text-sm text-gray-600 mb-1">Artifact (required to unlock Next)</label>
          <textarea
            className="w-full h-20 p-2 border border-gray-300 rounded text-sm"
            placeholder="Paste link or upload reference (rb_step_X_artifact)"
            value={artifact}
            onChange={(e) => setArtifact(step, e.target.value)}
          />
        </div>
        {children}
      </div>
    </aside>
  )
}
