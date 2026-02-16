import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getPreEntryTestCodes } from "../services/testService";
import type { PreEntryTestCode } from "../types/preEntryTestCode";

function matchSearch(item: PreEntryTestCode, q: string): boolean {
  if (!q.trim()) return true;
  const lower = q.toLowerCase();
  return (
    item.code.toLowerCase().includes(lower) ||
    item.name.toLowerCase().includes(lower) ||
    item.depName.toLowerCase().includes(lower) ||
    item.synonym.toLowerCase().includes(lower)
  );
}

export function PreEntryTestList() {
  const [search, setSearch] = useState("");

  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["preEntryTestCodes"],
    queryFn: getPreEntryTestCodes,
  });

  const filtered = useMemo(
    () => items.filter((item) => matchSearch(item, search)),
    [items, search],
  );

  if (isLoading) {
    return (
      <div className="flex min-h-[200px] items-center justify-center text-slate-500">
        Loading test codes…
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-700">
        Error: {error instanceof Error ? error.message : "Failed to load"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4 px-4 py-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        Pre-entry test codes
      </h1>
      <input
        type="search"
        placeholder="Search by code, name, department, or synonym…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 shadow-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        aria-label="Search test codes"
      />
      <p className="text-sm text-slate-500">
        Showing {filtered.length} of {items.length} tests
      </p>
      <ul className="divide-y divide-slate-200 rounded-lg border border-slate-200 bg-white shadow-sm">
        {filtered.map((item) => (
          <li
            key={`${item.code}-${item.synonym}`}
            className="flex flex-wrap items-center gap-x-4 gap-y-1 px-4 py-3 text-slate-700 hover:bg-slate-50"
          >
            <span className="font-mono text-sm font-medium text-sky-600">
              {item.code}
            </span>
            <span className="font-medium">{item.name}</span>
            <span className="text-slate-500">{item.depName}</span>
            {item.synonym && (
              <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-600">
                {item.synonym}
              </span>
            )}
          </li>
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="py-8 text-center text-slate-500">
          No tests match your search.
        </p>
      )}
    </div>
  );
}
