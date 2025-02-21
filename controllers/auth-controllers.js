require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register
const registerUser = async (req, res) =>{
    try{
        const {username, email, password, role} = req.body;

        const userExists = await User.findOne({
            $or: [{email}, {username}],
        });
        if(userExists){
            return res.status(400).json({message: "User already exists"});
        }

        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt);

        const newuser = new User({
            username,
            email,
            password : hashed,
            role : role || "user",
        });

        await newuser.save();

        if(newuser){
            res.status(201).json({
                message: "User created successfully!",
            });
        }else{
            res.status(400).json({
                message: "User not created. Try again buddy!",
            });
        }
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: "User not created. Try again bro!",
        });
    }
};

//Login 
const loginUser = async(req, res) =>{
    try{
        const {username, password} = req.body;

        const user = await User.findOne
        ({username});

        if(!user){
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }
        const token =jwt.sign(
            {
                userId: user._id,
                username: user.username,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "40m",
            }
        );
        res.status(200).json({
            message: "Login Successful",
            token,
        });
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: "Couldn't login. Try again!",
        });
    }
}

//Change Password
const changePassword = async(req, res) =>{
    try{
        const {oldPassword, newPassword} = req.body;
        const user = await User.findOne({
            _id: req.user.userId,
        });
        const isMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid Credentials",
            });
        }

        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(newPassword, salt);

        user.password = hashed;
        await user.save();

        res.status(200).json({
            message: "Password changed successfully",
        });
    }catch(e){
        console.error(e);
        res.status(500).json({
            message: "Couldn't change the password. Try again!",
        });
    }
};

module.exports = {registerUser, loginUser, changePassword};