import { useNavigate } from "react-router-dom";

export default function Setup() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Quiz Setup</h1>

      <button
        onClick={() => navigate("/quiz")}
        className="bg-purple-600 text-white px-6 py-3 rounded-xl"
      >
        Start Quiz
      </button>
    </div>
  );
}
