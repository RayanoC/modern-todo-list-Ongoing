const jwt = require("jsonwebtoken")
require("dotenv").config({path: __dirname + "/.env"});

const jwtToken = ({user_id, user_name, profile_picture, email})=>{
    const user = {user_id, user_name, profile_picture, email}
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn:"1h"})
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "7d"})
    return({accessToken:accessToken, refreshToken:refreshToken})
}

module.exports = jwtToken