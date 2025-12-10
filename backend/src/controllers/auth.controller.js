const userModel = require("../models/user.model");
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');

    async function registerUser(req , res){
   
    const { fullName , email, password } = req.body;
 
    const isUserAlreadyExixt = await userModel.findOne({
        email,
    });
    if(isUserAlreadyExixt){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const hashPassword = await bcrypt.hash(password,10);

    // create user:
    const user = await userModel.create({
        fullName,
        password:hashPassword,
        email,
    }) 
    const token = jwt.sign({
        id:user._id,
    }, "32e9b8f2fe81e488f688099c6b858b66");
    
    res.cookie("token" , token);

    res.status(201).json({
        message:"user register Scuccesfully",
        user:{
            _id:user._id,
            email:user.email,
            fullName:user.fullName,
        }
    })
}

module.exports = {
    registerUser
}
