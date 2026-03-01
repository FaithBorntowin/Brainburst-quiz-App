import { useNavigate } from "react-router-dom";

export default function Setup() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-xl p-6 rounded-2xl shadow text-center">
        <h1 className="text-2xl font-bold">Quiz Setup</h1>
        <p className="mt-2 text-gray-600">Ready? Start your quiz now.</p>

        <button
          onClick={() => navigate("/quiz")}
          className="mt-6 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}
