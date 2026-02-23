import { useState } from "react";
import QuestionCard from "../components/QuestionCard";

const DUMMY_QUESTIONS = [
  {
    id: 1,
    question:
      "Which HTTP method is most appropriate for updating an existing resource in a RESTful API?",
    options: ["GET", "POST", "PUT", "DELETE"],
  },
  {
    id: 2,
    question: "Which library is commonly used for routing in React?",
    options: ["React Router", "Axios", "Redux", "Formik"],
  },
];

export default function Quiz() {
  const total = DUMMY_QUESTIONS.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // { [id]: option }

  const currentQuestion = DUMMY_QUESTIONS[currentIndex];
  const selectedOption = answers[currentQuestion.id] || "";

  const handleSelect = (opt) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: opt }));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    if (!selectedOption) return;

    const isLast = currentIndex === total - 1;
    if (isLast) {
      alert("Finish clicked — Results page is next.");
      return;
    }
    setCurrentIndex((prev) => Math.min(total - 1, prev + 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <QuestionCard
        index={currentIndex}
        total={total}
        question={currentQuestion.question}
        options={currentQuestion.options}
        selectedOption={selectedOption}
        onSelect={handleSelect}
        onPrev={handlePrev}
        onNext={handleNext}
        isFirst={currentIndex === 0}
        isLast={currentIndex === total - 1}
      />
    </div>
    
  );
}
