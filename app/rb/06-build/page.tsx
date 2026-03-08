'use client'

import StepPageContent from '../components/StepPageContent'

export default function BuildPage() {
  return (
    <StepPageContent step={6} title="Build">
      <p className="text-gray-600">Build phase. Use the build panel to add your artifact.</p>
    </StepPageContent>
  )
}
