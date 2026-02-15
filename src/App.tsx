import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { PreEntryTestList } from "./pages/PreEntryTestList";
import { PreEntryPractice } from "./pages/PreEntryPractice";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-100">
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<PreEntryTestList />} />
            <Route path="/pre-entry-practice" element={<PreEntryPractice />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
