import { useState, useRef, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getPreEntryTestSets } from '../services/testService'
import type { PreEntryTestCode } from '../types/preEntryTestCode'
import type { PreEntryPracticeRequest } from '../types/preEntryPractice'

function matchInput(item: PreEntryTestCode, input: string): boolean {
  const q = input.trim().toLowerCase()
  if (!q) return false
  return (
    item.cttsCode.toLowerCase() === q ||
    item.cttsSynonym.toLowerCase() === q ||
    item.cttsCode.toLowerCase().includes(q) ||
    item.cttsSynonym.toLowerCase().includes(q)
  )
}

function formatElapsed(ms: number): string {
  const sec = Math.floor(ms / 1000)
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export function PreEntryPractice() {
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set())
  const [input, setInput] = useState('')
  const [setIndex, setSetIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  const { data: sets = [], isLoading, isError, error } = useQuery({
    queryKey: ['preEntryTestSets'],
    queryFn: getPreEntryTestSets,
  })

  const currentRequest: PreEntryPracticeRequest | undefined = sets[setIndex]
  const currentTests = currentRequest?.tests ?? []
  const currentCompleted = currentTests.filter((item) =>
    completedIds.has(`${item.cttsCode}-${item.cttsSynonym}`)
  )
  const allCurrentDone = currentTests.length > 0 && currentCompleted.length === currentTests.length
  const allSetsDone = sets.length > 0 && setIndex >= sets.length - 1 && allCurrentDone

  useEffect(() => {
    if (allCurrentDone && setIndex < sets.length - 1) {
      setSetIndex((i) => i + 1)
      setCompletedIds(new Set())
    }
  }, [allCurrentDone, setIndex, sets.length])

  useEffect(() => {
    if (allSetsDone && startTime != null && endTime == null) {
      setEndTime(Date.now())
    }
  }, [allSetsDone, startTime, endTime])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Tab') return
    e.preventDefault()
    const q = input.trim()
    if (!q || currentTests.length === 0) return
    const matched = currentTests.find(
      (item) =>
        !completedIds.has(`${item.cttsCode}-${item.cttsSynonym}`) && matchInput(item, q)
    )
    if (matched) {
      if (startTime == null) setStartTime(Date.now())
      setCompletedIds((prev) =>
        new Set(prev).add(`${matched.cttsCode}-${matched.cttsSynonym}`)
      )
      setInput('')
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-slate-500">
        Loading practice sets…
      </div>
    )
  }

  if (isError) {
    return (
      <div className="mx-auto max-w-2xl rounded-lg bg-red-50 p-4 text-red-700">
        Error: {error instanceof Error ? error.message : 'Failed to load sets'}
      </div>
    )
  }

  if (sets.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-8 text-center text-slate-500">
        No practice sets available.
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-6">
      <h1 className="text-2xl font-semibold text-slate-800">Pre Entry Practice</h1>

      {/* Progress */}
      <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
        <span>
          Request {setIndex + 1} of {sets.length}
        </span>
        {startTime != null && (
          <span>
            Time: {endTime != null ? formatElapsed(endTime - startTime) : formatElapsed(Date.now() - startTime)}
          </span>
        )}
        {allSetsDone && endTime != null && (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 font-medium text-emerald-800">
            Completed in {formatElapsed(endTime - startTime!)}
          </span>
        )}
      </div>

      {/* Current request header */}
      {currentRequest && (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm" aria-label="Request details">
          <p className="font-mono text-xs text-slate-500">{currentRequest.requestId}</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-800">{currentRequest.requestName}</h2>
          <p className="mt-0.5 text-sm text-slate-600">{currentRequest.requestType}</p>
          {currentRequest.clinicalNotes && (
            <p className="mt-2 text-sm italic text-slate-500">{currentRequest.clinicalNotes}</p>
          )}
        </section>
      )}

      {/* Current set list */}
      <section aria-label="Tests to complete">
        <p className="mb-2 text-sm font-medium text-slate-600">
          Type code or synonym and press Tab to mark as done.
        </p>
        <ul className="space-y-1.5 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          {currentTests.map((item) => {
            const id = `${item.cttsCode}-${item.cttsSynonym}`
            const done = completedIds.has(id)
            return (
              <li
                key={id}
                className={`flex flex-wrap items-center gap-x-3 gap-y-1 rounded px-2 py-1.5 text-sm ${
                  done ? 'bg-emerald-50 text-emerald-800 line-through' : 'text-slate-700'
                }`}
              >
                <span className="font-mono font-medium">{item.cttsCode}</span>
                <span>{item.cttsName}</span>
                {item.cttsSynonym && (
                  <span className="text-slate-500">({item.cttsSynonym})</span>
                )}
                {done && (
                  <span className="ml-auto text-emerald-600" aria-hidden>
                    ✓
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      {/* Input */}
      {!allSetsDone && (
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <label htmlFor="practice-input" className="mb-2 block text-sm font-medium text-slate-700">
            Code or synonym
          </label>
          <input
            ref={inputRef}
            id="practice-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. ACTH or 17OH — then press Tab"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
            autoComplete="off"
            autoFocus
          />
          <p className="mt-1.5 text-xs text-slate-500">
            Press Tab to mark as done and clear for next entry.
          </p>
        </section>
      )}

      {allSetsDone && (
        <div
          className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-center text-emerald-800"
          role="status"
        >
          <p className="font-medium">All sets completed.</p>
          <p className="mt-1 text-sm">
            Total time: {startTime != null && endTime != null ? formatElapsed(endTime - startTime) : '—'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSetIndex(0)
              setCompletedIds(new Set())
              setStartTime(null)
              setEndTime(null)
              setInput('')
              inputRef.current?.focus()
            }}
            className="mt-3 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
          >
            Start over
          </button>
        </div>
      )}
    </div>
  )
}
