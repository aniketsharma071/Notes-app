import mongoose from "mongoose";
import dns from "dns"

dns.setServers([
    "1.1.1.1",
    "8.8.8.8"
])
const MONGO_URI =process.env.MONGODB_URI;

if(!MONGO_URI){
    throw new Error ("Please Enter MONGO_URI");
}


declare global{
    var mongooseCache : {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null; 
    };
}

let cached = global.mongooseCache ;

if(!cached){
    cached = global.mongooseCache ={conn: null, promise: null,}
}
console.log("🔄 Connecting to MongoDB...");
async function dbConnect() {
    if(cached.conn){
        console.log("♻️ Using cached MongoDB connection");
        return cached.conn;
    }
    if(!cached.promise){
        const opts = {
            bufferCommands : false,
        }
        cached.promise= mongoose.connect(MONGO_URI!, opts).then((mongooseInstance)=>{
            return mongooseInstance;
        });
    }
    try{
        cached.conn = await cached.promise;
            console.log("✅ MongoDB Connected");

    } catch(e){
        cached.promise =null;
        console.log("Full error");
        console.dir(e, { depth: null });

        throw(e);
    }
    return cached.conn;
}

export default dbConnect;