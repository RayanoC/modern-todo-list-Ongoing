const { ErrorHandler } = require("../helper/error");
const argon2 = require("argon2");
const userService = require("./user.service");
const validator =require("validator");
const jwtToken = require("../helper/jwt")
const jwt = require("jsonwebtoken")

class AuthService{
    signIn = async (body)=>{
        try {
            const userToValidate = await userService.findUserByEmail(body.email)
            if(userToValidate.rowCount == 0){
                throw new ErrorHandler(401, "No User Found With This Email")
            }
            const verify = await argon2.verify(userToValidate.rows[0].password, body.password)
            
            if(!verify){
                throw new ErrorHandler(401, "The Password is Incorret")
            }
            const token = jwtToken(userToValidate.rows[0])
            return token
            // const verifyPassword = argon2.verify(body.password, userToValidate.rows.password)
        } catch (err) {
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }

    refreshToken = async (refreshToken)=>{
        try {
            const token = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, user)=>{
                if(error){
                    throw new ErrorHandler(403, "Token Expires, Please Login Again")
                }
                const token = jwtToken(user)
                return token
            })    

            return token

        } catch (err) {
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }
}

module.exports = new AuthService()