import mongoose from "mongoose";
import { MONGO_URI } from "../config/config.js";

export async function dbConnect(){
    if(!MONGO_URI){
        throw new Error("MONGO_URI is not defined in environment variables")
    }

    await mongoose.connect(MONGO_URI)
}
