'use client'

import StepPageContent from '../components/StepPageContent'

export default function TestPage() {
  return (
    <StepPageContent step={7} title="Test">
      <p className="text-gray-600">Testing phase. Use the build panel to add your artifact.</p>
    </StepPageContent>
  )
}
