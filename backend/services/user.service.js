const pool = require("../db");
const { ErrorHandler } = require("../helper/error");
const todo_listService = require("./todo_list.service");
const validator =require("validator");
const argon2 = require("argon2");

class UserService{
    createUser = async (user_name, profile_picture, email, password)=>{
        try{
            if(!validator.isEmail(email)){
                throw new ErrorHandler(401, "Email format is not valid")
            }
            if(!validator.isStrongPassword(password)){
                throw new ErrorHandler(401, "Password Must Be Stronger, Use A Mix of Number, Symbols, Upper and Lowercase Letters To Strengthen The Password")
            }
            await this.validateUniqueEmail(email)
            const hashedPassword = await argon2.hash(password)

            const newUser= await pool.query(
                "INSERT INTO user_account(user_name, profile_picture, email, password) VALUES($1, $2, $3, $4) ON CONFLICT DO NOTHING RETURNING *", [
                    user_name, profile_picture, email, hashedPassword
                    ]
            )
            delete newUser.rows[0].password
            const mainList = await todo_listService.createUserMainList(newUser.rows[0].user_id)
            return(newUser.rows)
        } catch(err){
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }

    deleteAllUser = async ()=>{
        try{
            const user= await pool.query("DELETE FROM user_account RETURNING *", [])
            return(user.rows)
        } catch(err){
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }

    getAllUser = async ()=>{
        try{
            const user= await pool.query("SELECT * FROM user_account", [])
            return(user.rows)
        } catch(err){
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }

    validateUniqueEmail = async (email) =>{
        try{
            const user= await this.findUserByEmail(email)
            if(user.rowCount >= 1){
                throw new ErrorHandler(401, "Email Must Be Unique, Email Is Already Registered")
            }
        } catch(err){
            throw new ErrorHandler(err.statusCode, err.message)
        }
    }

    findUserByEmail= async (email)=>{
        const user = await pool.query("SELECT * FROM user_account WHERE  email = $1", [email])
        return user
    }

    getUserProfile = async (user_id) =>{
        const profile = await pool.query("SELECT * FROM user_account WHERE  user_id = $1", [user_id])
        let result = profile.rows[0]
        delete result.password
        return result
    }

    updateUserProfilePicture = async (user_id, profile_picture) =>{
        const result = await pool.query("UPDATE user_account SET profile_picture = $1 WHERE user_id = $2 RETURNING *", [profile_picture, user_id])
        delete result.rows[0].password
        return result.rows
    }
}

module.exports = new UserService()