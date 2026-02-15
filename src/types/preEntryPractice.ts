import type { PreEntryTestCode } from './preEntryTestCode'

export interface PreEntryPracticeRequest {
  requestId: string
  requestName: string
  requestType: string
  clinicalNotes: string
  tests: PreEntryTestCode[]
}
