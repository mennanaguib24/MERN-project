const router = require("express").Router();
const { getAllUsersCtrl, getUserProfileCtrl } = require("../controllers/usersController");



//  /api/users/profile
router.route("/profile").get(getAllUsersCtrl);

//  /api/users/profile/:id
router.route("/profile/:id").get(getUserProfileCtrl);



module.exports = router;