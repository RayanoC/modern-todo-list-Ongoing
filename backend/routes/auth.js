const { signInUser, refreshToken } = require("../controllers/auth.controller")

const router = require("express").Router()

router
    .route("/sign-in")
    .post(signInUser)

router
    .route("/refresh-token")
    .post(refreshToken)

module.exports = router
