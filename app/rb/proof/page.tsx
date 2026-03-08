'use client'

import { useSteps } from '@/app/context/StepContext'
import { useCallback, useState } from 'react'

const STEP_NAMES: Record<number, string> = {
  1: 'Problem',
  2: 'Market',
  3: 'Architecture',
  4: 'HLD',
  5: 'LLD',
  6: 'Build',
  7: 'Test',
  8: 'Ship',
}

export default function ProofPage() {
  const { steps } = useSteps()
  const [lovableLink, setLovableLink] = useState('')
  const [githubLink, setGithubLink] = useState('')
  const [deployLink, setDeployLink] = useState('')
  const [copied, setCopied] = useState(false)

  const buildSubmission = useCallback(() => {
    const statusLines = [1, 2, 3, 4, 5, 6, 7, 8].map(
      (s) => `Step ${s} (${STEP_NAMES[s]}): ${steps[s as keyof typeof steps]?.status === 'complete' ? 'Complete' : 'Pending'}`
    )
    return [
      '--- AI Resume Builder - Project 3 - Final Submission ---',
      '',
      'Step statuses:',
      ...statusLines,
      '',
      `Lovable link: ${lovableLink || '(not set)'}`,
      `GitHub link: ${githubLink || '(not set)'}`,
      `Deploy link: ${deployLink || '(not set)'}`,
      '',
      '---',
    ].join('\n')
  }, [steps, lovableLink, githubLink, deployLink])

  const handleCopyFinalSubmission = useCallback(() => {
    const text = buildSubmission()
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }, [buildSubmission])

  return (
    <div className="space-y-8 max-w-2xl">
      <h2 className="font-serif text-2xl text-gray-800">Proof & Submission</h2>

      <section>
        <h3 className="font-serif text-lg text-gray-800 mb-4">8 step statuses</h3>
        <ul className="space-y-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
            <li key={s} className="flex items-center gap-3">
              <span
                className={`inline-block w-3 h-3 rounded-full ${
                  steps[s as keyof typeof steps]?.status === 'complete' ? 'bg-green-600' : 'bg-gray-300'
                }`}
              />
              <span className="text-gray-700">
                Step {s}: {STEP_NAMES[s]} —{' '}
                {steps[s as keyof typeof steps]?.status === 'complete' ? 'Complete' : 'Pending'}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-4">
        <h3 className="font-serif text-lg text-gray-800">Links</h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Lovable link</label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white"
            placeholder="https://..."
            value={lovableLink}
            onChange={(e) => setLovableLink(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">GitHub link</label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white"
            placeholder="https://github.com/..."
            value={githubLink}
            onChange={(e) => setGithubLink(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Deploy link</label>
          <input
            type="url"
            className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900 bg-white"
            placeholder="https://..."
            value={deployLink}
            onChange={(e) => setDeployLink(e.target.value)}
          />
        </div>
      </section>

      <section>
        <button
          type="button"
          onClick={handleCopyFinalSubmission}
          className="px-4 py-2 bg-[#8B0000] text-white font-medium rounded hover:bg-[#6d0000] transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Final Submission'}
        </button>
      </section>
    </div>
  )
}
