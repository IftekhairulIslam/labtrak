import type { PreEntryTestCode } from '../types/preEntryTestCode'
import type { PreEntryPracticeRequest } from '../types/preEntryPractice'
import practiceData from '../data/pre-entry-practice.json'

const PRE_ENTRY_TEST_CODES_URL = '/pre-entry-test-code.json'

/**
 * Fetches pre-entry test codes. Replace PRE_ENTRY_TEST_CODES_URL with your real API endpoint when ready.
 */
export async function getPreEntryTestCodes(): Promise<PreEntryTestCode[]> {
  const res = await fetch(PRE_ENTRY_TEST_CODES_URL)
  if (!res.ok) throw new Error('Failed to fetch pre-entry test codes')
  return res.json()
}

/**
 * Fetches practice requests for Pre Entry Practice from src/data/pre-entry-practice.json.
 * Replace with API call when ready.
 */
export async function getPreEntryTestSets(): Promise<PreEntryPracticeRequest[]> {
  return Promise.resolve(practiceData as PreEntryPracticeRequest[])
}
