const asyncHandler = require("express-async-handler");
const { User } = require("../models/usermodel")


/**
 * get all users profile
 * @route /api/users/profile
 * @method GET
 * @access private (only admin)
 */

module.exports.getAllUsersCtrl = asyncHandler(async(req, res)=>{

    const users = await User.find();

    //response to client
    res.status(200).json(users);

})





/**
 * get user profile
 * @route /api/users/profile/:id
 * @method GET
 * @access public
 */

module.exports.getUserProfileCtrl = asyncHandler(async(req, res)=>{

    const user = await User.findById(req.params.id).select("-password");

    if(!user){
        return res.status(404).json({ message: "user not found"})
    }

    //response to client
    res.status(200).json(user);

})