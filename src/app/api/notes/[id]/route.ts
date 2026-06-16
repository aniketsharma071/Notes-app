import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDB";
import Notes from "@/models/Notes";

interface Params {
    params : Promise<{
        id : string;
    }>;
}

export async function GET(request : NextRequest, {params} : Params){
    try{
        await dbConnect();
        const {id} = await params;
        const note = await Notes.findById(id);
        if(!note){
            return NextResponse.json(
                {error : "Note not found"},
                {status : 404},
            );
        }
        return NextResponse.json(note, {status : 200});
    } catch(error){
         console.error(error);

    return NextResponse.json(
      { error: "Failed to fetch note" },
      { status: 500 }
    );
    }
}

export async function PUT(request : NextRequest, {params} : Params){
    try{
        await dbConnect();
        const {id} = await params;
        const body = await request.json();
        const {title, content} = body;
        if (!title?.trim() || !content?.trim()) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }
    const updateNote = await Notes.findByIdAndUpdate(
        id,
        {
            title, content
        },
        {
            new : true
        },
    );
     if (!updateNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updateNote, {status : 200});
    } catch(error){
         console.error(error);

    return NextResponse.json(
      { error: "Failed to update note" },
      { status: 500 }
    );
    }
}

export async function DELETE(
  request: NextRequest,
  { params }: Params
) {
  try {
    await dbConnect();

    const { id } = await params;

    const deletedNote = await Notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return NextResponse.json(
        { error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Note deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to delete note" },
      { status: 500 }
    );
  }
}