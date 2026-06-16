'use client'

import { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"
interface Note{
    _id: string,
    title: string,
    content: string,
}

export default function NotesPage(){
    const[notes,setNotes] = useState<Note[]>([]);

    useEffect(()=>{
        const fetchNotes = async () =>{
            try{
                const response = await axios.get("/api/notes");
                console.log("Response:", response.data);

                setNotes(response.data);
            } catch(error){
                console.log(error);
            }
        };
        fetchNotes();
    },[]);
const deleteNote = async (id: string) => {
    try {
        await axios.delete(`/api/notes/${id}`);

        setNotes((prev) =>
            prev.filter((note) => note._id !== id)
        );
    } catch (error) {
        console.error(error);
    }
};
    return(
<div className="max-w-5xl mx-auto p-6 min-h-screen text-gray-900 antialiased">
  <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-5">
    <div>
      <h1 className="text-3xl font-extrabold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
        My Notes
      </h1>
      <p className="text-sm text-gray-500 mt-1">Manage and organize your thoughts</p>
    </div>

    <Link
      href="/notes/create"
      className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium px-4 py-2.5 rounded-xl shadow-sm shadow-emerald-600/10 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ml-8"
    >
      <span className="text-lg font-light">+</span> Create Note
    </Link>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
    {notes.map((note) => (
      <div
        key={note._id}
        className="flex flex-col justify-between bg-white border border-gray-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-gray-300/80 transition-all duration-200 group"
      >
        <div>
          <h2 className="text-xl font-bold text-gray-800 line-clamp-1 group-hover:text-emerald-700 transition-colors">
            {note.title}
          </h2>
          <p className="mt-2.5 text-gray-600 text-sm leading-relaxed line-clamp-3">
            {note.content}
          </p>
        </div>
        <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-50">
          <Link 
            href={`/notes/${note._id}/edit`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
          >
            Edit
          </Link>
          
          <button 
            onClick={() => deleteNote(note._id)}
            className="text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
);
}

