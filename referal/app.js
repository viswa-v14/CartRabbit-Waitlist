const express=require("express");
const app=express();
require("./database/db");
const cors=require("cors")

const admin=require("./route/admin")
const user=require("./route/users")
app.use(express.json())

app.use(
    cors({
     // origin: "https://tubular-pixie-28fcd4.netlify.app",
       origin:"*",
      credentials: true,
    })
  );


app.use("/admin",admin);
app.use("/user",user);

// app.get("/",(req,res)=>{
//     res.send("hello")
// })

app.listen(3005,()=>{
    console.log("server running")
})