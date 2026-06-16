"use client";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditNotePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  useEffect(()=>{
    const fetchNote = async() =>{
        try{
            const response = await axios.get(`/api/notes/${id}`);
            setTitle(response.data.title);
            setContent(response.data.content);

        } catch(error){
            console.log(error);
        }
    };
    if(id){
        fetchNote();
    }
  },[id]);
  const handleSubmit = async(e : React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
     if (!title.trim() || !content.trim()) {
      alert("Title and content are required.");
      return;
    }
    try{
        await axios.put(`/api/notes/${id}`,{
            title,
            content,
        });
        router.push("/notes");
    } catch(error){

      console.error(error);
    }
  };

  return (
<div className="max-w-xl mx-auto mt-12 p-8 bg-white border border-gray-100 rounded-2xl shadow-xl shadow-gray-100/50 text-gray-900 antialiased">
  <div className="mb-8">
    <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
      Edit Note
    </h1>
    <p className="text-sm text-gray-500 mt-1">Make your changes and keep your information up to date.</p>
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Title
      </label>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all duration-200"
      />
    </div>

    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Content
      </label>
      <textarea
        rows={8}
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-3.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 focus:bg-white transition-all duration-200 resize-y min-h-37.5"
      />
    </div>

    <div className="pt-2">
      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-600/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
      >
        Update Note
      </button>
    </div>
  </form>
</div>
  );
}
