const express=require("express");
const mongoose=require("mongoose");
const cors=require("cors");
const connect  = require("./config/db");


const app=express();
app.use(express.json());
app.use(cors());



app.get("/",(req,res)=>{
res.send("hello")
});

app.listen(3100,async()=>{
    await connect()
    console.log(`runnning on http://localhost:${3100}`)
})