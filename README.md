# LabTrak

A lab test management app for browsing pre-entry test codes and practicing test entry workflows. [Live](https://labtrak.netlify.app/)

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Tailwind CSS** (styling)
- **React Router** (routing)
- **TanStack Query** (data fetching & caching)

## Features

### Pre-entry Test Codes (`/`)

- Searchable list of lab test codes
- Search by code, name, department, or synonym
- Data loaded from `pre-entry-test-code.json` (replace with API when ready)

### Pre Entry Practice (`/pre-entry-practice`)

- Practice entering test codes from simulated lab requests
- Each request shows: request ID, name, type, clinical notes, and a list of tests
- Type a test **code** or **synonym** and press **Tab** to mark it done
- When all tests in a request are complete, the next request loads
- Tracks total completion time
- **Show/Hide** button to toggle visibility of codes and synonyms (hidden by default for practice)

### Layout

- **Sidebar** navigation (collapsible on desktop, closed by default on mobile)
- Responsive design with mobile menu toggle

## Project Structure

```
src/
├── components/
│   ├── Layout.tsx      # App layout with sidebar + outlet
│   └── Sidebar.tsx     # Collapsible sidebar navigation
├── pages/
│   ├── PreEntryTestList.tsx   # Test codes list with search
│   └── PreEntryPractice.tsx   # Practice mode
├── services/
│   └── testService.ts  # Data fetching (replace with API)
├── types/
│   ├── preEntryTestCode.ts
│   └── preEntryPractice.ts
├── data/
│   ├── pre-entry-test-code.json
│   └── pre-entry-practice.json
├── App.tsx
└── main.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Data Sources

- **Pre-entry test codes**: `public/pre-entry-test-code.json` (or configure `PRE_ENTRY_TEST_CODES_URL` in `testService.ts`)
- **Practice requests**: `src/data/pre-entry-practice.json` (replace with API when ready)

Practice data format: array of `PreEntryPracticeRequest` objects with `requestId`, `requestName`, `requestType`, `clinicalNotes`, and `tests` (array of `PreEntryTestCode`).
