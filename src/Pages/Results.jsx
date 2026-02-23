import { useLocation, useNavigate } from "react-router-dom";

const PASS_PERCENTAGE = 60;

export default function Results() {
  const navigate = useNavigate();
  const { state } = useLocation();

  if (!state?.questions || !state?.answers) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <button
          onClick={() => navigate("/setup")}
          className="bg-purple-600 text-white px-6 py-3 rounded-lg"
        >
          Go to Setup
        </button>
      </div>
    );
  }

  const { questions, answers } = state;

  const correctCount = questions.reduce((acc, q) => {
    return answers[q.id] === q.correct ? acc + 1 : acc;
  }, 0);

  const total = questions.length;
  const percentage = Math.round((correctCount / total) * 100);

  const passed = percentage >= PASS_PERCENTAGE;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow p-8 text-center">
        {/* Title */}
        <h1 className="text-lg font-bold text-purple-700">
          {passed ? "Congratulations" : "Try again"}
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-gray-600">
          {passed
            ? "You have passed the quiz."
            : "You did not meet the pass score for the quiz."}
        </p>

        {/* Icon Box */}
        <div className="mt-6 flex justify-center">
          <div className="w-20 h-20 rounded-xl bg-purple-100 flex items-center justify-center text-3xl">
            {passed ? "✔️" : "↻"}
          </div>
        </div>

        {/* Score */}
        <p className="mt-4 text-sm text-gray-700">
          You've scored {percentage}%.
        </p>

        {/* Button */}
        <button
          onClick={() =>
            passed
              ? navigate("/setup")
              : navigate("/quiz", { state })
          }
          className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {passed ? "Start Quiz" : "Try again"}
        </button>
      </div>
    </div>
  );
}
