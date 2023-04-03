const {model,Schema}=require("mongoose");

const userSchema=new Schema({ name:String,
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
    },
    totalAttempts:{
        type:Number,
        required:true,
        default:0,
    },
    lastLoginAttemptTime:{
        type:Number,
        required:true,
        default:0,
    },
    
   
})
const userModel=model("user",userSchema);

module.exports=userModel