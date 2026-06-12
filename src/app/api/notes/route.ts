import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoDB";
import Notes from "@/models/Notes";


export async function GET(){
    try{
        await dbConnect();
        const notes = await Notes.find().sort({createdAt: -1});
        return NextResponse.json(notes, {status: 200});
    } catch{
        return NextResponse.json(
            {error: "Failed to fetch notes"},
            {status: 500},
        );
    }
}

export async function POST(request: NextRequest){
    try{
        await dbConnect();
        const body: {
            title: string;
            content: string;
        } = await request.json();
        const {title, content} =body;

        if(!title?.trim() || !content?.trim()){
            return NextResponse.json(
                {error: "Both title and content are required"},
                {status: 400},
            );
        }
        const note = await Notes.create({
            title,
            content,
        });
        return NextResponse.json(note, {status: 201});
    } catch{
        return NextResponse.json(
            
            {error: "Failed to create note"},
            {status: 500},
        )
    }
}