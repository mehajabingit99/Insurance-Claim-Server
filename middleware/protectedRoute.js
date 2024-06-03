const User = require('../Models/userModel')//userModel
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()

const authenticate = async(req,res,next) =>{
    try {
        //check the token and authorization header
        const authHeader = req.headers['authorization'];
        if(!authHeader){
            return res.status(401).json({
                message: "Please register or login first..."
            })
        }
        console.log(authHeader);
        console.log(res);
        const token = authHeader.replace('Bearer ', "");
        if(!token){
            return res.status(401).json({
                message: "Please enter register or login fields first..."
            })
        }
        console.log(token);
        //verify and decode the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById({_id: decoded._id}, {pass: 0});

        //store user object in the request object
        req.user = user;

        //proceed to next route
        next();
    } catch (error) {
        console.log("Error occurred in middleware", error);
        return res.status(400).json({
            message:"Error occurred..."
        })
    }
}

//export
module.exports= authenticate;