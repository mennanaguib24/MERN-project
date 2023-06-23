const router = require("express").Router();
const {signupUserCtrl,loginUserctrl, getUserProfileCtrl} = require("../controllers/authcontroller");

//   api/auth/signup
router.post("/signup", signupUserCtrl);
router.post("/login", loginUserctrl);


module.exports = router;