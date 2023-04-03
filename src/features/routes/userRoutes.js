const express = require('express');
const userModel = require('../models/userModel');
const app = express.Router();

app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    const user=await userModel.findOne({email});
    try{
        if(user){
            if (user.totalAttempts >= 5) {
                const timeSinceLastAttempt = new Date().getTime() - user.lastLoginAttemptTime;
                if (timeSinceLastAttempt < 86400000) { 
                    return res.status(401).send({message:"Too many attempts, please try after 24 hours"})
                } else {
                    const verification=user.password==password;
                    
                     if(verification){
                        const updatedUser=await userModel.findOneAndUpdate({email: user.email}, {$set:{totalAttempts:0,lastLoginAttemptTime:0}});
                         return res.status(200).send({message:"Login Successful",email})
                    }else{
                        const updatedUser=await userModel.findOneAndUpdate({email: user.email}, {$set:{totalAttempts:user.totalAttempts+1,lastLoginAttemptTime:new Date().getTime()}});
                         return res.status(401).send({message:"Invalid Credentials"})
                    }
                 
                }
              }else{
                const verification=user.password==password;
                    
                     if(verification){
                        const updatedUser=await userModel.findOneAndUpdate({email: user.email}, {$set:{totalAttempts:0,lastLoginAttemptTime:0}});
                         return res.status(200).send({message:"Login Successful",email})
                    }else{
                        const updatedUser=await userModel.findOneAndUpdate({email: user.email}, {$set:{totalAttempts:user.totalAttempts+1,lastLoginAttemptTime:new Date().getTime()}});
                         return res.status(401).send({message:"Invalid Credentials"})
                    }
              }
           
        }else{
            return res.status(404).send({message:"email not found"})
        }
    }catch(err){
        res.status(401).send({message:err})
 }
 
   })
app.post("/signup",async(req,res)=>{
    const { email,password } = req.body;
    try{
        const user = await userModel.create({ email: email, password: password })
        user.save();
        res.send({message:"successfully signed up"});
    }catch(err){
           res.status(401).send({message:err})
    }
   
})

module.exports = app;