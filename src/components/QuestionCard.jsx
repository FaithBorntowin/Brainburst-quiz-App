export default function QuestionCard({
  index,
  total,
  question,
  options,
  selectedOption,
  onSelect,
  onPrev,
  onNext,
  isFirst,
  isLast,
}) {
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-6 sm:p-8">
      <p className="text-center text-sm font-medium text-purple-600">
        Question {index + 1} of {total}
      </p>

      <h2 className="mt-3 text-center text-lg sm:text-xl font-semibold text-gray-900">
        {question}
      </h2>

      <div className="mt-6 space-y-3">
        {options.map((opt, i) => {
          const letter = String.fromCharCode(65 + i); // A, B, C, D
          const isSelected = selectedOption === opt;

          return (
            <button
              key={opt}
              type="button"
              onClick={() => onSelect(opt)}
              className={[
                "w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                isSelected
                  ? "border-purple-600 ring-2 ring-purple-100"
                  : "border-gray-200 hover:border-purple-100 hover:border-purple-400  hover:shadow-sm",
              ].join(" ")}
            >
              <span
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold",
                  isSelected ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700",
                ].join(" ")}
              >
                {letter}
              </span>

              <span className="text-sm sm:text-base text-gray-800">{opt}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={isFirst}
          className={[
            "w-full sm:w-auto px-5 py-3 rounded-xl text-sm font-semibold border transition",
            isFirst
              ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
              : "bg-white text-gray-700 border-gray-200 hover:border-purple-300",
          ].join(" ")}
        >
          Previous Question
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={!selectedOption}
          className={[
            "w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-white transition",
            !selectedOption
              ? "bg-purple-300 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700",
          ].join(" ")}
        >
          {isLast ? "Finish Quiz" : "Next Question"}
        </button>
      </div>
    </div>
  );
}
