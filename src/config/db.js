const mongoose=require("mongoose")

const connect=async ()=>{
    return mongoose.connect("mongodb+srv://sudarshan:sudarshan@cluster0.ydgncyl.mongodb.net/cointab")

}

module.exports=connect