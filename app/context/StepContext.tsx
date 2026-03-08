'use client'

import React, { createContext, useContext, useCallback, useMemo, useState, useEffect } from 'react'

const STORAGE_PREFIX = 'rb_step_'
const STORAGE_SUFFIX = '_artifact'
const STEPS = [1, 2, 3, 4, 5, 6, 7, 8] as const
export type StepNum = (typeof STEPS)[number]

export type StepStatus = 'pending' | 'complete'

interface StepState {
  status: StepStatus
  artifact: string
}

function getStorageKey(step: StepNum) {
  return `${STORAGE_PREFIX}${step}${STORAGE_SUFFIX}`
}

function loadStepState(step: StepNum): StepState {
  if (typeof window === 'undefined') return { status: 'pending', artifact: '' }
  const raw = localStorage.getItem(getStorageKey(step))
  if (!raw) return { status: 'pending', artifact: '' }
  try {
    const data = JSON.parse(raw)
    return {
      status: (data.artifact && String(data.artifact).trim() ? 'complete' : 'pending') as StepStatus,
      artifact: String(data.artifact || ''),
    }
  } catch {
    return { status: 'pending', artifact: '' }
  }
}

function saveStepArtifact(step: StepNum, artifact: string) {
  if (typeof window === 'undefined') return
  localStorage.setItem(getStorageKey(step), JSON.stringify({ artifact }))
  window.dispatchEvent(new Event('storage'))
}

type StepContextValue = {
  steps: Record<StepNum, StepState>
  setArtifact: (step: StepNum, artifact: string) => void
  isStepUnlocked: (step: StepNum) => boolean
  getNextStep: (current: StepNum) => StepNum | null
  getPrevStep: (current: StepNum) => StepNum | null
}

const StepContext = createContext<StepContextValue | null>(null)

export function StepProvider({ children }: { children: React.ReactNode }) {
  const [steps, setSteps] = useState<Record<StepNum, StepState>>(() =>
    STEPS.reduce((acc, s) => ({ ...acc, [s]: loadStepState(s) }), {} as Record<StepNum, StepState>)
  )

  const syncFromStorage = useCallback(() => {
    setSteps((prev) =>
      STEPS.reduce(
        (acc, s) => ({ ...acc, [s]: loadStepState(s) }),
        {} as Record<StepNum, StepState>
      )
    )
  }, [])

  useEffect(() => {
    syncFromStorage()
    window.addEventListener('storage', syncFromStorage)
    return () => window.removeEventListener('storage', syncFromStorage)
  }, [syncFromStorage])

  const setArtifact = useCallback((step: StepNum, artifact: string) => {
    saveStepArtifact(step, artifact)
    setSteps((prev) => ({
      ...prev,
      [step]: {
        status: artifact.trim() ? 'complete' : 'pending',
        artifact,
      },
    }))
  }, [])

  const isStepUnlocked = useCallback(
    (step: StepNum) => {
      if (step === 1) return true
      for (let i = 1; i < step; i++) {
        const s = (steps as Record<StepNum, StepState>)[i as StepNum]
        if (!s || s.status !== 'complete') return false
      }
      return true
    },
    [steps]
  )

  const getNextStep = useCallback((current: StepNum): StepNum | null => {
    const idx = STEPS.indexOf(current)
    if (idx < 0 || idx >= STEPS.length - 1) return null
    return STEPS[idx + 1]
  }, [])

  const getPrevStep = useCallback((current: StepNum): StepNum | null => {
    const idx = STEPS.indexOf(current)
    if (idx <= 0) return null
    return STEPS[idx - 1]
  }, [])

  const value = useMemo<StepContextValue>(
    () => ({ steps, setArtifact, isStepUnlocked, getNextStep, getPrevStep }),
    [steps, setArtifact, isStepUnlocked, getNextStep, getPrevStep]
  )

  return <StepContext.Provider value={value}>{children}</StepContext.Provider>
}

export function useSteps() {
  const ctx = useContext(StepContext)
  if (!ctx) throw new Error('useSteps must be used within StepProvider')
  return ctx
}
