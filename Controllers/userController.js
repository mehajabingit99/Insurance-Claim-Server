const User = require('../Models/userModel')//userModel
const bcrypt = require("bcrypt") //hashpassword
const jwt = require("jsonwebtoken")
const dotenv = require('dotenv').config()

const register = async (req, res) => {
    try {
        //get data from request body
        const { name, username, email, pass } = req.body;
        //validation
        if (!name || !username || !email || !pass) {
            return res.status(400).json({
                message: "All fields are mandatory"
            })
        }

        //email must be unique
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User with privided email is already registered"
            })
        }

        //username must be unique
        user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({
                message: "User with privided username is already registered"
            })
        }

        //password is in the hash format
        const hashPassword = await bcrypt.hash(pass, 10);

        //new user
        const newUser = new User({ name, email, username, pass: hashPassword })
        const resp = await newUser.save(); //store in database
        res.status(201).json({
            message: "User Registered Successully", resp
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({            
            message: "Error while registering"
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, pass } = req.body;
        //validation
        if (!email || !pass) {
            return res.status(400).json({
                message: "All fields are mandatory"
            })
        }
        //email not available then
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Email not registered with us yet..."
            })
        }

        //already registered then move to password
        const match = bcrypt.compare(pass, user.pass);

        //generate new token
        const payload = {
            _id: user._id,
            name : user.name,
            email: user.email
        }

        //check comparisom matched with our password and user password
        if (match) {
            const token = await jwt.sign(payload, process.env.JWT_SECRET);
            return res.status(200).json({
                message: "Logged in Successully",
                token
            })
        }
        else {
            return res.status(400).json({
                message: "Email and password is incorrect..."               
            })
        }

    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Error occured..."
        })
    }
}

//export
module.exports = {
    register,
    login
}