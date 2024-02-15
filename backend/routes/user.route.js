const express = require("express");

const bcrypt= require("bcrypt");

const jwt = require("jsonwebtoken");

const userModel = require('../models/user.model')

const userRouter = express.Router();

userRouter.post("/signup", async(req,res)=>{
    const {email, password, confirmPassword}= req.body;

    try {
        const user = await userModel.findOne({email});
        if(password!==confirmPassword){
            res.status(200).json("both password should be same")
        }else if(user){
            res.status(200).json({err:"user alreasy registered!!"})
        }else{
            bcrypt.hash(password, 6, async(err,hash)=>{
                if(err){
                    res.status(400).json({err:err.message})
                }else{
                    const user=new userModel({email, password:hash, confirmPassword:hash})

                    await user.save();
                    res.status(200).json({msg:"user registered"})
                }
            })
        }
    } catch (error) {
        res.status(400).json({err:error.message})
    }
})

userRouter.post("/login", async(req,res)=>{
    const {email, password}= req.body;
    try {
        const user= await userModel.findOne({email});
        if(user){
            bcrypt.compare(password, user.password, (err, result)=>{
                if(result){
                   let token= jwt.sign({userId:user._id}, process.env.key)
                   res.status(200).json({msg:"login successfull", token})

                }else{
                    res.status(200).json({msg:"wrong password"})
                }
            })
        }else{
            res.status(200).json({msg:"user not found"})
        }
    } catch (error) {
        res.status(400).json({err:error.message})
    }
})

module.exports= userRouter