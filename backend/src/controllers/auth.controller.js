const userModel = require("../models/user.model");
const foodPartnerModel = require("../models/foodpartner.model")
const bcrypt= require('bcryptjs');
const jwt = require('jsonwebtoken');
    
    // user api
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
    }, process.env.JWT_SECRET);
    
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
    async function LoginUser(req , res){
        const {email , password} = req.body;

        const user = await userModel.findOne({
            email
        })
        if(!user){
            return res.status(400).json({
                message:"invalid email or password"
            })   
        }
        const isPasswordValid = bcrypt.compare(password , user.password);
    
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid email or password"
            })
        }

        const token = jwt.sign({
            id:user._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token);
    
        res.status(200).json({
            message:"user Login succesfully",
            user:{
                id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        })
    }
    async function LogoutUser(req, res){
        res.clearCookie("token");
        res.status(200).json({
            message:"user Logout succesfully"
        })
    }

    // food-partner api
    async function FoodPartnerRegister(req, res){
        const {fullName , email , password}= req.body

        isFoodPartnerAlreadyExist= await foodPartnerModel.findOne({
            email
        })

        if(isFoodPartnerAlreadyExist){
            return res.status(400).json({
                message:"FoodPartner already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password , 10);

        // create FoodPartner
        const FoodPartner = await foodPartnerModel.create({
            fullName,
            password:hashPassword,
            email
        })
        const token = jwt.sign({
            id:FoodPartner._id,      
        },process.env.JWT_SECRET)
       
        res.cookie("token", token);
       
        res.status(201).json({
        message:"FoodPartner Register Scuccesfully",
        user:{
            _id:FoodPartner._id,
            email:FoodPartner.email,
            fullName:FoodPartner.fullName,
        }
    })  
    }
    async function LoginFoodPartner(req , res){
        const {email , password} = req.body;

        const foodPartner = await foodPartnerModel.findOne({
            email
        })
        if(!foodPartner){
            return res.status(400).json({
                message:"invalid email or password"
            })   
        }
        const isPasswordValid = bcrypt.compare(password , foodPartner.password);
    
        if(!isPasswordValid){
            return res.status(400).json({
                message:"invalid email or password"
            })
        }

        const token = jwt.sign({
            id:foodPartner._id,
        }, process.env.JWT_SECRET)

        res.cookie("token", token);
    
        res.status(200).json({
            message:"foodPartner Login succesfully",
            foodPartner:{
                id:foodPartner._id,
                email:foodPartner.email,
                fullName:foodPartner.fullName
            }
        })
    }
    async function LogoutFoodPartner(req, res){
        res.clearCookie("token");
        res.status(200).json({
            message:"FoodPartner Logout succesfully"
        })
    }
    
   module.exports = {
        registerUser,
        LoginUser,
        LogoutUser,
        FoodPartnerRegister,
        LoginFoodPartner,
        LogoutFoodPartner,
    }
