"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CreateNotePage() {
  const router = useRouter();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    if (!title.trim() || !content.trim()) {
      setError("Both title and content are required.");
      return;
    }
    try {
      await axios.post("/api/notes", {
        title,
        content,
      });

      router.push("/notes");
    } catch (error) {
      console.error(error);
      alert("Failed to create note.");
    }
  };
   return (
<div className="max-w-xl mx-auto mt-12 p-8 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/50 text-gray-900 antialiased">
  <div className="mb-8">
    <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
      Create New Note
    </h1>
    <p className="text-sm text-gray-500 mt-1">Capture your thoughts and keep them organized.</p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    {error && (
      <div className="flex items-center gap-2 text-sm font-medium text-red-600 bg-red-50 border border-red-100 p-3.5 rounded-xl animate-fade-in">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        {error}
      </div>
    )}
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Title
      </label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Give your note a title..."
        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all duration-200"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Content
      </label>
      <textarea
        rows={8}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your thoughts here..."
        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all duration-200 resize-y min-h-37.5"
      />
    </div>

    <div className="pt-2">
      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-600/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        Save Note
      </button>
    </div>
  </form>
</div>
);
}
