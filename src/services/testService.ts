import type { PreEntryTestCode } from '../types/preEntryTestCode'

const PRE_ENTRY_TEST_CODES_URL = '/pre-entry-test-code.json'

/** Size of each practice set when using static chunking. Replace with API when ready. */
const PRACTICE_SET_SIZE = 6

/**
 * Fetches pre-entry test codes. Replace PRE_ENTRY_TEST_CODES_URL with your real API endpoint when ready.
 */
export async function getPreEntryTestCodes(): Promise<PreEntryTestCode[]> {
  const res = await fetch(PRE_ENTRY_TEST_CODES_URL)
  if (!res.ok) throw new Error('Failed to fetch pre-entry test codes')
  return res.json()
}

/**
 * Fetches an array of test set arrays for Pre Entry Practice.
 * Uses static chunking of the same data for now; replace with real API later.
 */
export async function getPreEntryTestSets(): Promise<PreEntryTestCode[][]> {
  const all = await getPreEntryTestCodes()
  const sets: PreEntryTestCode[][] = []
  for (let i = 0; i < all.length; i += PRACTICE_SET_SIZE) {
    sets.push(all.slice(i, i + PRACTICE_SET_SIZE))
  }
  return sets
}
