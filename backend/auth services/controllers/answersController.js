const asyncHandler = require("express-async-handler");
const {Answer, validateCreateAnswer, validateUpdateAnswer} = require("../models/answer");
const {User} = require("../models/usermodel");
const { Question } = require("../models/question");





/**
 * Create Answer
 * @route /api/answer
 * @method POST
 * @access private (only teatchers that created the question)
 */ 


module.exports.createAnswerCtrl = (async (req, res) =>{
    const {error} = validateCreateAnswer(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }    

    let answer = await Answer.create({
        questionId: req.body.questionId,
        name: req.body.name,
        describtion: req.body.describtion,
        createdBy: req.body.createdBy
    }); 

    answer = await answer.populate("questionId")

    if (req.answerQuestion.createdBy === req.question.username) {
        res.status(201).json(answer)

    }else{
        return res.status(403).json({message:"You are not the person who create that question"})
        

    }
    // console.log(question)

    // console.log(owner)


})






/**
 * get all Answers
 * @route /api/answers
 * @method DELETE
 * @access private (only teatchers that created the question)
 */ 


module.exports.deleteAnswerCtrl = (async (req, res) =>{
    const answer = await Answer.findById(req.params.id)
    if (!answer) {
        return res.status(404).json({message: "answer not found"})
    }

    if (req.question.id === answer.createdBy.toSring) {
        await Answer.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "answer has been deleted"})
    }else {
        res.status(403).json({message: "access denied, not allowed"})

    }
})



/** 
//  * delete Answer
//  * @route /api/answers
//  * @method GET
//  * @access private (only teatchers that created the question)
//  */ 


module.exports.getallAnswersCtrl = (async (req, res) =>{
    const answers = await Answer.find().populate("createdBy").populate("questionId")


    res.status(200).json(answers)
})






