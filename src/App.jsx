import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./Pages/landing";
import Setup from "./Pages/setup";
import Quiz from "./Pages/Quiz";
import Results from "./Pages/Results";


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
