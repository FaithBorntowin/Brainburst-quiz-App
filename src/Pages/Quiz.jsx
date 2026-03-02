import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { fetchRandomQuestions } from "../services/opentdb";

export default function Quiz() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError("");

        const qs = await fetchRandomQuestions({ signal: controller.signal });

        setQuestions(qs);
        setCurrentIndex(0);
        setAnswers({});
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Something went wrong.");
        }
      } finally {
        setLoading(false);
      }
    }

    load();
    return () => controller.abort();
  }, []);

  // ===============================
  // Loading State
  // ===============================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 font-semibold">Loading questions...</p>
      </div>
    );
  }

  // ===============================
  // Error State
  // ===============================
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="bg-white p-6 rounded-2xl shadow w-full max-w-lg text-center">
          <p className="font-semibold text-red-600">Error</p>
          <p className="mt-2 text-gray-700">{error}</p>

          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => navigate("/setup")}
              className="border px-6 py-3 rounded-xl"
            >
              Back
            </button>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-6 py-3 rounded-xl"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===============================
  // No Questions Safety Guard
  // ===============================
  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-700 font-semibold">
          No questions available. Please try again.
        </p>
      </div>
    );
  }

  const total = questions.length;

  // Extra safety: ensure index is valid
  const safeIndex =
    currentIndex >= 0 && currentIndex < total ? currentIndex : 0;

  const currentQuestion = questions[safeIndex];

  const selectedOption =
    currentQuestion && answers[currentQuestion.id]
      ? answers[currentQuestion.id]
      : "";

  const handleSelect = (opt) => {
    if (!currentQuestion) return;

    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: opt,
    }));
  };

  const handlePrev = () =>
    setCurrentIndex((i) => Math.max(0, i - 1));

  const handleNext = () => {
    if (!currentQuestion || !selectedOption) return;

    const isLast = safeIndex === total - 1;

    if (isLast) {
      navigate("/results", { state: { questions, answers } });
      return;
    }

    setCurrentIndex((i) => Math.min(total - 1, i + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <QuestionCard
        index={safeIndex}
        total={total}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        onPrev={handlePrev}
        onNext={handleNext}
        isFirst={safeIndex === 0}
        isLast={safeIndex === total - 1}
      />
    </div>
  );
}