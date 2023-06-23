
const fs = require("fs");
const path = require("path");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const {Question,validateCreateQuestion,
    validateUpdateQuestion,} = require('../models/question');
const { date } = require("joi");


/**
 * Create question
 * @route /api/questions
 * @method POST
 * @access private (only teatchers)
 */   


module.exports.createQuestionCtrl = (async (req, res) =>{
    // validatetion for data
    const {error} = validateCreateQuestion(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    //is QUESTION already exist
    let question = await Question.findOne({ name: req.body.name});
    if (question) {
        return res.status(400).json({message:"question already exist"});
    }


    //new user and save it in DB
        question = new Question({
        name: req.body.name,
        answers: req.body.answers,
        category: req.body.subcategory,
        subcategory: req.body.subcategory,
        mark: req.body.mark,
        expectedTime: req.body.expectedTime,
        createdBy: req.question.username,
        answers: req.body.answers,
        correctAnswer: req.body.correctAnswer,
    })


    // check if correctAnswers is one of the answers
    let answers = req.body.answers;
    let correctAnswer = req.body.correctAnswer

    const all = answers.some((item) => correctAnswer.some(item2 => item.answerValue === item2.correctAnswerValue)); 

        if (all === false) {
            return res.status(400).json({message:"coreect answer is not one of the answers"});
        } 
    



        //generate token
        const token2 = jwt.sign({questionId: question._id, createdBy: question.createdBy} ,process.env.JWT_SECRET_key2, {
        expiresIn: process.env.JWT_EXPIRE_TIME2,
        })
        await question.save();

    if (req.question.usertype!=="teacher") {
        return res.status(403).json({message:"You are not a teacher"})
    }
    // console.log(req.createQuestion);

    //send a response to client
    res.status(201).json({message:"You created the question successfully", data: question, token2});
    //res.status(201).json();

});








/**
 * get all questions
 * @route /api/questions/page
 * @method GET
 * @access private (only student's can't access)
 */

module.exports.getAllQuestionsCtrl = asyncHandler(async(req, res)=>{
    if (req.question.usertype==="student") {
        return res.status(403).json({message:"You are not a teacher"})
    }

    const POST_PRE_PAGE = 3;
    const {pageNumber }= req.query;
    let questions

    if (pageNumber) {
        questions = await Question.find()
        .skip((pageNumber-1)* POST_PRE_PAGE)
        .limit(POST_PRE_PAGE)
        .sort({createdAt: -1})
    }else {
        questions = await Question.find().sort({createdAt: -1})
        // .populate("createdBy")
    }
    
    // const questions = await Question.find();
    res.status(200).json(questions);

});








/**
 * get questions count
 * @route /api/questions/page/count
 * @method GET
 * @access private (public)
 */

module.exports.getQuestionsCount = asyncHandler(async(req, res)=>{
    const count = await Question.count();
    
    // const questions = await Question.find();
    res.status(200).json(count);

});












/**
 * get question by id
 * @route /api/questions/page/:id
 * @method GET
 * @access private ((any user can access))
 */

module.exports.getQuestionCtrl = asyncHandler(async(req, res)=>{
    const question = await Question.findById(req.params.id);

    if(!question){
        return res.status(404).json({message: "question not found"})
    }

    res.status(200).json(question)

});




/**
 * Delete question
 * @route /api/questions/page/:id
 * @method Delete
 * @access private ((only admins))
 */

module.exports.deleteQuestionCtrl = asyncHandler(async(req, res)=>{
    const question = await Question.findById(req.params.id);
    if(!question){
        return res.status(404).json({message: "question not found"})
    }

    if (req.question.usertype==="admin") {
        await Question.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: "question has been deleted",
            questionsId: question._id
        })
    }

    else{
        res.status(403).json({message: "forbidden"})
    }

});





/**
 * update question
 * @route /api/questions/:id
 * @method PUT
 * @access private (Only Teacher that created the question)
 */   


module.exports.updateQuestionCtrl = (async (req, res) =>{
    // validatetion for data
    const {error} = validateUpdateQuestion(req.body);
    if (error) {
        return res.status(400).json({message: error.details[0].message});
    }

    //get the question from DB and check if the question exist
    const question = await Question.findById(req.params.id)
    if (!question) {
        return res.status(404).json({message: "question not found"})
    }

    // check if this question belong to logged in user
    if (req.question.username !== question.createdBy) {
        return res.status(403).json({message: "access denied, you are not allowd"})
    }

    // Update question
    const updateQuestion = await Question.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.name,
            category: req.body.category,
            subcategory: req.body.subcategory,
            mark: req.body.mark,
            expectedTime: req.body.expectedTime,
            answers: req.body.answers,
            correctAnswer: req.body.correctAnswer,
        }

    }, {new:true})

    
    //send a response to client
    res.status(200).json(updateQuestion);
});




























































/**
 * update answers in question
 * @route /api/answers/:id
 * @method PUT
 * @access private (Only Teacher that created the question)
 */   


module.exports.updateAnswersQuestionCtrl = (async (req, res) =>{
    console.log(req.params)
    const answerId = req.params.id;
    try{
        const result = await Question.findOneAndUpdate(
            {'answers._id': answerId},
            {$set: {'answers.$': req.body}},
            {new: true}

        );
        console.log(result);
        if (result) {
            res.json(result)
        }else {
            res.status(404).json({error: "wrong"})
        }
    } catch (e) {
        console.log(e.message);
        res.status(500).json({error: "wrong again"})
    }
});





















/**
 * Delete answers in questions
 * @route /api/questions/page/:id
 * @method Delete
 * @access private (Only Teacher that created the question)
 * **/

module.exports.deleteQuestionCtrl = asyncHandler(async(req, res)=>{
    const question = await Question.findById(req.params.id);
    if(!question){
        return res.status(404).json({message: "question not found"})
    }

    // check if this question belong to logged in user
    if (req.question.username !== question.createdBy) {
        return res.status(403).json({message: "access denied, you are not allowd"})
    }


    //     await Question.findByIdAndDelete(req.params.id)
    //     res.status(200).json({
    //         message: "question has been deleted",
    //         questionsId: question._id
    //     })
    // }

    else{
        res.status(403).json({message: "forbidden"})
    }

});