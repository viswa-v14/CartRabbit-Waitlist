const mongoose=require("mongoose");

const url="mongodb+srv://viswav20cse:viswav20cse@cluster0.nstaymg.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url);

const conn=mongoose.connection;

conn.on("open",()=>{
    console.log("database connected");
})