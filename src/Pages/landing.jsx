import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="w-full max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-black">
          Test your knowledge
        </h1>

        <p className="mt-3 text-sm md:text-base text-black/70">
          A fun way to measure what you know
        </p>

        <button
          onClick={() => navigate("/setup")}
          className="mt-8 w-64 max-w-full h-11 rounded-md bg-purple-700 text-white font-medium hover:bg-purple-800 active:scale-[0.99] transition"
        >
          Start
        </button>
      </section>
    </main>
  );
}
