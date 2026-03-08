import { StepProvider } from '@/app/context/StepContext'
import RbLayoutClient from './components/RbLayoutClient'

export default function RbLayout({ children }: { children: React.ReactNode }) {
  return (
    <StepProvider>
      <RbLayoutClient>{children}</RbLayoutClient>
    </StepProvider>
  )
}
