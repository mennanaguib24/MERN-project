const mongoose = require("mongoose");
const Joi = require("joi");
// const {User} = require("./usermodel")
// var ObjectID = require('mongodb').ObjectID;



const questionSchema = new mongoose.Schema(
    {
    name: {
        type: String, 
        required: [true, 'name is required'], 
    },
    category: {
        type: String, 
        required: [true, 'category is required'],
    },
    subcategory: {
        type: String, 
        required: [true, 'subcategory is required'],
    },
    mark: {
        type: Number, 
        required: [true, 'mark is required'],
    },
    expectedTime: {
        type: String, 
        required: [true, 'expectedTime is required'],
    },
    createdBy: {
        type: mongoose.Schema.Types.String, 
        ref: 'User',
        required: [true, 'you should login as teatcher'],
    },
    answers:[
        {
            answerValue: String,
    
        }
],
    correctAnswer: [
        {
            correctAnswerValue: String,

    }
    ],

},
{
    timestamps: true,
    // toJSON: {virtuals: true},
    // toObject: {virtuals: true}

});

// populate answer for this question
// questionSchema.virtual("answer", {
//     ref: "Answer",
//     foreignField: "questionId",
//     localField: "_id"
// })


const Question = new mongoose.model("Question", questionSchema);


// validate Create Question
function validateCreateQuestion(obj){
    const schema = Joi.object({
        name: Joi.string().required(),
        category: Joi.string().required(),
        subcategory: Joi.string().required(),
        mark: Joi.number().required(),
        expectedTime: Joi.string().required(),

        // createdBy: Joi.required(),
        answers: Joi.array().min(2).required(),
        correctAnswer: Joi.array().min(1).max(1).required(),
        
    });    
    return schema.validate(obj);
}

// validate Update Question
function validateUpdateQuestion(obj){
    const schema = Joi.object({
        name: Joi.string(),
        category: Joi.string(),
        subcategory: Joi.string(),
        mark: Joi.number(),
        expectedTime: Joi.string(),
        
    });    
    return schema.validate(obj);
}

module.exports = {
    Question,
    validateCreateQuestion,
    validateUpdateQuestion,

}


