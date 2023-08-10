const router = require("express").Router();
const { deleteAllUser, getAllUser, getProfile, signUpUser, updateProfilePicture} = require("../controllers/user.controller");
const authorization = require("../middleware/authorization");

router
    .route("/")
    .post(signUpUser)
    .delete(deleteAllUser)
    .get(getAllUser)


router
.route("/profile")
.get(authorization,getProfile)
.post(authorization, updateProfilePicture)

module.exports = router