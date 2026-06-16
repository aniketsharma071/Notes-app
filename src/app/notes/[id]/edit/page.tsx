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
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">
        Edit Note
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-3"
        />

        <textarea
          rows={8}
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          Update Note
        </button>
      </form>
    </div>
  );
}
