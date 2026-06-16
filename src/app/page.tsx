import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 bg-linear-to-b from-gray-50 to-gray-100 text-gray-900 antialiased">

  <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
    Notes App
  </h1>

  <p className="text-lg md:text-xl text-gray-500 mb-10 text-center max-w-md font-medium leading-relaxed">
    Organize your ideas, tasks, and important notes.
  </p>

  <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
    <Link
      href="/notes"
      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/20 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
    >
      View Notes
    </Link>

    <Link
      href="/notes/create"
      className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-700 font-semibold px-6 py-3.5 border border-gray-200 rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
    >
      Create Note
    </Link>
  </div>
</main>
  );
}