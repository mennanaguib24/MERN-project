const router = require("express").Router();
const { getAllQuestionsCtrl,getQuestionCtrl, deleteQuestionCtrl, updateQuestionCtrl, updateAnswersQuestionCtrl } = require("../controllers/questionController");
const { createQuestionCtrl, getQuestionsCount } = require("../controllers/questionController");
const { verifyToken } = require("../middlewares/verifyToken");
const validateObjectId = require("../middlewares/validateObjectid");


router.post('/',verifyToken,createQuestionCtrl)


// /api/questions/page
router.route('/page').get(verifyToken, getAllQuestionsCtrl);

// // /api/questions/page/count
router.route('/page/count').get(getQuestionsCount);



router.route('/answers/:id')
.patch(verifyToken, updateAnswersQuestionCtrl);



// /api/questions/page/:id
router.route('/page/:id')
.get(verifyToken, validateObjectId , getQuestionCtrl)
.delete(validateObjectId, verifyToken, deleteQuestionCtrl)
.put(validateObjectId, verifyToken, updateQuestionCtrl);

module.exports = router;