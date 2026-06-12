import mongoose,{Schema, Model} from "mongoose";

export interface INote{
    title : string,
    content : string,
    createdAt : Date,
    updatedAt : Date,
}

const NotesSchema = new Schema<INote>(
    {
        title : {
            type : String,
            required : true,
            trim : true,
        },
        content : {
            type : String,
            required : true,
            trim : true,
        },

    },{
        timestamps : true,
    }
);

const Notes: Model<INote> = mongoose.models.Notes || mongoose.model<INote>("Notes", NotesSchema);

export default Notes;
