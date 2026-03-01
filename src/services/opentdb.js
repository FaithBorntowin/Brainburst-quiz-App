export function decodeHtml(str = "") {
  const txt = document.createElement("textarea");
  txt.innerHTML = str;
  return txt.value;
}

export function shuffleArray(arr = []) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

export async function fetchRandomQuestions({ signal } = {}) {
  // random 20 questions, multiple choice
  const url = "https://opentdb.com/api.php?amount=20&type=multiple";
  const res = await fetch(url, { signal });

  if (!res.ok) throw new Error("Failed to fetch questions.");

  const data = await res.json();

  if (data.response_code !== 0) {
    throw new Error("No questions found. Please try again.");
  }

  return data.results.map((q, idx) => {
    const question = decodeHtml(q.question);
    const correct = decodeHtml(q.correct_answer);
    const incorrect = q.incorrect_answers.map(decodeHtml);
    const options = shuffleArray([correct, ...incorrect]);

    return {
      id: idx + 1,
      question,
      options,
      correct,
    };
  });
}
