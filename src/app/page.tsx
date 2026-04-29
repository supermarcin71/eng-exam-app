export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center min-h-screen px-6">
      <div className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-accent-bright mb-4">
          Eng Exam App
        </p>
        <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
          Read aloud,{" "}
          <span className="gradient-text-animated">speak with confidence.</span>
        </h1>
        <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
          Interactive practice space coming online. Components booting up…
        </p>
      </div>
    </main>
  );
}
