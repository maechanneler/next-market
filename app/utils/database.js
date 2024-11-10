// app/utils/database.js

import mongoose from "mongoose"

const connectDB = async() => {
  try{
    await mongoose.connect("mongodb+srv://maechanneler:UvKybqe7hgDULlAN@cluster0.lt85s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log("Success: Connected to MongoDB")
  }catch(err){
    console.log("Failure: Unconnected to MongoDB")
    throw new Error()
  }
}

export default connectDB