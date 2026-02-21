import type { PreEntryTestCode } from "../types/preEntryTestCode";
import type { PreEntryPracticeRequest } from "../types/preEntryPractice";

const PRE_ENTRY_TEST_CODES_URL = "/pre-entry-test-code.json";
const PRE_ENTRY_PRACTICE = "/src/data/pre-entry-practice.json";

/**
 * Fetches pre-entry test codes. Replace PRE_ENTRY_TEST_CODES_URL with real API.
 */
export async function getPreEntryTestCodes(): Promise<PreEntryTestCode[]> {
  const res = await fetch(PRE_ENTRY_TEST_CODES_URL);
  if (!res.ok) throw new Error("Failed to fetch pre-entry test codes");
  return res.json();
}

/**
 * Fetches pre-entry practice data set. Replace with real API call when it's ready.
 */
export async function getPreEntryTestSets(): Promise<
  PreEntryPracticeRequest[]
> {
  const res = await fetch(PRE_ENTRY_PRACTICE);
  if (!res.ok) throw new Error("Failed ro fetch practice test sets");
  return res.json();
}
