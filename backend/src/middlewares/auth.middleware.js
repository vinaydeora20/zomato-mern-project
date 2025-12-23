const foodpartnerModel = require("../models/foodpartner.model");
const userModel = require("../models/user.model")
const jwt = require("jsonwebtoken");

async function authFoodPartnerMiddleware(req , res , next){
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const foodPartner = await foodpartnerModel.findById(decoded.id);
       
        req.foodPartner = foodPartner;
       
        next();

    } catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}


async function authUserMiddleware(req , res , next){
     const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        const foodPartner = await userModel.findById(decoded.id);
       
        req.foodPartner = foodPartner;
       
        next();

    } catch(err){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }
}
module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}