const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema(
    {
    username: {
        type: String, 
        required: [true, 'name is required'], 
        unique: true, 
        trim: true,
        minlength: 2,
        maxlength: 100,
    },
    password: {
        type: String, 
        required: [true, 'pass is required'],
        trim: true,
        minlength: 8,
    },
    usertype: {
        type: String, 
        required: [true, 'usertype is required'],
        enum: ['student', 'teacher','admin','super_admin']
    }
},
{timestamps: true})



// // generate auth token
// userSchema.methods.generateAuthToken = function () {
//     return jwt.sign({id: this._id, username: this.username, usertype: this.usertype}, process.env.JWT_SECRET_key);
// }



//User Model
const User = new mongoose.model("User", userSchema);


// validate signUp User
function validateSignupUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        password: Joi.string().trim().min(8).required(),
        usertype: Joi.string().required().valid('student', 'teacher','admin','super_admin'),
    });
    return schema.validate(obj);
}


// validate Login User
function validateLoginUser(obj){
    const schema = Joi.object({
        username: Joi.string().trim().min(2).max(100).required(),
        password: Joi.string().trim().min(8).required(),
        usertype: Joi.string().required().valid('student', 'teacher','admin','super_admin'),
    });
    return schema.validate(obj);
}


module.exports = {
    User,
    validateSignupUser,
    validateLoginUser,

}
    

