const router = require("express").Router();
const {createAnswerCtrl, getallAnswersCtrl, deleteAnswerCtrl} = require("../controllers/answersController");
const {verifyToken,verifyToken2} = require("../middlewares/verifyToken");

// /api/answer
router.route("/")
.post(verifyToken, verifyToken2,createAnswerCtrl)
.get(verifyToken, getallAnswersCtrl);

// /api/answer/:id
router.route("/:id").delete(verifyToken, deleteAnswerCtrl)




module.exports = router;