require('dotenv').config();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const {User, validateSignupUser, validateLoginUser} = require("../models/usermodel");
const { valid } = require('joi');


/**
 * signup new user
 * @route /api/auth/signup
 * @method Post
 * @access public
 */

module.exports.signupUserCtrl = asyncHandler(async(req, res)=>{
 //validation
    const {error} = validateSignupUser(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    //is user already exist
    let user = await User.findOne({ username: req.body.username});
    if (user) {
        return res.status(400).json({message:"user already exist"});
    }


    // is usertype is valid
    if ( req.body.usertype==="admin") {
        return res.status(400).json({message:"can't signup as admin "});
    }
    if ( req.body.usertype==="super_admin") {
        return res.status(400).json({message:"can't signup as super_admin "});
    }

    // hash pass
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
        

    //new user and save it in DB
    user = new User({
        username: req.body.username,
        password: hashedPassword,
        usertype: req.body.usertype,
    })

    //generate token
    const token = jwt.sign({userId: user._id, username: user.username, usertype: user.usertype},process.env.JWT_SECRET_key, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
    })
    await user.save();

    //send a response to client
    res.status(201).json({message:"You Signedup successfully", data: user, token});
});






/**
 * Login user
 * @route /api/auth/login
 * @method Post
 * @access public
 */

module.exports.loginUserctrl = asyncHandler(async(req, res)=>{
    //validation
    const {error} = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }
    // is user exist
    const user = await User.findOne({ username: req.body.username});
    if (!user) {
        return res.status(400).json({message:"invalid user"});
    }

    // is usertype is correct
    const usertype = await User.findOne({ username: req.body.username});
    if (usertype.usertype!==req.body.usertype) {
        return res.status(400).json({message:"invalid usertype"});
    }

    //check pass
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isPasswordMatch) {
        return res.status(400).json({message:"invalid pass"});
    }


        //generate token
        const token = jwt.sign({userId: user._id, username: user.username, usertype: user.usertype},process.env.JWT_SECRET_key, {
        expiresIn: process.env.JWT_EXPIRE_TIME,
        })


    
    //response to client
    res.status(201).json({message:"You Logedin", data: user, token});

})










