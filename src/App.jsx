import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Setup from "./pages/Setup";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/quiz" element={<Quiz />} />
      <Route path="/results" element={<Results />} />
     
     
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
