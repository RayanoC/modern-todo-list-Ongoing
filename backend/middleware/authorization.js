const jwt = require("jsonwebtoken")
const { ErrorHandler } = require("../helper/error")
require("dotenv").config({path: __dirname + "/.env"});

const authorization = (req, res, next)=>{
    if(!req.headers.authorization){
        throw new ErrorHandler(403, "There Is No Access Token, User Must Login First")
    }
    const bearerToken = req.headers.authorization.split(' ')[1]
    jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, 
        (error, user) =>{ 
            if(error){
                throw new ErrorHandler(403, error)
            }
            req.user = user
            next()
    })
}

module.exports = authorization