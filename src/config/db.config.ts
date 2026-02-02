import mongoose from "mongoose";

const connectDB = async () => { 
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("Mongo connected")
}

export default connectDB;