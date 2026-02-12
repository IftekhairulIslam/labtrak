import type { PreEntryTestCode } from '../types/preEntryTestCode'

const PRE_ENTRY_TEST_CODES_URL = '/pre-entry-test-code.json'

/**
 * Fetches pre-entry test codes. Replace PRE_ENTRY_TEST_CODES_URL with your real API endpoint when ready.
 */
export async function getPreEntryTestCodes(): Promise<PreEntryTestCode[]> {
  const res = await fetch(PRE_ENTRY_TEST_CODES_URL)
  if (!res.ok) throw new Error('Failed to fetch pre-entry test codes')
  return res.json()
}
