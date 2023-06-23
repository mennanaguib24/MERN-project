const mongoose = require("mongoose");
const Joi = require("joi");

const answerSchema = new mongoose.Schema(
    {
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true

        },
        name: [{
            type: Array,
        }],
        description: {
            type: String,
        }

},
{timestamps: true})

//Answers Model
const Answer = new mongoose.model("Answer", answerSchema);


// validate Create Answer
function validateCreateAnswer(obj){
    const schema = Joi.object({
        questionId: Joi.string().required(),
        createdBy: Joi.string().required(),
        describtion: Joi.string(),
        
    });    
    return schema.validate(obj);
}

// validate Update Answer
function validateUpdateAnswer(obj){
    const schema = Joi.object({
        name: Joi.string().required(),
        describtion: Joi.string()
        
    });    
    return schema.validate(obj);
}



module.exports = {
    Answer,
    validateCreateAnswer,
    validateUpdateAnswer,
}
    

