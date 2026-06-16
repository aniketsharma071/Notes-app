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

    return(
       <div className="max-w-4xl mx-auto p-6">
  <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">My Notes</h1>

  <Link
    href="/notes/create"
    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
  >
    + Create Note
  </Link>
</div>

  {notes.map((note) => (
    <div
      key={note._id}
      className="border rounded-lg p-4 mb-4"
    >
      <h2 className="text-xl font-semibold">
        {note.title}
      </h2>

      <p className="mt-2">
        {note.content}
      </p>
    </div>
  ))}
</div>
    );

}

