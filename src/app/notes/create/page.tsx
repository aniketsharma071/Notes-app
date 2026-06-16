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
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-3xl font-bold mb-6">Create Note</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        <div>
          <label className="block mb-2 font-medium">
            Title
          </label>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter note title"
            className="w-full border rounded-md p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Content
          </label>

          <textarea
            rows={8}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
            className="w-full border rounded-md p-3"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
        >
          Save Note
        </button>
      </form>
    </div>
   )
}
